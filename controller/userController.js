// always hold callback funtion // Actions - real all data , read single , creating , update , delete.

// to handle view - to handle each file we write seperate controller


const path = require('path')


const user = require('../model/userModel')




const homeController = (req, res) => {
    res.sendFile(path.resolve('./view/index.html'))
}
const CreateController = (req, res) => {
    res.sendFile(path.resolve('./view/create.html'))
}
const UpdateController = (req, res) => {
    res.sendFile(path.resolve('./view/update.html'))
}
const notFound = (req, res) => {
    res.sendFile(path.resolve('./view/404.html'))
}


// create //s
const createUSer = async (req, res) => {
    try {

        const exemail = await user.findOne({ email: req.body.email })     // existing dupliation once  //
        if (exemail)
            return res.status(400).json({ msg: ` ${req.body.email} is already a Existing Email mail Address` }) //

        const exusername = await user.findOne({ username: req.body.username })     // existing dupliation once   //
        if (exusername)
            return res.status(400).json({ msg: `${req.body.username} is already a Existing username` })  //




        const newuser = await user.create(req.body)   //


        // const newuser = await user(req.body)
        res.json({ data: newuser, msg: "New user been added successfully" })  //
        // res.json({ data: req.body }) // to read data from front end

    } catch (err) {
        res.status(500).json({ msg: " Internal server Error" })
    }
}


//----------------------------read - ALl =--------------------------------

const readuser = async (req, res) => {
    try {
        // res.json({ msg: "read all" })
        const users = await user.find({})

        res.json({ length: users.length, users })



    } catch (err) {
        res.status(500).json({ msg: "Internal error" })
    }
}


// ---single ------

const readSingle = async (req, res) => {
    try {
        const id = req.params.id;
        const Suser = await user.findById({ _id: id });
        if (!Suser) {
            return res.status(404).json({ msg: "Id not found" });
        }
        res.status(200).json({ Suser });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// Update //


const updateUser = async (req, res) => {
    try {

        const id = req.params.id


        const existUser = await user.findById({ _id: id })

        if (!existUser)
            return res.status(404).json({ msg: `Requested user id not found` })

        const updateduser = await user.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).json({ updateduser, msg: `user updated successfully` })

    }
    catch {
        res.status(500).json({ msg: err.message });
    }
}


const deleteuser = async (req, res) => {
    try {
        const id = req.params.id

        const existUser = await user.findById({ _id: id })
        if (!existUser)
            return res.status(404).json({ msg: `Requested user id not found` })



        await user.findByIdAndDelete({ _id: id })
        return res.status(404).json({ msg: ` ${req.body.name} Requested user is been deleted` })


    } catch {
        res.status(500).json({ msg: err.message });
    }
}










module.exports = { homeController, CreateController, UpdateController, notFound, createUSer, readuser, readSingle, updateUser, deleteuser }




