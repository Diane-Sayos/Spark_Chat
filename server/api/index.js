const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/journals', require('./journals'))
router.use('/images', require('./images'))
router.use('/publicJournals', require('./publicJournals'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
