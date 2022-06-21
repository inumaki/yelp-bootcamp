const { number } = require('joi')
const mongoose = require('mongoose')
const Schema= mongoose.Schema
const reviewSchema= new Schema(

{
body:{type:String},
rating:Number
})


module.exports= mongoose.model('review',reviewSchema)



