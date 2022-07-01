if(process.env.NODE_ENV !="production")
{
  require('dotenv').config()
}

const express= require('express');
const {campgroundSchema,reviewSchema}= require('./validationschema.js')
const app= express();
const path =require('path')
const dburl= process.env.mongoatlas
//const dburl = 'mongodb://localhost:27017/yelp-camp'
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
app.use(express.static(path.join(__dirname,'public')))
main().catch(err => console.log(err));
const Campground= require('./models/campground');
const  catchAsync= require('./utils/catchAsync')
const  expressError= require('./utils/expressError')
const review= require('./models/review')
const campgrounds= require('./routes/campground')
const reviewrouter= require('./routes/review')
const session = require('express-session')
const flash= require('connect-flash')
const passport= require('passport')
const localpassport= require('passport-local').Strategy
const User= require('./models/user')
const user_router=require('./routes/user') 
const multer  = require('multer')
const ExpressMongoSanitize = require('express-mongo-sanitize');//for no sql injection
//const {MongoStore}= require('connect-mongo')
const secret = process.env.secret || 'thisismysecret'
const MongoDBStore = require('connect-mongo')
const port = process.env.PORT || 3000

//const helmet= require('helmet')
//----------------------------------

app.use(ExpressMongoSanitize()) //for no sql injection

//---------------------------------
const sessionConfig ={
  store:MongoDBStore.create({  mongoUrl:dburl,secret:secret }),
  name:'connsession',
  secret:secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
  expires:Date.now()+1000*60*60*24*7,
  maxAge:1000*60*60*24*7,
  httpOnly:true
 //, secure:true

  }
}
app.use(session(sessionConfig))
app.use(flash())
//app.use(helmet())
//------------helmet---------------------------

// const scriptSrcUrls = [
//   "https://stackpath.bootstrapcdn.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://api.mapbox.com/",
//   "https://kit.fontawesome.com/",
//   "https://cdnjs.cloudflare.com/",
//   "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//   "https://kit-free.fontawesome.com/",
//   "https://stackpath.bootstrapcdn.com/",
//  "https://api.mapbox.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://fonts.googleapis.com/",
//   "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com/",
//   "https://a.tiles.mapbox.com/",
//   "https://b.tiles.mapbox.com/",
//   "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//   helmet.contentSecurityPolicy({
//       directives: {
//           defaultSrc: [],
//           connectSrc: ["'self'", ...connectSrcUrls],
//           scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//           styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//           workerSrc: ["'self'", "blob:"],
//           objectSrc: [],
//           imgSrc: [
//               "'self'",
//               "blob:",
//               "data:",
//               "https://res.cloudinary.com/dksndvyy5/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
//               "https://cloudinary.com/console/c-6cfcb09c9236193074c34e6a0cd319/media_library/folders/c0d876f4ae091fa345c992e26d928437b0",
//               "https://images.unsplash.com/",
//           ],
//           fontSrc: ["'self'", ...fontSrcUrls],
//       },
//   })
// );


//-------------------------------------------passport-------
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localpassport(User.authenticate()))
passport.serializeUser(User.serializeUser());//session support
passport.deserializeUser(User.deserializeUser());
//-------------------------------------------




app.use((req,res,next)=>{
  //session.save()
 // console.log("app.js= ",req.session.storeUrl)
  res.locals.currentuser= req.user
res.locals.success= req.flash('success')
res.locals.error= req.flash('error')
next()
})


app.listen(port,()=>{
console.log(`started listening at port ${port}`)
//-----------------------------------------------
})
//-------------------------------------------------------
app.use("/campgrounds",campgrounds)
app.use("/campgrounds/:id/reviews/",reviewrouter)
app.use("/",user_router)

async function main() 
{
  //
  await mongoose.connect(dburl)
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
 
