import { Handler } from "express";
import { validationResult } from "express-validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../../../../database/models/User";

import { BadRequestError, ValidationError } from "../../../../utils";
import { Op } from "sequelize";

export const registerUser: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((e) => e.msg));
    }

    const { email, password } = req.body;

    const isUserExist = await User.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });

    if (isUserExist) {
        throw new BadRequestError(`User with ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    return res.status(201);
};
