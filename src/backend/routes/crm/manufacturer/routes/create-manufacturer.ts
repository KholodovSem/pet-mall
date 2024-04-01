import { Handler } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { Manufacturer } from "../../../../../database/models";

import { BadRequestError, ValidationError } from "../../../../utils";

export const createManufacturer: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const { name } = req.body;

    const isAlreadyExist = await Manufacturer.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isAlreadyExist) {
        throw new BadRequestError(
            `Manufacturer with name: ${name} already exist`
        );
    }

    const manufacturer = await Manufacturer.create({ name });

    return res.status(201).json(manufacturer);
};
