const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const { isLoggedIn } = require('../middleware')

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: {exclude: ['password', 'username']}
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})
