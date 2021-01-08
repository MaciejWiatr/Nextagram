import Joi from "joi";

const postSchema = Joi.object({
    description: Joi.string().alphanum().required().max(255),
});

export default postSchema;
