const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number,default:0},
}, {timestamps: true,versionKey:false})

const otpModel = mongoose.model('otps', DataSchema)
module.exports= otpModel