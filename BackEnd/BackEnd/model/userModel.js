const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    pic:{type:String,default:'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg'}
},{
    timestamps:true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel