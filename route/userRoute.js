const userRoute = require('express').Router()

const { homeController, CreateController, UpdateController, notFound, createUSer, readuser, readSingle, updateUser, deleteuser } = require('../controller/userController')

userRoute.get('/', homeController)
userRoute.get('/create', CreateController)
userRoute.get('/update', UpdateController)

// for all operation //

// read all



// create user

userRoute.post('/api/newuser', createUSer)



// get user//

userRoute.get('/api/getuser', readuser)


// get single

userRoute.get('/api/getuser/:id', readSingle)

// delete user //

userRoute.patch('/api/updateuser/:id', updateUser)

//delete user

userRoute.delete('/api/deleteuser/:id', deleteuser)



userRoute.all('/*', notFound)


module.exports = userRoute







