
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
//let methodOverride= require('method-override')
//app.use(methodOverride("_method"))

//----------------------------------
app.listen(3000,()=>{
console.log('started listening at port 3000')
//-----------------------------------------------
})
//-------------------------------------------------------
async function main() {

    await mongoose.connect('mongodb://localhost:27017/yelp-camp',{useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopoplogy:true
});
      console.log('connected')
  }

  //-----------------------------------------------
const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error:"));
db.once('open',()=>{

console.log("Database Connected")

})


  
//----------------------
app.get('/',(req,res)=>{

res.render('home.ejs');

})