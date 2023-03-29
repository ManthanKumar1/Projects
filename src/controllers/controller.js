const formModel = require('../models/model')
const {isValid, isValidName, isValidMail, isValidDate} = require('../validations/validator')

const createForm = async function(req, res){
    try {
        let data = req.body
        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "please provide some information"})
        }

        let obj = {}
        let {FirstName, LastName, Email, Country, State, City, Gender, DateOfBirth} = data

        if(!isValid(FirstName)){
            return res.status(400).send({status: false, message: "please provide valid First Name"})
        }
        if(!isValidName.test(FirstName)){
            return res.status(400).send({status: false, message: "please provide First Name in alphabets only"})
        }
        obj.FirstName = FirstName

        if(!isValid(LastName)){
            return res.status(400).send({status: false, message: "please provide valid Last Name"})
        }
        if(!isValidName.test(LastName)){
            return res.status(400).send({status: false, message: "please provide Last Name in alphabets only"})
        }
        obj.LastName = LastName

        if(!isValid(Email)){
            return res.status(400).send({status: false, message: "please provide valid Email"})
        }
        if(!isValidMail.test(Email)){
            return res.status(400).send({status: false, message: "please provide Email in proper format"})
        }
        const duplicateEmail = await formModel.findOne({Email})
        if(duplicateEmail){
            return res.status(400).send({status: false, message: "Email is already registered"})
        }
        obj.Email = Email

        if(!isValid(Country)){
            return res.status(400).send({status: false, message: "please provide valid Country Name"})
        }
        if(!isValidName.test(Country)){
            return res.status(400).send({status: false, message: "please provide Country Name"})
        }
        obj.Country = Country
        
        if(!isValid(State)){
            return res.status(400).send({status: false, message: "please provide valid State Name"})
        }
        if(!isValidName.test(State)){
            return res.status(400).send({status: false, message: "please provide State Name"})
        }
        obj.State = State

        if(!isValid(City)){
            return res.status(400).send({status: false, message: "please provide valid City Name"})
        }
        if(!isValidName.test(City)){
            return res.status(400).send({status: false, message: "please provide City Name"})
        }
        obj.City = City

        if(!isValid(Gender) || Gender != "Male" && Gender != "Female" && Gender != "Transgender"){
            return res.status(400).send({ status: false, msg: "please provide Gender in Male, Female, Transgender"})
        }
        obj.Gender = Gender

        if(!isValid(DateOfBirth)){
            return res.status(400).send({status: false, message: "please provide Date of Birth in proper format"})
        }
        if(!isValidDate.test(DateOfBirth)){
            return res.status(400).send({status: false, message: "please provide valid Date of Birth"})
        }
        obj.DateOfBirth = DateOfBirth

        obj.Age = Date.now() - DateOfBirth

        const formData = await formModel.create(obj)
        return res.status(201).send({status:true, message: "form is created", data: formData})
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}

module.exports = {createForm}