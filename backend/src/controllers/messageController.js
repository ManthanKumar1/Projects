const util = require('util')
let { connection } = require('../dbConnection.js')

const query = util.promisify(connection.query).bind(connection)

let sendMessage = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" });
        }

        let { sender_uuid, receiver_uuid, message } = data;

        let createMessageQuery = `INSERT INTO messages (sender_uuid, receiver_uuid, message) VALUES (?, ?, ?)`;
        let createMessageValue = [sender_uuid, receiver_uuid, message];
        
        // Use the pool to execute the insert
        await connection.execute(createMessageQuery, createMessageValue);

        return res.status(201).send({ status: true, message: "Message sent successfully" });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).send({ status: false, message: error.message });
    }
}

let viewMessage = async function (req, res) {
    try {
        const { sender_uuid, receiver_uuid } = req.query;

        // Validate UUIDs
        if (!sender_uuid || !receiver_uuid) {
            return res.status(400).send({ status: false, message: "Sender and receiver UUIDs are required" });
        }

        let fetchQuery = `SELECT * FROM messages WHERE (sender_uuid = ? AND receiver_uuid = ?) OR (sender_uuid = ? AND receiver_uuid = ?)`;
        let fetchValue = [sender_uuid, receiver_uuid, receiver_uuid, sender_uuid];
        let fetchMessage = await query(fetchQuery, fetchValue);
        
        if (fetchMessage[0].length === 0) {
            return res.status(404).send({ status: false, message: "No messages found" });
        }

        return res.status(200).send({ status: true, message: "All messages retrieved", data: fetchMessage[0] });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { sendMessage, viewMessage };
