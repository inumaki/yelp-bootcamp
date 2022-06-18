const mongoose = require('mongoose')
const Schema= mongoose.Schema
const CampgroundSchema= new Schema(

{
title:String,
price:{type:Number,required:true},
image:String,
description:String,
location:String
})


module.exports= mongoose.model('Campground',CampgroundSchema)

