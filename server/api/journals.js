const router = require('express').Router()
const { isLoggedIn } = require('../middleware');
module.exports = router
//get all journals
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
//update journal without image
router.put('/:id', isLoggedIn, async(req, res, next) => {
  try{
    const id = req.params.id*1;
    res.send(await req.user.updateJournal(req.body, id))
  }
  catch(ex){
    next(ex)
  }
});
