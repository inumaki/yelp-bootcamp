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
const multer  = require('multer')
const {storage}= require('../cloudinary')
const upload = multer({storage})
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




  router.get('/new',isloggedin, async(req,res)=>{
    res.render('campground/createcamp')
    })



//-----------------to load all campgrounds
router.route('/')
.get(catchAsync(campgroundobj.index))
.post(isloggedin,upload.array('image'),validateform,catchAsync(campgroundobj.makecamp))




    //-----------------------to create new campground

    

 
    //---------------------to edit 
    

    
   //----------------put request to update the camp
router.route('/:id') 
.put(isloggedin,isAuthor,upload.array('image'),validateform, catchAsync(campgroundobj.updatecampput))
   .delete(isloggedin,isAuthor,catchAsync(campgroundobj.delcamp))
    .get(catchAsync(campgroundobj.laodcamp));


router.get('/:id/edit',catchAsync(campgroundobj.updatecamp))
//-----------------------------------------------
    module.exports=  router;