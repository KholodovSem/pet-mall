import { Handler } from "express";
import { validationResult } from "express-validator";

import { Manufacturer } from "../../../../../database/models";
import { NotFoundError, ValidationError } from "../../../../utils";

export const deleteManufacturer: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new ValidationError(
            validationErrors.array().map((error) => error.msg)
        );
    }

    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const manufacturer = await Manufacturer.findByPk(id);

    if (!manufacturer) {
        throw new NotFoundError(`Manufacturer with id: ${id} not found`);
    }

    await manufacturer.destroy();

    return res.status(204).end();
};
