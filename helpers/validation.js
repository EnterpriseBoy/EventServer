//Validation
const Joi = require('joi');

const registerValidation = (data) => {

    const registerSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    return registerSchema.validate(data,{ abortEarly: false });
}

const loginValidation = (data) => {

    const loginSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    return loginSchema.validate(data,{ abortEarly: false });
}

module.exports = {registerValidation,loginValidation};

