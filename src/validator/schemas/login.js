import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string().alphanum().required().max(255),
    password: Joi.string().max(255).required(),
});

export default loginSchema;
