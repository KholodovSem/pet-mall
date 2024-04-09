import { Handler } from "express";
import { Op } from "sequelize";

import { Tag } from "../../../../../database/models";

import { BadRequestError } from "../../../../utils";

export const createTag: Handler = async (req, res) => {
    const { name } = req.body;

    const isAlreadyExist = await Tag.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isAlreadyExist) {
        throw new BadRequestError(`Tag with name:${name} already exist`);
    }

    const tag = await Tag.create({ name });

    return res.json(tag);
};
