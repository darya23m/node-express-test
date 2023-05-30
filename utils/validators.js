const {body} = require('express-validator')
const User = require('../modules/user')

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Plaese, input correct email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject('This email is already taken')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Password must be min 6 characters')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must be the same')
      }
      return true
    })
    .trim(),
  body('name').isLength({min: 3})
    .withMessage('Name must be min 3 characters')
    .trim()
]

exports.courseValidators = [
  body('title').isLength({min: 3}).withMessage('Min lenght of title is 3 characters').trim(),
  body('price').isNumeric().withMessage('Input the correct price'),
  body('img', 'Input correct URL of image').isURL().trim(),
]
