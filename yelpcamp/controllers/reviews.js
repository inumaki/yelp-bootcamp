const {campgroundSchema,reviewSchema}= require('../validationschema.js')
const Campground= require('../models/campground');
const review= require('../models/review')
module.exports.deletereview= async(req,res)=>{
      
    const{id, reviewId}= req.params;
const cmp = await review.findById(reviewId)
if(!cmp.author.equals(req.user._id))
{
req.flash('error','you cannot delete this review')
 return  res.redirect(`/campgrounds/${id}`)
}
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    const result=await  review.findByIdAndDelete(reviewId);
    req.flash('success',"Deleted your review")
  res.redirect(`/campgrounds/${id}`)
  
  }

  module.exports.addreview= async(req,res)=>{
    
    const {id} = req.params
    const {rating ,body }= req.body.review
    
    const newreview= await new review({body,rating})
    newreview.author= req.user._id
    let cmpground = await Campground.findById(id)
    await cmpground.reviews.push(newreview)
    await cmpground.save()
    await newreview.save()
    req.flash('success',"Succesfully added a review")
    res.redirect(`/campgrounds/${id}`)
    }