const UserModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const sendEmailUtility = require('../utility/SendEmailUtility')
const otpModel = require('../models/OTPModel')

exports.registration =async (req, res) => {
    let reqBody = req.body
    // let email = reqBody['email']
    // let firstName = reqBody['firstName']
    // let lastName = reqBody['lastName']
    // let mobile = reqBody['mobile']
    // let password = reqBody['password']
    try{
        let result = await UserModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}
exports.login = async(req, res) => {
    try{
        let reqBody=req.body;
        let result= await UserModel.find(reqBody).count();
        if(result===1){
            // Create Token
            let Payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:reqBody['email']
            }
            let Token=jwt.sign(Payload,"myPersonalSecret123");
            res.status(200).json({status:"success", Token: Token, data:result})

        }
        else{
            // Login fail
            res.status(400).json({status:"fail",data:"No User Found"})
        }
    }
    catch (e) {
        res.status(404).json({status:"fail",data:e})
    }
}
exports.profileDetails = async (req, res) => {
    try{
        let email= req.headers['email'];
        let result = await UserModel.find({email: email})
        res.status(200).json({status:"success",data: result})
    }catch(err) {
        res.status(404).json({status:"fail",data:err.toString()})

    }
  
}
exports.profileUpdate =async (req, res) => {
    try{
        let email = req.headers['email']
        let reqBody = req.body
        let result = await UserModel.updateOne({email:email}, reqBody)
        res.status(200).json({status:"success",data: result})

    }catch(err){
        res.status(404).json({status:"fail",data:err.toString()})

    }

}
exports.RecoverVerifyEmail = async(req, res) => {
    let email = req.params.email
    let otpCode = Math.floor(100000+Math.random()*900000)
    let emailTxt = "Your Verification code is = "+otpCode
    let emailSub = "Task Manager verification Code"
    let result= await UserModel.find({email:email}).count();
    if (result===1){
        await sendEmailUtility(email, emailTxt, emailSub)
       await otpModel.create({email: email, otp: otpCode})
        res.status(200).json({status:"success",data: "6 digit verification code has been sent in your mail"})
        
    }else{
        res.status(400).json({status:"fail",data:"No User Found"})
    }

}
exports.RecoverVerifyOtp = async(req, res) => {
    let email = req.params.email
    let otpCode = req.params.otp
    let status = 0
    let statusUpdate = 1
    let result = await otpModel.find({email:email, otp: otpCode, status: status}).count()
    if(result===1){
       await otpModel.updateOne({email:email, otp: otpCode,status:status}, {status: statusUpdate})
       res.status(200).json({status:"success",data:"Verification Completed"})
    }else{
        res.status(400).json({status:"fail",data:"Invalid verification"})

    }
}
exports.RecoverResetPass = async(req, res) => {
    try {
        let email = req.body['email'];
        let OTPCode = req.body['OTP'];
        let NewPass = req.body['password'];
        let status = 1;

        let result = await otpModel.find({ email: email, otp: OTPCode, status: status }).count();
        console.log(result)
        if (result === 1) {
            let result = await UserModel.updateOne({ email: email }, { password: NewPass });
            console.log('Password reset result:', result);
            res.status(200).json({ status: "success", data: "Password Reset Success" });
        } else {
            res.status(200).json({ status: "fail", data: "Password cannot reset" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: "error", data: "Internal server error" });
    }
}

exports.demo = (req, res) => {
    res.status(200).json({status: "active", message: "This is rest api"})
}