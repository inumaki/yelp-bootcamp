
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
     module.exports.updatecampput =     async(req,res)=>{
    
                const {id}= req.params
                const camp=  await Campground.findByIdAndUpdate(id,req.body,{new:true})
                req.flash('success',"Succesfully updated a campground")
                res.redirect(`/campgrounds/${id}`)
          
                }

    
    module.exports.delcamp=       async(req,res)=>{
    
                    const {id} =req.params
                    const storecamp= await Campground.findById(id)
                    if(!storecamp.author.equals(req.user._id)){
                    req.flash('error','you do not have premission to do that')
                    res.redirect('/campgrounds')}
              
                  await Campground.findByIdAndDelete(id)
                  req.flash('success',"Succesfully deleted a campground")
                  res.redirect('/campgrounds/')
                  }
      module.exports.laodcamp=        async(req,res)=>{

                    const {id}= req.params;
                    const details = await  Campground.findById(id).populate(
                     { path: 'reviews',populate:{path:'author'}}).populate('author')
                
                    if(!details)
                    {
                    req.flash('error','Cannot find the requested campground')
                    return  res.redirect('/campgrounds/')
                    }
                    res.render('campground/detailspage' ,{details})
                    }