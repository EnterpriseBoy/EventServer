const Joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../helpers/validation')
const {sendVerificationEmail} = require('../helpers/sendMail');



router.post('/register', async (req,res) =>{

    //Validation
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(422).send(error.details.map(err => err.message));
    }

    //Duplicate user
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists){
        return res.status(400).send('User already registered');
    }


    //Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try{
        const savedUser = await user.save();
        console.log("you are verified");
        //Send verification email
        sendVerificationEmail('./emails/verify.html');
        res.send(`Please verify now here are your details ${savedUser}`);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res) =>{

    //Validation
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(422).send(error.details.map(err => err.message));
    }

    //Check user exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email or Password or incorrect');
    }

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send('Email or Password or incorrect2');
    }

    const validatedUser = await User.findOne({email: req.body.email})
    if(validatedUser.validated === false){
        return res.status(400).send('pleaes verify');
    }

    //Create token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    //res.send('You are logged in');
});


module.exports = router;

//https://youtu.be/2jqok-WgelI?t=3470