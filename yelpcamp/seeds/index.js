
const express= require('express');
const app= express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const {v4:uuid}= require('uuid')
app.set('view engine','ejs')
const mongoose = require('mongoose')
const cities= require('./cities')
//app.use(express.static(path.join(__dirname,'public')))
//app.set('views',path.join(__dirname,'views'))
let methodOverride= require('method-override')
app.use(methodOverride("_method"))
const {places,descriptors}= require('./seedHelpers')
main().catch(err => console.log(err));
const path = require('path')
app.set('models',path.join(__dirname,'models'))
const Campground= require('../models/campground');
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
const seedDB= async()=>
{
await Campground.deleteMany({})
for(let i=0;i<50;i++)
{
const random1000= Math.floor(Math.random()*1000)+1
const place= sample(places)
const descriptor= sample(descriptors)
const newcamp=new Campground({
title:`${descriptor} ${place}`,
price:random1000,
location:`${cities[random1000].state} ${cities[random1000].city}`,
images:[
  {
    filename: 'Yelpcamp/y0weca3syiuvnavjzk5n',
    url: 'https://res.cloudinary.com/dksndvyy5/image/upload/v1656620434/Yelpcamp/y0weca3syiuvnavjzk5n.jpg',
  
  },
  {
    filename: 'Yelpcamp/a0msqox6ifxefpoegi7p',
    url: 'https://res.cloudinary.com/dksndvyy5/image/upload/v1656620434/Yelpcamp/a0msqox6ifxefpoegi7p.jpg',
   
  },
  {
    filename: 'Yelpcamp/kbozmiac1r2tgmo6kntq',
    url: 'https://res.cloudinary.com/dksndvyy5/image/upload/v1656620435/Yelpcamp/kbozmiac1r2tgmo6kntq.jpg',
    
  }
],
description:'lbaore em ilp terem nulhgo',
author:"62b76efdab57b6b8b57ed660"
})
await newcamp.save()
}

}
const sample = (array)=> array[Math.floor(Math.random()*array.length)]

seedDB()