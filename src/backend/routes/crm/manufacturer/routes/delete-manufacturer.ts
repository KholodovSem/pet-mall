import { Handler } from "express";

import { Manufacturer } from "../../../../../database/models";
import { NotFoundError } from "../../../../utils";

export const deleteManufacturer: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const manufacturer = await Manufacturer.findByPk(id);

    if (!manufacturer) {
        throw new NotFoundError(`Manufacturer with id: ${id} not found`);
    }

    await manufacturer.destroy();

    return res.status(204).end();
};
