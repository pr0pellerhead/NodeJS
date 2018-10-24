var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var mongo = require('../db/mongo');
var auth = require('../handlers/auth');

mongo.Init();

var app = express();
app.use(bodyParser.json());
app.use(jwt({
        secret: 'pero_e_haker'
    }).unless({
        path: [
            {url: '/login', methods: ['POST']}
        ]
    })
);

app.post('/auth/login', auth.login);
app.get('/auth/logout', auth.logout); // logout(req, res);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

app.listen(8003);

