const router = require('express').Router()
const { isLoggedIn } = require('../middleware');
module.exports = router
//get all journals owned by logged-in user
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send( await req.user.getJournals())
  } catch (err) {
    next(err)
  }
});
//create journal without image
router.post('/', isLoggedIn, async(req, res, next) => {
  try{
    res.send(await req.user.addJournal(req.body))
  }
  catch(ex){
    next(ex)
  }
});
