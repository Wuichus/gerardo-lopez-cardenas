import Joi from 'joi'

const schema = Joi.object({
    user_id: Joi.string().required(),
    token: Joi.string().required()
})

export default schema
