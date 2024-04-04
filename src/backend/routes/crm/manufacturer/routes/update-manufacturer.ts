import { Handler } from "express";

import { Manufacturer } from "../../../../../database/models";

import { NotFoundError } from "../../../../utils";

export const updateManufacturer: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name } = req.body;

    const manufacturer = await Manufacturer.findByPk(id);

    if (!manufacturer) {
        throw new NotFoundError(`Manufacturer with id:${id} not found`);
    }

    manufacturer.set({ name });
    await manufacturer.save();
    await manufacturer.reload();

    return res.json(manufacturer);
};
