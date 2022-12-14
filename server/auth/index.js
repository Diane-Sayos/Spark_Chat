 const router = require('express').Router()
const { models: {User }} = require('../db')
const { isLoggedIn } = require('../middleware')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', isLoggedIn, async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (ex) {
    next(ex)
  }
})

router.put('/me', isLoggedIn, async(req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id*1);
    await user.update(req.body)
    res.send(user)
  }
  catch(ex){
    next(ex)
  }
});