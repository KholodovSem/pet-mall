import { Handler } from "express";
import { validationResult } from "express-validator";

import { Tag } from "../../../../../database/models";

import { NotFoundError, ValidationError } from "../../../../utils";

export const updateTag: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const tag = await Tag.findByPk(id);

    if (!tag) {
        throw new NotFoundError(`Tag with id:${id} not found`);
    }

    tag.set({ name });
    await tag.save();
    await tag.reload();

    return res.json(tag);
};
