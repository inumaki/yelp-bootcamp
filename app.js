
const express= require('express');
const {campgroundSchema,reviewSchema}= require('./validationschema.js')
const app= express();
const path =require('path');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const {v4:uuid}= require('uuid')
app.set('view engine','ejs')
const joi = require('Joi')
const mongoose = require('mongoose')
//app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
let methodOverride= require('method-override')
app.use(methodOverride("_method"))
const ejsmate= require('ejs-mate')
app.engine('ejs',ejsmate)
main().catch(err => console.log(err));
const Campground= require('./models/campground');

const  catchAsync= require('./utils/catchAsync')
const  expressError= require('./utils/expressError')
const review= require('./models/review')
const campgrounds= require('./routes/campground')
const reviewrouter= require('./routes/review')
//----------------------------------
app.listen(3000,()=>{
console.log('started listening at port 3000')
//-----------------------------------------------
})
//-------------------------------------------------------
app.use("/campgrounds",campgrounds)
app.use("/campgrounds/:id/reviews/",reviewrouter)

async function main() 
{

  await mongoose.connect('mongodb://localhost:27017/yelp-camp')
   console.log('connected')
}
//----------------------
app.get('/',(req,res)=>{

  res.render('home.ejs');
  
  })
  

  
app.all('*',(req,res,next)=>{
next(new( expressError('Page not found ',404)))


})
//-----------------------------------------


//-----------------------------------------
app.use((err,req,res,next)=>{
  const {message="somthing went wrong ",statusCode=500}= err 
const errobj= {m:message,e:statusCode}

  res.render('error',{errobj})
 // res.send   (`oops error ${statusCode}  occured${message }`)

})
