import { Handler } from "express";
import { Op } from "sequelize";

import { Purpose } from "../../../../../database/models";

import { BadRequestError } from "../../../../utils";

export const createPurpose: Handler = async (req, res) => {
    const { name } = req.body;

    const isAlreadyExist = await Purpose.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isAlreadyExist) {
        throw new BadRequestError(`Purpose with name:${name} already exist`);
    }

    const purpose = await Purpose.create({ name });

    return res.json(purpose);
};
