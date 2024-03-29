import { Handler } from "express";
import { Op } from "sequelize";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { CRMUser, CRMUserRole } from "../../../../../database/models";
import { BadRequestError, ValidationError } from "../../../../utils";

export const register: Handler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map((error) => error.msg));
    }

    const { email, password } = req.body;

    const isCrmUserExist = await CRMUser.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });

    if (isCrmUserExist) {
        throw new BadRequestError(`User with email: ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await CRMUser.create({ email, password: hashedPassword, role: CRMUserRole.MANAGER });

    res.status(201).json({ message: "User successfully created" });
};
