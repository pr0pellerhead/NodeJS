var userCreate = {
    firstname: {type: 'string', empty: false},
    lastname: {type: 'string', empty: false},
    email: {type: 'email', empty: false},
    password: {type: 'string', min: 2, max: 16, empty: false}
};

var userLogin = {
    email: {type: 'email', empty: false},
    password: {type: 'string', min: 2, max: 16, empty: false}
};

module.exports = {
    userCreate,
    userLogin
}