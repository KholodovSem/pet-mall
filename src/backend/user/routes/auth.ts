import { Handler } from "express";
import { validationResult } from "express-validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../../database/models/User";

import { BadRequestError, NotFoundError, ValidationError } from "../../utils";

export const registerUser: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((e) => e.msg));
    }

    const { email, password } = req.body;

    const isUserExist = await User.findOne({ where: { email } });

    if (isUserExist) {
        throw new BadRequestError(`User with ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    return res.status(201);
};

export const loginUser: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((e) => e.msg));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new NotFoundError(`User with ${email} already exist`);
    }

    const isPasswordMatch = await bcrypt.compare(user.password, password);

    if (isPasswordMatch) {
        throw new BadRequestError("Password or email is incorrect");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "");

    return res.json({ token });
};
