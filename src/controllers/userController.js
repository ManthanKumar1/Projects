let userModel = require('../models/userModel')
let argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const passport = require('passport')

let createUser = async function (req, res) {
    try {
        let { fullName, email, password, age } = req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" })
        }

        let hashedPassword = await argon2.hash(password)

        let data = { fullName: fullName, email: email, password: hashedPassword, age: age }

        let createUser = await userModel.create(data)

        return res.status(201).send({ status: true, message: "User created successfully", data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// let loginUser = async function (req, res) {
//     try {
//         let { email, password } = req.body

//         let findUser = await userModel.findOne({ email: email, isDeleted: false })
//         if (!findUser) {
//             return res.status(404).send({ status: false, message: "User not found" })
//         }

//         let checkPassword = await argon2.verify(findUser.password, password)

//         if (!checkPassword) {
//             return res.status(400).send({ status: false, message: "Incorrect password" })
//         }

//         let token = jwt.sign(
//             {
//                 userId: findUser._id.toString(),
//                 iat: Math.floor(new Date().getTime() / 1000)
//             },
//             "lovoj",
//             { expiresIn: "24h" });

//         let data = {
//             userId: findUser._id,
//             token: token
//         }
//         return res.status(200).send({ status: true, message: "Login successfully", data: data })
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
// }

const loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).send({ status: false, message: info ? info.message : 'Login failed' });
        }

        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            // Generate JWT token
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    iat: Math.floor(new Date().getTime() / 1000)
                },
                "lovoj", // Replace with your actual secret key
                { expiresIn: '24h' }
            );

            const data = {
                userId: user._id,
                token: token
            };

            return res.status(200).send({ status: true, message: "Login successfully", data: data });
        });
    })(req, res, next);
};

let getUser = async function (req, res) {
    try {
        let { fullName, email, id, page = 1, limit = 10 } = req.query

        let filter = { isDeleted: false }
        if (fullName) filter.fullName = fullName
        if (email) filter.email = email
        if (id) filter._id = id

        if (!page || page <= 0) {
            page = 1;
        }
        if (!limit || limit <= 0) {
            limit = 10;
        }

        if (id) {
            let fetchUser = await userModel.findOne(filter)
            if (!fetchUser) {
                return res.status(404).send({ status: false, message: 'User not found' })
            }
            return res.status(200).send({ status: true, message: "User found", data: fetchUser })
        }

        let options = {
            skip: (parseInt(page) - 1) * parseInt(limit),
            limit: parseInt(limit),
        }

        let fetchUsers = await userModel.find(filter, null, options)

        if (fetchUsers.length === 0) {
            return res.status(404).send({ status: false, message: 'User not found' })
        }

        let totalUsers = await userModel.countDocuments(filter)

        return res.status(200).send({ status: true, message: "Users found", data: fetchUsers, pagination: { totalUsers, currentPage: parseInt(page), totalPages: Math.ceil(totalUsers / parseInt(limit)), pageSize: fetchUsers.length } })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let updateUser = async function (req, res) {
    try {
        let id = req.params.id

        let { fullName, email, password, age } = req.body

        let data = {}

        if (fullName) data.fullName = fullName
        if (email) data.email = email
        if (age) data.age = age
        
        if (password) {
            let hashedPassword = await argon2.hash(password)
            data.password = hashedPassword
        }

        let updateUser = await userModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: data }, { new: true })
        if (!updateUser) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        return res.status(200).send({ status: true, message: "User updated successfully", data: updateUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let deleteUser = async function (req, res) {
    try {
        let id = req.params.id

        let deleteUser = await userModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        if (!deleteUser) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        return res.status(200).send({ status: true, message: "User deleted successfully", data: deleteUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser }