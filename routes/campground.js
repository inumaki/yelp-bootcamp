const express= require('express')
const router= express.Router()
const app= express();
const  catchAsync= require('../utils/catchAsync')
const {campgroundSchema,reviewSchema}= require('../validationschema.js')
const Campground= require('../models/campground');
const  expressError= require('../utils/expressError')
const review= require('../models/review')
const path =require('path');
app.set('views',path.join(__dirname,'views'))
//-----------------------show all campgrounds title
const  validateform= (req,res,next)=>
{
    
    const {error}= campgroundSchema.validate(req.body)
   
    if(error)
    {
      const msg= error.details.map(el=>el.message).join(', ')
      throw new expressError(msg,400)
    }
    else
    {
      next()
    }


}

router.get('/',async(req,res)=>{

    const details= await Campground.find({})
    res.render('campground/index',{details})
    
    })
    //-----------------------to create new campground
router.get('/new', async(req,res)=>{
    
    res.render('campground/createcamp')
    
    })
//----------------------getting the post request from form 
router.post('/',validateform,catchAsync(async(req,res,next)=>{

    const camp= await new Campground(req.body)
    await camp.save()
    
    res.redirect(`campgrounds/${camp._id}`)
    
    
    
    }))
 
    //---------------------to edit 
    
   router.get('/:id/edit',catchAsync(async(req,res)=>{
    
    const {id}= req.params
    const camp= await Campground.findById(id)
    
    res.render('campground/editcamp',{camp})
    
    }))
    //----------------put request to update the camp

    router.put('/:id',validateform, catchAsync(async(req,res)=>{
    
      const {id}= req.params
 
      const camp=  await Campground.findByIdAndUpdate(id,req.body,{new:true})
      res.redirect(`/campgrounds/${id}`)
      
      }))
    //----------------deleting a campground
   router.delete('/:id',catchAsync(async(req,res)=>{
    
      const {id} =req.params
    await Campground.findByIdAndDelete(id)
    
    res.redirect('/campgrounds/')
    }))
    
//--------------------------------------to show details
router.get('/:id',catchAsync(async(req,res)=>{

    const {id}= req.params;
    const details = await Campground.findById(id).populate('reviews')
    res.render('campground/detailspage' ,{details})
    
    
    }))
    
    //-----------------------------------------------



    module.exports=  router;