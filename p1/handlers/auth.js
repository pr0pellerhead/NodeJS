var login = (req, res) => {
    res.send('login');
};

var logout = (req, res) => {
    res.send('logout');
};

module.exports = {
    login,
    logout
}