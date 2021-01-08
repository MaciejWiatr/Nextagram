import loginSchema from "./schemas/login";
import postSchema from "./schemas/post";
import profileSchema from "./schemas/profile";
import registerSchema from "./schemas/register";

class ValidatorClass {
    constructor() {
        this.schemas = {
            login: loginSchema,
            register: registerSchema,
            profile: profileSchema,
            post: postSchema,
        };
    }

    getSchema(schemaName) {
        const schema = this.schemas[schemaName];
        if (schema === undefined) {
            throw new Error("Wrong schema name was provided to validator");
        }
        return schema;
    }

    validate(schemaName, obj) {
        let errorMessage;
        let valid = true;
        const schema = this.getSchema(schemaName);
        const { error } = schema.validate(obj);
        if (error !== undefined) {
            errorMessage = error.details[0].message;
            valid = false;
        }
        return { valid, err: errorMessage };
    }
}

const Validator = new ValidatorClass();

export default Validator;
