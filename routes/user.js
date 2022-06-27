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
const passport = require('passport')
const isloggedin = require('../middleware')


  //---------------------
user_router.get('/register',(req,res)=>{


res.render('users/register')

})

  
//---------------------------------------------------------

user_router.post('/register',catchAsync(async(req,res,next)=>{
try{
const {email,password,username}= req.body
const newuser =await new User({email,username});
const newUser= await User.register(newuser,password)
req.login(newUser,err=>{
    if(err) return next(err)
req.flash('success','Welcome to yelp camp')
res.redirect('campgrounds/')
    })}
catch(err){
    req.flash('error',err.message)
    res.redirect('/register')

}

}))
//---------------------login-----get-------
user_router.get('/login',(req,res)=>{

    res.render('users/login')
})
user_router.post('/login',passport.authenticate('local',{failureFlash:true,
    failureRedirect:'/login'}),catchAsync(async(req,res)=>{
        const returnto = await req.session.returntoUrl || '/campgrounds'
       // console.log('------------------------------------')
        //console.log("inside post",req.session.returntoUrl)
       // console.log(req.session)
        //console.log('------------------------------------')
req.flash('success','welcome back')
//console.log("inside post",req.session.returntoUrl)
res.redirect(returnto)

}))
user_router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','logged out successfully')
      res.redirect('/campgrounds');
    });
  });



//-----------------------------------------
module.exports= user_router;