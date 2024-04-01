import { Handler } from "express";

import { Purpose } from "../../../../../database/models";

export const getPurposes: Handler = async (req, res) => {
    const purposes = await Purpose.findAll();

    return res.json(purposes);
};
