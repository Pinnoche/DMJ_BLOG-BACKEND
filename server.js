require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')


const app = express()

//middleware
app.use(cors({
    origin:'http://localhost:3000',
    Credentials:true
}));
app.use(express.json())

//routing
app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRoutes)

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