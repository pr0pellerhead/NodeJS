var film = require("../models/film");

var addFilm = (req, res) => {
    var data = req.body;
    film.addFilm(data, (err, d) => {
        if(err) {
            return res.status(500).send("Internal Server Error");
        } else {
            return res.status(201).send(d);
        }
    });
}

var getAllFilms = (req, res) => {
    film.getAllFilms((err, data) => {
        if(err) {
            return res.status(500).send("Internal Server Error");
        } else {
            return res.status(200).send(data);
        }
    });
}

module.exports = {
    addFilm,
    getAllFilms
}