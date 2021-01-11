import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().alphanum().required().max(255),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required(),
    password: Joi.string().max(255).required(),
});

export default registerSchema;
