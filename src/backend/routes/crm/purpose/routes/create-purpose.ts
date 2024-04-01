import { Handler } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { Purpose } from "../../../../../database/models";

import { BadRequestError, ValidationError } from "../../../../utils";

export const createPurpose: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const { name } = req.body;

    const isAlreadyExist = await Purpose.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isAlreadyExist) {
        throw new BadRequestError(`Purpose with name:${name} `);
    }

    const purpose = await Purpose.create({ name });

    return res.json(purpose);
};
