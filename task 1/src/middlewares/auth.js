const jwt = require('jsonwebtoken');

const authentication = async function (req, res, next) {
    try {
        const bearerToken = req.headers["authorization"];
        if (!bearerToken) {
            return res.status(401).send({ status: false, msg: "Token must be present" });
        }

        const token = bearerToken.split(" ")[1];

        const decodedToken = jwt.verify(token, "task1");

        req.user = {
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email
        };

        next();
    } catch (error) {
        return res.status(401).send({ status: false, msg: error.message });
    }
};

module.exports = { authentication }