var jwt = require('jsonwebtoken');
var users = require('../models/users');
var bcrypt = require("bcryptjs");
var validator = require("fastest-validator");
var validatorSchema = require("../validators/users");
var v = new validator();

var login = (req, res) => {
    var valid = v.validate(req.body, validatorSchema.userLogin);
    if (valid === true) {
        users.getUserByEmail(req.body.email, (err, userData) => {
            bcrypt.compare(req.body.password, userData.password)
            .then((valid) => {
                if(valid) {
                    var ud = {
                        uid: userData._id,
                        email: userData.email,
                        name: userData.firstname + ' ' + userData.lastname,
                        role: userData.role
                    };
                    var token = jwt.sign(ud, 'pero_e_haker');
                    return res.send(token);
                } else {
                    return res.status(403).send("Unauthorized");
                }
            }).catch((err) => {
                return res.status(500).send("Internal server error");
            })
        });
    } else {
        res.status(400).send(valid);
    }
};

var logout = (req, res) => {
    res.send(req.user);
};

module.exports = {
    login,
    logout
}