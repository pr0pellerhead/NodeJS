// alert('test');

var field_email = document.querySelector('#email');
var field_password = document.querySelector('#password');
var TOKEN = '';

document.querySelector('#btn_login').addEventListener('click', function() {
    var data = {
        email: field_email.value,
        password: field_password.value
    };

    fetch(
        '/auth/login',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        }
    ).then((res) => {
        return res.text()
    }).then((token) => {
        console.log(token);
        TOKEN = token;
    }).catch((err) => {
        console.error(err);
    });
});

document.querySelector('#get_cvs').addEventListener('click', function() {
    fetch(
        '/cv',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + TOKEN
            },
        }
    ).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.error(err);
    });
});

document.querySelector('#get_users').addEventListener('click', function() {
    fetch(
        '/users',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + TOKEN
            },
        }
    ).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.error(err);
    });
});