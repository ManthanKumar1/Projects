const jwt = require('jsonwebtoken');

const authentication = async function (req, res, next) {
    try {
        const bearerToken = req.headers["authorization"];
        if (!bearerToken) {
            return res.status(401).send({ status: false, msg: "Token must be present" });
        }

        const token = bearerToken.split(" ")[1];

        // ✅ Synchronous version of jwt.verify
        const decodedToken = jwt.verify(token, "assignment");

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            username: decodedToken.username
        };

        next();
    } catch (error) {
        return res.status(401).send({ status: false, msg: error.message });
    }
};

module.exports = { authentication }