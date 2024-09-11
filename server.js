require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')

const app = express()

//middleware
app.use(express.json())

// app.use((req, res, next) =>{
//     console.log(req.path, req.method)
//     next()
// })

//routing
app.use('/api/blogs', blogRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    app.listen(process.env.PORT, () =>{
        console.log('connected to db & looking through port', process.env.PORT)
    })
})
.catch((err) =>{
    console.log(err)
})


process.env