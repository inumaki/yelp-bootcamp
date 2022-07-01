const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
cloud_name:process.env.Cloudinary_name,
api_key:process.env.Cloudinary_key,
api_secret:process.env.Cloudinary_secretkey
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
      folder: 'Yelpcamp',
      allowedFormats: ['jpeg','jpg','png' ]
    }
    });
   
module.exports={cloudinary,storage}