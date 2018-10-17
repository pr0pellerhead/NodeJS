var mongoose = require("mongoose");

var Film = mongoose.model(
    'films',
    new mongoose.Schema({
        "ime": String,
        "godina": Number,
        "vremetraenje": Number,
        "zanr": String
    })
);

var addFilm = (filmData, cb) => {
    film = new Film(filmData);
    film.save((err, data) => {
        if(err) {
            return cb(err, null)
        } else {
            return cb(null, data);
        }
    })
};

var getAllFilms = (cb) => {
    Film.find({}, (err, data) => {
        if(err) {
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    })
}

module.exports = {
    addFilm,
    getAllFilms
}