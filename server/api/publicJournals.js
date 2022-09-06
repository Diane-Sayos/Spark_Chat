const router = require('express').Router()
const { isLoggedIn } = require('../middleware');
module.exports = router

//get all journals set to public owned by everyone including user
router.get('/', isLoggedIn, async(req, res, next) => {
    try{
      res.send(await req.user.getPublicJournals())
    } catch(ex) {
      next(ex)
    }
  });