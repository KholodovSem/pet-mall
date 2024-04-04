import { Handler } from "express";

import bcrypt from "bcrypt";

import { User } from "../../../../../database/models/User";

import { BadRequestError } from "../../../../utils";
import { Op } from "sequelize";

export const registerUser: Handler = async (req, res) => {
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

    return res.status(201).json({ message: "User successful created" });
};
