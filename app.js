// basic import
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')


// Security Middleware Lib Import
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')


// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(mongoSanitize());

mongoose.set('strictQuery', false);

// Body Parser Implement
app.use(bodyParser.json())

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

const appRoute = require('./src/Routes/api')

app.use('/api', appRoute)
app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Not Found" });

})
let URI="mongodb+srv://mobinulislam:8NWFTTL3vZqC2W0L@cluster0.mskd8ua.mongodb.net/task_managers";

mongoose.connect(URI, {
    useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,

})
.then(()=> {
    console.log(`Mongoose is connected`)
}).catch(e => {
    console.log(e)
})

module.exports = app