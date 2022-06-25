const mongoose = require('mongoose')
const passportlocalmongoose= require('passport-local-mongoose')

const user = new mongoose.Schema({
    email:{type:String , required:true,unique:true}
})

user.plugin(passportlocalmongoose)
module.exports = mongoose.model('User',user)