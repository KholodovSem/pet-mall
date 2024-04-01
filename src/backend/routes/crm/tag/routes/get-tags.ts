import { Handler } from "express";
import { Tag } from "../../../../../database/models";

export const getTags: Handler = async (req, res) => {
    const tags = await Tag.findAll();

    return res.json(tags);
};
