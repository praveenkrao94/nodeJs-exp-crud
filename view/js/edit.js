const url = 'http://localhost:4500';

const userform = document.getElementById('userForm');
const Fname = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const username = document.getElementById('username');
const password = document.getElementById('password');
const address = document.getElementById('address');


// JS logic to read query from url //

const params = window.location.search;

const id = new URLSearchParams(params).get('id') // default 

console.log('user id =', id)


const getsingle = async () => {
    await fetch(`${url}/api/getuser/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(out => {
            console.log('output', out)
            if (out.Suser) {
                Fname.value = out.Suser.name
                email.value = out.Suser.email
                age.value = out.Suser.age
                username.value = out.Suser.username
                password.value = out.Suser.password
                address.value = out.Suser.address
            }
        })
        .catch(err => {
            console.log('error', err)
        })
}

userform.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        // alert("its updated")
        const data = {
            name: Fname.value,
            age: age.value,
            username: username.value,
            email: email.value,
            password: password.value,
            address: address.value
        }
        // console.log(`data =`, data)

        await fetch(`${url}/api/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(out => {
                console.log(`data updated`, out)
                window.location.href = '/'
            }).catch(err => {
                console.log(`error `, err)
            })

    } catch (err) {
        console.log(err.msg)
    }
});



(function () {
    getsingle()
})()