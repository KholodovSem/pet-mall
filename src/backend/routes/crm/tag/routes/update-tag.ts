import { Handler } from "express";
import { Op } from "sequelize";

import { Tag } from "../../../../../database/models";

import { BadRequestError, NotFoundError } from "../../../../utils";

export const updateTag: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const tag = await Tag.findByPk(id);

    if (!tag) {
        throw new NotFoundError(`Tag with id:${id} not found`);
    }

    const isExistWithSameName = await Tag.findOne({
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });

    if (isExistWithSameName) {
        throw new BadRequestError(
            `Tag with ${name} already exist. Name must be unique`
        );
    }

    tag.update({ name });

    return res.json(tag);
};
