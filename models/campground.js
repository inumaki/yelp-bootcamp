const mongoose = require('mongoose')
const Schema= moongoose.Schema
const CampgroundSchema= new Schema(

{
title:String,
price:String,
description:String,
location:String
})


module.exports= mongoose.model('Campground',CampgroundSchema)

