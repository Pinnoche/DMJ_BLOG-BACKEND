const Blogs = require('../models/blogModel')
const mongoose = require('mongoose')

//get all Blogs
const getBlogs = async (req, res) => {
    const blogs = await Blogs.find({}).sort({createdAt: -1})

    res.status(200).json(blogs)
}

//get a single blog
const getBlog = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Blog"})
    }

    const blog = await Blogs.findById(id)

    if(!blog) {
        return res.status(404).json({error: 'No such Blog'})
    }
    res.status(200).json(blog)
}

//create new blog
const createBlog = async ( req, res) => {
    const {title, author, body} = req.body

    //add data to db
    try {
        const blog = await Blogs.create({title, author, body})
        res.status(200).json(blog)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Workout"})
}

const blog = await Blogs.findOneAndDelete({_id: id})
if(!blog) {
    return res.status(404).json({error: 'No such workout'})
}
res.status(200).json(blog)
}

//update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Workout"})
}

const blog = await Blogs.findOneAndUpdate({_id: id}, {
    ...req.body
})
if(!blog) {
    return res.status(404).json({error: 'No such workout'})
}
res.status(200).json(blog)
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}