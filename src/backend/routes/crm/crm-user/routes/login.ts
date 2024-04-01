import { Handler } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CRMUser } from "../../../../../database/models";
import { config } from "../../../../../config";
import {
    BadRequestError,
    NotFoundError,
    ValidationError,
} from "../../../../utils";

export const login: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((error) => error.msg));
    }

    const { email, password } = req.body;

    const crmUser = await CRMUser.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });

    if (!crmUser) {
        throw new NotFoundError(`User with ${email} not found`);
    }

    const isPasswordMatch = await bcrypt.compare(crmUser.password, password);

    if (!isPasswordMatch) {
        throw new BadRequestError("Password or email is incorrect");
    }

    const token = jwt.sign({ userId: crmUser.id }, config.jwtSecret);

    res.json({ token });
};
