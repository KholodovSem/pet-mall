import { Handler } from "express";

import { Purpose } from "../../../../../database/models";
import { NotFoundError } from "../../../../utils";

export const deletePurpose: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const purpose = await Purpose.findByPk(id);

    if (!purpose) {
        throw new NotFoundError(`Purpose with id: ${id} not found`);
    }

    await purpose.destroy();

    return res.status(204).end();
};
