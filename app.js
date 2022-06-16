
const express= require('express');
const app= express();
const path =require('path');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const {v4:uuid}= require('uuid')
app.set('view engine','ejs')
const mongoose = require('mongoose')
//app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
let methodOverride= require('method-override')
app.use(methodOverride("_method"))

main().catch(err => console.log(err));
const Campground= require('./models/campground');
//----------------------------------
app.listen(3000,()=>{
console.log('started listening at port 3000')
//-----------------------------------------------
})
//-------------------------------------------------------

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
app.post('/campgrounds',async(req,res)=>{

const camp= await new Campground(req.body)

await camp.save()

res.redirect(`/campgrounds/${camp._id}`)

})
//---------------------to edit 

app.get('/campgrounds/:id/edit',async(req,res)=>{

const {id}= req.params
const camp= await Campground.findById(id)
console.log(camp)
res.render('campground/editcamp',{camp})

})
//----------------put request to update the camp
app.put('/campgrounds/:id',async(req,res)=>{

  const {id}= req.params

  const camp=  await Campground.findByIdAndUpdate(id,req.body,{new:true})
  res.redirect(`/campgrounds/${id}`)
  
  })
//----------------deleting a campground
app.delete('/campgrounds/:id',async(req,res)=>{

  const {id} =req.params
await Campground.findByIdAndDelete(id)

res.redirect('/campgrounds/')
})



//--------------------------------------to show details
app.get('/campgrounds/:id',async(req,res)=>{

const {id}= req.params;
const details = await Campground.findById(id)
res.render('campground/detailspage' ,{details})


})
//-----------------------------------------