const mongoose = require('mongoose')
const Schema= mongoose.Schema
const review= require("./review")


const ImageSchema= new Schema({
    filename:String ,
     url:String


})
ImageSchema.virtual('thumbnail').get(function(){

    return this.url.replace('/upload','/upload/w_200')
    

})
const CampgroundSchema= new Schema(

{
title:String,
price:{type:Number,required:true},
description:String,
location:String,
images:[ImageSchema],
author:{
type:Schema.Types.ObjectId,
ref:'User'
},
reviews:[{type:Schema.Types.ObjectId,ref:'review'}]
})

CampgroundSchema.post('findOneAndDelete',async function(doc){


    if(doc)
    {
        await review.deleteMany({_id:{$in:doc.reviews}}) 
    }
console.log("deleted")

    

})


module.exports= mongoose.model('Campground',CampgroundSchema)

