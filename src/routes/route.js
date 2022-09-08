const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/middleware")
const authorValidation = require("../middleware/authorValidation")
const blogValidation = require("../middleware/blogValidation")

//Author
router.post("/authors",authorValidation.createValidation, authorController.createAuthor) //Create Author
router.post("/login",authorValidation.loginValidation, authorController.login)

//Blog
router.post("/blogs",blogValidation.blogValidation, middleware.authentication, blogController.createBlog) //Create Blog
router.get("/blogs", middleware.authentication, blogController.getBlog) //Get All Blogs
router.put("/blogs/:blogId",blogValidation.updateValidation, middleware.authentication, middleware.authorisation, blogController.updateBlog) //Update Blog
router.delete("/blogs/:blogId",middleware.authentication, middleware.authorisation, blogController.deleteBlog) //Delete Blog by Specific Id
router.delete("/blogs",middleware.authentication, blogController.deleteBlogByQuery) //Delete Blog by Using Query


module.exports = router;