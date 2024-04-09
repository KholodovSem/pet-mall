import { Handler } from "express";
import { Op } from "sequelize";

import { Purpose } from "../../../../../database/models";

import { BadRequestError, NotFoundError } from "../../../../utils";

export const updatePurpose: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const purpose = await Purpose.findByPk(id);

    if (!purpose) {
        throw new NotFoundError(`Purpose with id:${id} not found`);
    }

    const isExistWithSameName = await Purpose.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isExistWithSameName) {
        throw new BadRequestError(
            `Purpose with ${name} already exist. Name must be unique`
        );
    }

    purpose.update({ name });

    return res.json(purpose);
};
