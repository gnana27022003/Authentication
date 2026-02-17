const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

app.set('view engine','ejs')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname,'views')))

const router = require('./routers/router')
const {errorMiddleware} = require('./middleware/errorMiddleware')

app.use(router)

app.use(errorMiddleware)


app.listen(3004,()=>{
    console.log("server running at http://localhost:3004/")
})
