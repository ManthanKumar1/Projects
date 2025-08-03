let fs = require("fs")
let path = require("path")
let bookModel = require("../models/bookModel")
let userModel = require("../models/userModel")
let { isValid, isValidTitle, isValidName, isValidObjectId } = require("../validator/validation")

let createBook = async (req, res) => {
    try {
        let owner = req.user.id

        if (!isValidObjectId(owner)) {
            return res.status(400).send({ status: false, message: "Invalid owner ID" })
        }

        let checkOwner = await userModel.findOne({ _id: owner, isDeleted: false })
        if (!checkOwner) {
            return res.status(404).send({ status: false, message: "Owner not found" })
        }

        let data = req.body
        let images = req.files

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Request body is empty" })
        }

        let { title, author, condition, originalPrice, price } = data

        if (!isValid(title) || !isValidTitle.test(title)) {
            return res.status(400).send({ status: false, message: "Invalid or missing title" })
        }

        if (!isValid(author) || !isValidName.test(author)) {
            return res.status(400).send({ status: false, message: "Invalid or missing author" })
        }

        let allowedConditions = ["Good", "Bad", "Moderate"]
        if (!allowedConditions.includes(condition)) {
            return res.status(400).send({ status: false, message: "Invalid condition" })
        }

        if (!isValid(originalPrice)) {
            return res.status(400).send({ status: false, message: "Original price is required" })
        }

        if (!isValid(price)) {
            return res.status(400).send({ status: false, message: "Price is required" })
        }

        let imagePaths = []
        if (images && images.length > 0) {
            for (let img of images) {
                let fileName = Date.now() + "-" + img.originalname.replace(/\s+/g, "_")
                let uploadPath = path.join(__dirname, "../../uploads", fileName)
                fs.writeFileSync(uploadPath, img.buffer)
                imagePaths.push(`http://localhost:3000/uploads/${fileName}`)
            }
        }

        let bookData = {
            title,
            author,
            condition,
            originalPrice,
            price,
            owner,
            image: imagePaths
        }

        let newBook = await bookModel.create(bookData)
        return res.status(201).send({ status: true, message: "Book created successfully", data: newBook })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let getBook = async (req, res) => {
    try {
        let { bookId, owner, requests } = req.query
        let query = { isDeleted: false, remove: false }

        if (bookId) {
            if (!isValidObjectId(bookId)) {
                return res.status(400).send({ status: false, message: "Invalid book ID" })
            }
            query._id = bookId
        }

        if (owner) {
            if (!isValidObjectId(owner)) {
                return res.status(400).send({ status: false, message: "Invalid owner ID" })
            }
            query.owner = owner
        }

        if (requests && isValidObjectId(requests)) {
            query["requests.user"] = requests
        }

        let books = await bookModel.find(query)
            .populate("owner", "username")
            .populate("requests.user", "username")

        if (books.length === 0) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        return res.status(200).send({ status: true, message: "Books fetched successfully", data: books })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let requestBook = async (req, res) => {
    try {
        let { bookId } = req.query
        let userId = req.user.id

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book ID" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        if (book.owner.toString() === userId) {
            return res.status(400).send({ status: false, message: "You cannot request your own book" })
        }

        let existingRequest = book.requests.find(r => r.user.toString() === userId)

        if (existingRequest && existingRequest.status !== "declined") {
            return res.status(400).send({ status: false, message: "You have already requested this book" })
        }

        if (existingRequest && existingRequest.status === "declined") {
            book.requests = book.requests.filter(r => r.user.toString() !== userId)
        }

        book.requests.push({ user: userId })
        await book.save()

        return res.status(200).send({ status: true, message: "Book requested successfully", data: book })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let updateRequestStatus = async (req, res) => {
    try {
        let { bookId, requestId } = req.query
        let { status } = req.body
        let ownerId = req.user.id

        if (!isValidObjectId(bookId) || !isValidObjectId(requestId)) {
            return res.status(400).send({ status: false, message: "Invalid book or request ID" })
        }

        if (!["accepted", "declined"].includes(status)) {
            return res.status(400).send({ status: false, message: "Invalid status" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        if (book.owner.toString() !== ownerId) {
            return res.status(403).send({ status: false, message: "Not authorized" })
        }

        let request = book.requests.id(requestId)
        if (!request) {
            return res.status(404).send({ status: false, message: "Request not found" })
        }

        request.status = status

        if (status === "accepted") {
            book.remove = true
        }

        await book.save()

        return res.status(200).send({ status: true, message: "Request status updated", data: request })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let showRemove = async (req, res) => {
    try {
        let userId = req.user.id

        let books = await bookModel.find({
            remove: true,
            isDeleted: false,
            $or: [
                { owner: userId },
                { "requests": { $elemMatch: { user: userId, status: "accepted" } } }
            ]
        }).populate("owner", "username").populate("requests.user", "username")

        if (!books.length) {
            return res.status(404).send({ status: false, message: "No sold books found" })
        }

        let result = books.map(book => {
            let isOwner = book.owner._id.toString() === userId
            let isBuyer = book.requests.some(r => r.user._id.toString() === userId && r.status === "accepted")

            return {
                _id: book._id,
                title: book.title,
                author: book.author,
                image: book.image,
                price: book.price,
                status: isOwner ? "You sold this book" : isBuyer ? "You bought this book" : "Unknown"
            }
        })

        return res.status(200).send({ status: true, message: "Removed books found", data: result })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let updateBook = async (req, res) => {
    try {
        let { bookId } = req.query
        let userId = req.user.id
        let updateData = req.body

        let allowedFields = ['title', 'author', 'condition', 'originalPrice', 'price', 'image']

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book ID" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        if (book.owner.toString() !== userId) {
            return res.status(403).send({ status: false, message: "Not your book" })
        }

        for (let key in updateData) {
            if (!allowedFields.includes(key)) {
                return res.status(400).send({ status: false, message: `Field '${key}' cannot be updated` })
            }
            if (key === 'condition' && !["Good", "Bad", "Moderate"].includes(updateData[key])) {
                return res.status(400).send({ status: false, message: "Invalid condition" })
            }
        }

        Object.assign(book, updateData)
        await book.save()

        return res.status(200).send({ status: true, message: "Book updated", data: book })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let deleteBook = async (req, res) => {
    try {
        let { bookId } = req.query
        let userId = req.user.id

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book ID" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        if (book.owner.toString() !== userId) {
            return res.status(403).send({ status: false, message: "Not authorized to delete" })
        }

        book.isDeleted = true
        await book.save()

        return res.status(200).send({ status: true, message: "Book deleted" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let getBookImage = async (req, res) => {
    try {
        let { bookId } = req.query

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: 'Invalid book ID' })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book || !book.image || book.image.length === 0) {
            return res.status(404).send({ status: false, message: 'Image not found for this book' })
        }

        let imageUrl = book.image[0]
        let filename = path.basename(imageUrl)
        let filepath = path.join(__dirname, '../../uploads', filename)

        if (!fs.existsSync(filepath)) {
            return res.status(404).send({ status: false, message: 'Image file not found on server' })
        }

        return res.sendFile(filepath)

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createBook, getBook, requestBook, updateRequestStatus, showRemove, updateBook, deleteBook, getBookImage }
