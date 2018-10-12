var jwt = require('jsonwebtoken');

var login = (req, res) => {
    if(req.body.email == 'admin@admin.com' && req.body.password == 'a') {
        var userData = {
            uid: 1234567890,
            email: 'admin@admin.com',
            name: 'Pero Perovski',
            avatar: 'slika.jpg'
        };
        var token = jwt.sign(userData, 'pero_e_haker');
        return res.send(token);
    } else {
        return res.status(404).send('Invalid username or password');
    }
};

var logout = (req, res) => {
    res.send(req.user);
};

module.exports = {
    login,
    logout
}