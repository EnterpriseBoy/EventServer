const Joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../helpers/validation')
const {sendVerificationEmail} = require('../helpers/sendMail');
const { models } = require('mongoose');



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
        //Send verification email
        //const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
        //sendVerificationEmail('./emails/verify.html',savedUser.email,"niall.maguire@zoho.com","Please confirm your email with eventrv",`http://localhost:3000/api/conformation/token=${token}`);
        sendVerificationEmail('./emails/verify.html',"Please verify your account",savedUser.email,"niall.maguire@zoho.com");

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

router.get('/conformation/:token',async (req,res) => {
    try{
        const {user: {id} } = jwt.verify(req.params.token,TOKEN_SECRET);
        await models.User.update({confirmed:true},{where:{id}});
    }catch(err){
        send(err);
    }

    return res.redirect(www.google.com)
});


module.exports = router;

//https://youtu.be/2jqok-WgelI?t=3470