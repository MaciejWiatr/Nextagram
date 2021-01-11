import Joi from "joi";

const profileSchema = Joi.object({
    username: Joi.string().alphanum().required().max(255),
    description: Joi.string().alphanum().required().max(255),
});

export default profileSchema;
