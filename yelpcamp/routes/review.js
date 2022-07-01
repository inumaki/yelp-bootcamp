const express= require('express')
const reviewrouter= express.Router({mergeParams:true})
const  catchAsync= require('../utils/catchAsync')
const {campgroundSchema,reviewSchema}= require('../validationschema.js')
const  expressError= require('../utils/expressError')

const isloggedin= require('../middleware')
const reviewobj= require('../controllers/reviews')
//------------------------------------------------

//-----------------------------------------------------

const validateReview= (req,res,next)=>{
    console.log(req.body)
    const {error}= reviewSchema.validate(req.body.review)
    
    if(error)
    {
      const msg= error.details.map(el=>el.message).join(', ')
      throw new expressError(`review: ${msg}`,400)
    }
    else
    {
      next()
    }
    }
  //---------------------

  reviewrouter.delete('/:reviewId',isloggedin,reviewobj.deletereview)
  
//---------------------------------------------------------

reviewrouter.post("",isloggedin ,validateReview,catchAsync(reviewobj.addreview))

//-----------------------------------------
module.exports= reviewrouter;