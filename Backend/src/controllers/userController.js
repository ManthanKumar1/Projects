let userModel = require('../models/userModel')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let { isValid, isValidMail } = require('../validator/validation')

let signup = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" })
        }

        let { username, email, password } = data
        if (!isValid(username)) {
            return res.status(400).send({ status: false, message: "Username is missing or invalid" })
        }

        if (!isValid(email) || !isValidMail.test(email)) {
            return res.status(400).send({ status: false, message: "Email is missing or invalid" })
        }

        let checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: "Email is already in use" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is missing or invalid" })
        }
        let hashedPassword = await bcrypt.hash(password, 10)

        data.username = username
        data.email = email
        data.password = hashedPassword

        let signup = await userModel.create(data)

        let findUser = await userModel.findOne({ email: email })
        let token = jwt.sign(
            {
                id: findUser._id.toString(),
                username: findUser.username,
                email: findUser.email
            },
            "assignment")

        let result = {
            userId: findUser._id,
            token: token
        }
        return res.status(201).send({ status: true, message: 'Signup successfully', data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let login = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, messaeg: "body cannot be empty" })
        }

        let { email, password } = data

        if (!isValid(email) || !isValidMail.test(email)) {
            return res.status(400).send({ status: false, message: "Email is missing or invalid" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is missing or invalid" })
        }

        let findUser = await userModel.findOne({ email: email })

        if (!findUser) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        let checkPassword = await bcrypt.compare(password, findUser.password)

        if (!checkPassword) {
            return res.status(400).send({ status: false, message: "Incorrect Password" })
        }

        let token = jwt.sign(
            {
                id: findUser._id.toString(),
                username: findUser.username,
                email: findUser.email
            },
            "assignment")

        let result = {
            userId: findUser._id,
            token: token
        }
        return res.status(200).send({ status: true, message: "Login Successfull", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let getUser = async (req, res) => {
    try {
        let userId = req.user.id;

        let fetchUser = await userModel.findOne({ _id: userId, isDeleted: false }, { username: 1, email: 1, _id: 0 })

        if (!fetchUser) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        return res.status(200).send({ status: true, data: fetchUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { signup, login, getUser }