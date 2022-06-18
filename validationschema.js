const joi = require('Joi')
module.exports.campgroundSchema = joi.object({
    title:joi.string()
    .max(30)
    .min(5)
    .required(),
    price:joi.number().integer().min(0).max(10000000).required(),
    image:joi.string().required(),
    location:joi.string().required(),
    description:joi.string()
      })
