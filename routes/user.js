const express= require('express')
const user_router= express.Router({mergeParams:true})
const app= express();
const  catchAsync= require('../utils/catchAsync')
const {campgroundSchema,reviewSchema}= require('../validationschema.js')
const Campground= require('../models/campground');
const  expressError= require('../utils/expressError')
const review= require('../models/review')
const path =require('path');
const User= require('../models/user')
app.set('views',path.join(__dirname,'views'))


  //---------------------
user_router.get('/register',(req,res)=>{

res.render('users/register')

})

  
//---------------------------------------------------------

user_router.post('/register',async(req,res,next)=>{

const {email,password,username}= req.body
const newuser =await new User({email,username});
await User.register(newuser,password)
req.flash('Welcome to yelp camp')
res.redirect('campgrounds/')

})

//-----------------------------------------
module.exports= user_router;