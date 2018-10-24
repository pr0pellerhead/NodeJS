var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var fileUpload = require('express-fileupload');
var mongo = require('../db/mongo');
var upload = require('../handlers/upload');

mongo.Init();

var app = express();
app.use(bodyParser.json());
app.use(jwt({
        secret: 'pero_e_haker'
    }).unless({
        path: [
            {url: '/upload', methods: ['POST']},
        ]
    })
);

app.use(fileUpload({
    limits: { 
        fileSize: 50 * 1024 * 1024 
    }
}));

app.post('/upload', upload.uploadFile);
app.post('/upload/avatar', upload.uploadAvatar);
app.post('/upload/doc', upload.uploadDocument);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

app.listen(8001);

