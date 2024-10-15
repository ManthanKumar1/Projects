const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util')
let { connection } = require('../dbConnection.js')

const query = util.promisify(connection.query).bind(connection)

let createUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" });
        }

        let { user_name, email, phone, password, role } = data;

        // const hashedPassword = await bcrypt.hash(password, 10);

        let createQuery = `INSERT INTO users (user_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`;
        let createValue = [user_name, email, phone, password, role];

        // Use the pool to execute the insert
        await connection.execute(createQuery, createValue);

        // Get the new user's details
        let newUserQuery = `SELECT * FROM users WHERE email = ?`;
        let checkEmailValue = [email];
        let newUser = await query(newUserQuery, checkEmailValue);

        // Check if a user was found
        if (newUser[0].length === 0) {
            return res.status(404).send({ status: false, message: "User not found after creation" });
        }

        // Generate JWT token
        let token = jwt.sign({
            uuid: newUser[0].uuid.toString(), // Adjusted indexing
            role: newUser[0].role
        }, "message");

        let showData = {
            uuid: newUser[0].uuid.toString(),
            role: newUser[0].role,
            token: token
        };

        res.status(201).send({ status: true, message: 'User registered successfully.', data: showData });
    } catch (error) {
        console.error('Error occurred while creating user:', error); // Log the error
        return res.status(500).send({ status: false, message: error.message });
    }
}

let loginUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" });
        }

        let { email, password } = data;

        let checkEmailQuery = `SELECT * FROM users WHERE email = ? AND password = ? AND is_deleted = ?`;
        let checkEmailValue = [email, password, false];
        let checkEmail = await query(checkEmailQuery, checkEmailValue);
        
        if (checkEmail.length === 0) {
            return res.status(404).send({ status: false, message: "Email not found" });
        }

        let token = jwt.sign({
            uuid: checkEmail[0].uuid.toString(), // Adjusted indexing
            role: checkEmail[0].role
        }, "message");

        let showData = {
            uuid: checkEmail[0].uuid.toString(),
            role: checkEmail[0].role,
            token: token
        };

        return res.status(200).send({ status: true, message: "User logged in successfully", data: showData });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ status: false, message: error.message });
    }
}

let getUser = async function (req, res) {
    try {
        let uuid = req.query.uuid;

        // If UUID is provided, fetch specific user details
        if (uuid) {
            let fetchQuery = `SELECT uuid, user_name, email, phone, role FROM users WHERE uuid = ? AND is_deleted = ?`;
            let fetchValue = [uuid, false];
            let fetchUser = await query(fetchQuery, fetchValue);
            
            if (fetchUser.length === 0) {
                return res.status(404).send({ status: false, message: "User not found" });
            }

            return res.status(200).send({ status: true, message: "Your detail", data: fetchUser[0] }); // Return only the first user object
        } else {
            // If UUID is not provided, fetch all users
            let fetchQuery = `SELECT uuid, user_name, email, phone, role FROM users WHERE is_deleted = ?`;
            let fetchValue = [false];
            let fetchUsers = await query(fetchQuery, fetchValue);
            
            if (fetchUsers.length === 0) {
                return res.status(404).send({ status: false, message: "No users found" });
            }

            return res.status(200).send({ status: true, message: "All users", data: fetchUsers });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

let updateUser = async function (req, res) {
    try {
        let uuid = req.params.uuid

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" })
        }

        let { user_name, email, phone, password, role } = data

        let updateQuery = `UPDATE users SET user_name = ?, email = ?, phone = ?, password = ?, role = ? WHERE uuid = ? AND is_deleted = ?`
        let updateValue = [user_name, email, phone, password, role, uuid, false]
        await connection.execute(updateQuery, updateValue)
        if (updateUser.length == 0) {
            return res.status(404).send({ status: false, message: "user not found" })
        }

        return res.status(200).send({ status: true, message: "user updated successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let deleteUser = async function (req, res) {
    try {
        let uuid = req.params.uuid

        let deleteQuery = `UPDATE users SET is_deleted = ? WHERE uuid = ? AND is_deleted = ?`
        let deleteValue = [true, uuid, false]
        await connection.execute(deleteQuery, deleteValue)
        if (deleteUser.length == 0) {
            return res.status(404).send({ status: false, message: "user not found" })
        }

        return res.status(200).send({ status: true, message: "user deleted successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser }