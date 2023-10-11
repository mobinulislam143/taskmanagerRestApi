const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    
email : {type: String, unique: true},
firstName : {type: String},
lastName : {type: String},
mobile : {type: Number},
password : {type: String}
}, {versionKey: false, timeStamp: true})

const UserModel = mongoose.model('users', DataSchema)
module.exports = UserModel
