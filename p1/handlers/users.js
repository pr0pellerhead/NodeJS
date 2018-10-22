var utils = require("../utils");
var users = require("../models/users");
var bcrypt = require("bcryptjs");
var validator = require("fastest-validator");
var vlidatorSchema = require("../validators/users");

var getAllUsers = (req, res) => {
    users.getAllUsers((err, data) => {
        if(err){
            res.status(500).send("Internal server error! " + err);
        } else {
            res.send(data);
        }
    });
};

var getUserByName = (req, res) => {
    var name = req.params.name;
    users.getUsersByName(name, (err, data) => {
        if(err){
            res.status(500).send("Internal server error! " + err);
        } else {
            res.send(data);
        }
    });
}

var getUserById = (req, res) => {
    var id = req.params.id;
    users.getUserById(id, (err, data) => {
        if(err){
            res.status(404).send("Not found");
        } else {
            res.send(data);
        }
    });
}

var createUser = (req, res) => {
    let v = new validator();
    var valid = v.validate(req.body, vlidatorSchema.userCreate);

    if(valid === true) {
        users.getUserByEmail(req.body.email, (err, data) => {
            if (err) {
                return res.send(err);
            } else {
                if (data == null) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        var userData = req.body;
                        userData.password = hash;
                        userData.role = 'user';
                        users.createUser(userData, (err) => {
                            if(err) {
                                res.send(err);
                            } else {
                                res.status(201).send("OK");
                            }
                        });
                    });
                } else {
                    res.status(400).send("User exists");
                }
            }
        })
    } else {
        res.status(400).send(valid);
    }
}

var deleteById = (req, res) => {
    var id = req.params.id;
    users.deleteById(id, (err) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(204).send("OK");
        }
    })
}

var updateById = (req, res) => {
    var id = req.params.id;
    var userData = req.body;
    users.updateById(id, userData, (err) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send("OK");
        }
    });
}

module.exports = {
    getAllUsers,
    getUserByName,
    getUserById,
    createUser,
    deleteById,
    updateById
};

