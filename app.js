
const express= require('express');
const {campgroundSchema}= require('./validationschema.js')
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
//----------------------------------
app.listen(3000,()=>{
console.log('started listening at port 3000')
//-----------------------------------------------
})
//-------------------------------------------------------

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
//------------------------------------------------------------------------

async function main() 
{

    await mongoose.connect('mongodb://localhost:27017/yelp-camp')
     console.log('connected')
}



  //-----------------------------------------------
/*const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error:"));
db.once('open',()=>{

console.log("Database Connected")

})*/


  
//----------------------
app.get('/',(req,res)=>{

res.render('home.ejs');

})

//-----------------------show all campgrounds title
app.get('/campgrounds',async(req,res)=>{

const details= await Campground.find({})
res.render('campground/index',{details})

})
//-----------------------to create new campground
app.get('/campgrounds/new', async(req,res)=>{

res.render('campground/createcamp')

})

//----------------------getting the post request from form 
app.post('/campgrounds',validateform,catchAsync(async(req,res,next)=>{

const camp= await new Campground(req.body)
await camp.save()

res.redirect(`/campgrounds/${camp._id}`)



}))
//---------------------to edit 

app.get('/campgrounds/:id/edit',catchAsync(async(req,res)=>{

const {id}= req.params
const camp= await Campground.findById(id)

res.render('campground/editcamp',{camp})

}))
//----------------put request to update the camp
app.put('/campgrounds/:id',validateform, catchAsync(async(req,res)=>{

  const {id}= req.params
  

  const camp=  await Campground.findByIdAndUpdate(id,req.body,{new:true})
  res.redirect(`/campgrounds/${id}`)
  
  }))
//----------------deleting a campground
app.delete('/campgrounds/:id',catchAsync(async(req,res)=>{

  const {id} =req.params
await Campground.findByIdAndDelete(id)

res.redirect('/campgrounds/')
}))



//--------------------------------------to show details
app.get('/campgrounds/:id',catchAsync(async(req,res)=>{

const {id}= req.params;
const details = await Campground.findById(id)
res.render('campground/detailspage' ,{details})


}))
//-----------------------------------------
app.all('*',(req,res,next)=>{

next(new( expressError('Page not found ',404)))


})



//-----------------------------------------
app.use((err,req,res,next)=>{
  const {message="somthing went wrong ",statusCode=500}= err 
const errobj= {m:message,e:statusCode}

  res.render('error',{errobj})
 // res.send   (`oops error ${statusCode}  occured${message }`)

})
