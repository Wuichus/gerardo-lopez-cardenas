import Joi from 'joi'

const schema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    img_profile: Joi.string().required()
  })
)

export default schema
