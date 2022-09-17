const jwt=require('jsonwebtoken')
const env = require("../models/.env.js");

module.exports=function(req,res,next){
    var token=req.header('auth-token')
    if(!token) return res.status(401).send("access denied unauthorised")
    try{
        var verify=jwt.verify(token,env.JWT_KEY)
        next();
    }
    catch(err){
        res.status(500).send("invalid token")
    }
}