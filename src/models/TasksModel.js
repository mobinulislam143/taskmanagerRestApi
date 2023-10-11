const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    email:{type:String},
}, {timeStamp: true, versionKey: false})

const taskModel = mongoose.model('tasks', DataSchema)
module.exports = taskModel