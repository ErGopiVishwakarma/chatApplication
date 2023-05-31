
const jwt = require('jsonwebtoken')
const UserModel = require('../model/userModel')

const authenticate = async(req, res , next) =>{
     const token = req.headers.authorization?.split(" ")[1]
     if(token){
        try {
            const decoded= jwt.verify(token,'chat')
            const id=decoded.userId
            req.user=await UserModel.findById(id).select('-password')
            next()
        } catch (error) { 
            res.send({msg:"please login first sdgfadfasdfasdfasd...",error:error.message})
        }
     }else{
        res.send({msg:"please login first.jhgjhkghj.."})
     }
}

module.exports=authenticate