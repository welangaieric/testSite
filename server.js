const express = require('express')
require('dotenv').config({})
const morgan = require('morgan')
require('express-async-errors')
var cors = require('cors')
var bodyParser = require('body-parser')
const PORT = process.env.port
const app = express()

const pageroutes = require('./routes/pageroutes')

let  server = app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})


// middlewares 
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))// setup the logger
app.use(pageroutes)
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).send('someting went wrong')
})

