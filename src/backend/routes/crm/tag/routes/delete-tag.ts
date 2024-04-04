import { Handler } from "express";

import { Tag } from "../../../../../database/models";
import { NotFoundError } from "../../../../utils";

export const deleteTag: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const tag = await Tag.findByPk(id);

    if (!tag) {
        throw new NotFoundError(`Tag with id: ${id} not found`);
    }

    await tag.destroy();

    return res.status(204).end();
};
