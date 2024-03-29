import { checkSchema } from "express-validator";

export const credentialBodyChecker = checkSchema({
    email: {
        isEmail: {
            errorMessage: "Must be a valid e-mail address",
        },
        notEmpty: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            errorMessage: "Password must have as minimum 6 characters",
            options: {
                min: 6,
            },
        },
    },
});
