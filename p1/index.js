var express = require('express');

var mongo = require('./db/mongo');

var auth = require('./handlers/auth');
var root = require('./handlers/root');
var users = require('./handlers/users');

mongo.Init();

var app = express();

app.get('/', root);

app.post('/login', auth.login);
app.get('/logout', auth.logout);

app.get('/users', users.getAllUsers);
app.get('/users/name/:name', users.getUserByName);
app.get('/users/:id', users.getUserById);

app.listen(80);

