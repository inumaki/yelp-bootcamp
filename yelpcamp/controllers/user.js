const User= require('../models/user')


module.exports.createnewuser= async(req,res,next)=>{
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
    
    }
    module.exports.authenticateuser= async(req,res)=>{
        const returnto = await req.session.returntoUrl || '/campgrounds' 
req.flash('success','welcome back')
res.redirect(returnto)

}
module.exports.logoutuser= function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','logged out successfully')
      res.redirect('/campgrounds');
    });
  };