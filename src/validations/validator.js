const mongoose = require('mongoose')

const isValid = function(value){
    if(!value || typeof value === "undefined" || value === null || typeof value != 'string') return false
    if(typeof value === "string" && value.trim().length === 0 ) return false
    return true
}

const isValidName = (/^[a-zA-Z ]*$/)

const isValidMail = (/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/);

const isValidDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

module.exports = {isValid, isValidName, isValidMail, isValidDate}