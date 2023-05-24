

const usersDOM = document.querySelector('#users');
const url = 'http://localhost:4500';

const showUsers = async () => {
    try {
        await fetch(`${url}/api/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(out => {
                print(out.users);
                console.log('users', out);
            })
            .catch(err => alert(err.msg));
    } catch (err) {
        alert(err.msg);
    }
};

// Print Function //

const print = (users) => {
    const mapData = users.map((item, id) => {
        const { _id, name, email, age, username, password, address } = item;

        return `<div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="card mt-2">
                        <div class="card-header">
                            <h2 class="card-title text-success text-uppercase">${name}</h2>
                        </div>
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <strong>Email</strong>
                                    <span class="float-end text-warning">${email}</span>
                                </li>
                                <li class="list-group-item">
                                    <strong>Age</strong>
                                    <span class="float-end text-warning">${age} years</span>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer mt-3">
                            <a class="btn btn-sm btn-info" href="/update?id=${_id}">Edit</a>
                            <button class="btn btn-danger float-end" onclick="deleteUser('${_id}' ,'${name}')">Delete</button>
                            

                        </div>
                    </div>
                </div>`;
    }).join('');
    usersDOM.innerHTML = mapData;
};

const deleteUser = async (id, name) => {
    try {
        const confirmed = confirm(`Are you sure you want to delete ${name}`);
        if (!confirmed) {
            return;
        }
        await fetch(`${url}/api/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(out => {
                console.log('user deleted', out);
                showUsers();
            })
            .catch(err => console.log('error', err));
    } catch (err) {
        console.log('error', err);
    }
};

(function () {
    showUsers();
})();
