import { param } from 'express-validator'

const objectIdValidator = fieldName => [
  param(fieldName).isMongoId().withMessage(`${fieldName} parameter must be a valid ObjectId`)
]

export default objectIdValidator
