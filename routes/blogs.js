const express = require('express')
const {getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog} = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)
//get all blogs
router.get('/', getBlogs)

//get a single blog
router.get('/:id', getBlog)

//post a new blog
router.post('/', createBlog)

//Delete a blog
router.delete('/:id', deleteBlog)

//Update a blog
router.patch('/:id', updateBlog)

module.exports = (router)