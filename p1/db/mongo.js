var mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
}

var db = null;

var Init = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/semos1', options)
    .then((conn) => {
        db = conn;
    })
    .catch((err) => {
        console.log(err);
    });
};

var DB = () => {
    if (db != null){
        return db;
    } else {
        console.error("No MongoDB connection to return!");
    }
}

module.exports = {
    Init,
    DB
}