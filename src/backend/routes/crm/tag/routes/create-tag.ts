import { Handler } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { Tag } from "../../../../../database/models";

import { BadRequestError, ValidationError } from "../../../../utils";

export const createTag: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const { name } = req.body;

    const isAlreadyExist = await Tag.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isAlreadyExist) {
        throw new BadRequestError(`Tag with name:${name} `);
    }

    const tag = await Tag.create({ name });

    return res.json(tag);
};
