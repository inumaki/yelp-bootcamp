const express= require('express')
const router= express.Router()
const app= express();
const  catchAsync= require('../utils/catchAsync')
const {campgroundSchema,reviewSchema}= require('../validationschema.js')
const Campground= require('../models/campground');
const  expressError= require('../utils/expressError')
const review= require('../models/review')
const isloggedin = require('../middleware');
const { populate } = require('../models/review');
const campgroundobj = require('../controllers/campgrounds')
//-----------------------show all campgrounds title
validateform= (req,res,next)=>
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
isAuthor= async(req,res,next)=>{
  const {id}= req.params;
  const camp = await Campground.findById(id)
    if(!camp.author.equals(req.user._id)){
      req.flash('error','you do not have premission to do that')
      return res.redirect('/campgrounds')}
  next()
  }
//-----------------to load all campgrounds
router.get('/',catchAsync(campgroundobj.index))

    //-----------------------to create new campground
router.get('/new',isloggedin, async(req,res)=>{
    res.render('campground/createcamp')
    })

    //----------------------getting the post request from form 
router.post('/',isloggedin,validateform,catchAsync(campgroundobj.makecamp))
 
    //---------------------to edit 
    
   router.get('/:id/edit',catchAsync(campgroundobj.updatecamp))
    
   //----------------put request to update the camp

    router.put('/:id',isloggedin,isAuthor,validateform, catchAsync(campgroundobj.updatecampput))

    //----------------deleting a campground
   router.delete('/:id',isloggedin,isAuthor,catchAsync(campgroundobj.delcamp))
    
//--------------------------------------to show details
router.get('/:id',catchAsync(campgroundobj.laodcamp))
    //-----------------------------------------------
    module.exports=  router;