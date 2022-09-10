const router = require('express').Router()
const { isLoggedIn } = require('../middleware');
module.exports = router
//get all messages
router.get('/', isLoggedIn, async(req, res, next) => {
    try{
        res.send(await req.user.getMessages())
    } catch(ex){
        next(ex)
    }
});
//add message
router.post('/', isLoggedIn, async(req, res, next) => {
    try{
        res.send(await req.user.addMessage(req.body))
    } catch(ex){
        next(ex)
    }
});
//delete message
router.delete('/:id', isLoggedIn, async(req, res, next) => {
    try{
        await req.user.deleteMessage(req.params.id*1);
        res.sendStatus(204);
    } catch(ex){
        next(ex)
    }
});
