import { Handler } from "express";
import { validationResult } from "express-validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../../../../database/models/User";

import {
    BadRequestError,
    NotFoundError,
    ValidationError,
} from "../../../../utils";
import { Op } from "sequelize";

export const loginUser: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((e) => e.msg));
    }

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });

    if (!user) {
        throw new NotFoundError(`User with ${email} not found`);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new BadRequestError("Password or email is incorrect");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "");

    return res.json({ token });
};
