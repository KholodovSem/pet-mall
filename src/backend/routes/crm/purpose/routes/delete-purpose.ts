import { Handler } from "express";
import { validationResult } from "express-validator";

import { Purpose } from "../../../../../database/models";
import { NotFoundError, ValidationError } from "../../../../utils";

export const deletePurpose: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const purpose = await Purpose.findByPk(id);

    if (!purpose) {
        throw new NotFoundError(`Purpose with id: ${id} not found`);
    }

    await purpose.destroy();

    return res.status(204).end();
};
