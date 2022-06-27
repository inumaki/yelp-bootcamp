
const Campground= require('../models/campground');





module.exports.index = async(req,res)=>{
    const details= await Campground.find({})
    res.render('campground/index',{details})
    
    }
module.exports.makecamp=  async(req,res,next)=>{
        const camp= await new Campground(req.body)
        camp.author= req.user._id
        req.flash('success',"Succesfully made a campground")
        await camp.save()  
        res.redirect(`campgrounds/${camp._id}`)
        }
       module.exports.updatecamp=  async(req,res)=>{
    
            const {id}= req.params
            const camp= await Campground.findById(id)
            if(!camp)
            {
            req.flash('error','Cannot find the requested campground')
            return  res.redirect('/campgrounds/')
            }
            
            res.render('campground/editcamp',{camp})
            
            }