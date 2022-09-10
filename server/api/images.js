const router = require('express').Router()
const { isLoggedIn } = require('../middleware');
module.exports = router
//get all images
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
      res.send( await req.user.getImages())
    } catch (err) {
      next(err)
    }
});
//add image
router.post('/', isLoggedIn, async(req, res, next) => {
    try{
        res.send(await req.user.addImage(req.body));
    } catch (ex) {
        next(ex)
    }
});
//delete image
router.delete('/:id', isLoggedIn, async(req, res, next) => {
  try{
    await req.user.deleteImage(req.params.id*1);
    res.sendStatus(204);
  } catch (ex) {
    next(ex)
  }
});