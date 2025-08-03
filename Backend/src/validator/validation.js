let mongoose = require('mongoose')

let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false

    return true
}

let isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

let isValidName = (/^[a-zA-Z ]*$/)

let isValidMail = (/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/);

let isValidTitle = (/^[a-zA-Z0-9,-. ]*$/)

module.exports = { isValid, isValidObjectId, isValidName, isValidMail, isValidTitle }