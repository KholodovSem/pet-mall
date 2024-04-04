import { Handler } from "express";

import { Purpose } from "../../../../../database/models";

import { NotFoundError } from "../../../../utils";

export const updatePurpose: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const purpose = await Purpose.findByPk(id);

    if (!purpose) {
        throw new NotFoundError(`Purpose with id:${id} not found`);
    }

    purpose.set({ name });
    await purpose.save();
    await purpose.reload();

    return res.json(purpose);
};
