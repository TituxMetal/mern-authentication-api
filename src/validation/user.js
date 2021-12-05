import { body } from 'express-validator'

const ucFirst = ([first, ...rest]) => [first.toUpperCase(), ...rest].join('')

const requiredField = field =>
  body(field)
    .exists()
    .withMessage(`${ucFirst(field)} is required`)

const emailField = body('email')
  .notEmpty()
  .withMessage('Email must not be empty')
  .bail()
  .isEmail()
  .withMessage('Email must be a valid email')
  .optional()
  .normalizeEmail()

const passwordField = body('password')
  .trim()
  .notEmpty()
  .withMessage('Password must not be empty')
  .bail()
  .isLength({ min: 8, max: 128 })
  .withMessage('Password must have between 8 and 128 characters long')
  .optional()

const usernameField = body('username')
  .trim()
  .notEmpty()
  .withMessage('Username must not be empty')
  .bail()
  .isLength({ min: 4, max: 128 })
  .withMessage('Username must have between 4 and 128 characters long')
  .optional()

const userValidator = {
  forgot: [requiredField('email'), emailField],
  login: [requiredField('email'), requiredField('password')],
  register: [
    requiredField('email'),
    emailField,
    requiredField('password'),
    passwordField,
    requiredField('username'),
    usernameField
  ],
  reset: [requiredField('password'), passwordField],
  update: [emailField, usernameField, passwordField]
}

export default userValidator
