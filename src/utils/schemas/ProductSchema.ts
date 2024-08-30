import Joi from 'joi'

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  length: Joi.number().required(),
  width: Joi.number().required()
})
const updateProductSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  height: Joi.number().optional(),
  length: Joi.number().optional(),
  width: Joi.number().optional()
})
const deleteProductSchema = Joi.object({
  id: Joi.number().required()
})
export { createProductSchema, updateProductSchema, deleteProductSchema }
