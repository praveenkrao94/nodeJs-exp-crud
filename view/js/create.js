const url = 'http://localhost:4500';

const userform = document.getElementById('userForm');
const Fname = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const username = document.getElementById('username');
const password = document.getElementById('password');
const address = document.getElementById('address');

userform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: Fname.value,
        email: email.value,
        age: age.value,
        username: username.value,
        password: password.value,
        address: address.value
    };

    console.log('data =', data);

    await fetch(`${url}/api/newuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(out => {
            window.alert(out.msg);
            window.location.href = '/'
        })
        .catch(err => {
            windows.alert(err.msg)
        })
});
