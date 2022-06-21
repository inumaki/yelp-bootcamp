const mongoose = require('mongoose')
const Schema= mongoose.Schema
const review= require("./review")
const CampgroundSchema= new Schema(

{
title:String,
price:{type:Number,required:true},
image:String,
description:String,
location:String,
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

