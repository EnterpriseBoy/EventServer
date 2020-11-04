const router = require('express').Router();

router.get('/', async (req,res) =>{
    res.status(200).send("You are in event route default");
});
module.exports = router;