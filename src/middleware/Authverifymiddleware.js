const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let Token = req.headers['token_key']
    jwt.verify(Token, "myPersonalSecret123", (err, decoded) => {
        if(err){
            res.status(401).json({status: "Invalid Token", data: err.toString()})
        }else{
            let email = decoded['data']
            console.log(email)
            req.headers.email = email
            next()
        }
    })
}