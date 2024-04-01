import { Handler } from "express";

import { Manufacturer } from "../../../../../database/models";

export const getManufacturers: Handler = async (req, res) => {
    const manufacturers = await Manufacturer.findAll();

    return res.json(manufacturers);
};
