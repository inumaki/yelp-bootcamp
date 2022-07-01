
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const joi = BaseJoi.extend(extension)

















module.exports.campgroundSchema = joi.object({
    title:joi.string()
    .max(100)
    .min(5)
    .required(),
    price:joi.number().integer().min(0).max(10000000).required(),
  deleteImages:joi.array(),
    location:joi.string().required(),
    description:joi.string()
      })

      module.exports.reviewSchema= joi.object({

body:joi.string().min(1).required(),
rating:joi.number().min(0).required()
      })