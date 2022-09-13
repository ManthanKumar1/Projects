const blogModel = require("../models/blogModel")
const blogController = require("../controllers/blogController")

const regexCharAndNum = new RegExp(/^[a-z\d\-_\s]+$/i) 

const isValid = function(value){
    if(!value ||typeof value != 'string'|| typeof value === 'undefined' || value === null || value.trim().length === 0) return true
    return false
}

// Create Blog Validation

const blogValidation = function(req, res, next){
let data = req.body

        if (isValid(data.title) || !data.title.match(regexCharAndNum)) {
            return res.status(400).send({ status: false, msg: "Title is required and must be valid" })
        }

        if (isValid(data.body)) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
         
        if (data.tags && typeof (data.tags) != "object") {
            return res.status(400).send({ status: false, msg: "Tags should be string" })
        }

        if (isValid(data.category)) {
            return res.status(400).send({ status: false, msg: "Category should be string" })
        }

        if (data.subcategory && typeof (data.subcategory) != 'object') {
            return res.status(400).send({ status: false, msg: "Subcategory should be string" })
        }
        next()
    }


// Update Validation

const updateValidation = function(req, res, next){
    let data = req.body
let detail = req.body.title
let tags = req.body.tags
let subcategory = req.body.subcategory

if(!data){
    return res.status(400).send({status: false, msg: "No data for update"})
}
if (!detail.match(regexCharAndNum)) {
    return res.status(400).send({ status: false, msg: "Title is required and must be valid" })
}

if (tags && typeof (tags) != 'object') {
    return res.status(400).send({ status: false, msg: "Tags should be string " })
}

if (subcategory && typeof (subcategory) != 'object') {
    return res.status(400).send({ status: false, msg: "Subcategory should be string" })
}
next()
}

module.exports.blogValidation = blogValidation 

module.exports.updateValidation = updateValidation