import { Handler } from "express";
import { Op } from "sequelize";

import { Manufacturer } from "../../../../../database/models";

import { BadRequestError, NotFoundError } from "../../../../utils";

export const updateManufacturer: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const manufacturer = await Manufacturer.findByPk(id);

    if (!manufacturer) {
        throw new NotFoundError(`Manufacturer with id:${id} not found`);
    }

    const isExistWithSameName = await Manufacturer.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isExistWithSameName) {
        throw new BadRequestError(
            `Manufacturer with ${name} already exist. Name must be unique`
        );
    }

    manufacturer.update({ name });

    return res.json(manufacturer);
};
