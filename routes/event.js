const router = require('express').Router();
const User = require('../model/Event');
const {postEventValidation} = require('../helpers/validation');
const Joi = require('joi');
const Event = require('../model/Event');

router.get('/', async (req,res) =>{

    const events = await Event.find();

    res.status(200).send(events);
});

router.post('/', async (req,res) =>{

    //Validation
    const {error} = postEventValidation(req.body);
    if(error){
        return res.status(422).send(error.details.map(err => err.message.replace(/['"]+/g, '')));
    }

    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        startDate: req.body.start,
        endDate: req.body.endDate,
    });

    try{
        const saveEvent = await event.save();
        res.status(200).json(saveEvent);
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports = router;