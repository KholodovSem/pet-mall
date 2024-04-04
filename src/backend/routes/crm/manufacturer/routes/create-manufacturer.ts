import { Handler } from "express";
import { Op } from "sequelize";

import { Manufacturer } from "../../../../../database/models";

import { BadRequestError } from "../../../../utils";

export const createManufacturer: Handler = async (req, res) => {
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
