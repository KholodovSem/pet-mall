import { type Handler } from "express";
import { BadRequestError } from "./utils";

export const notFound: Handler = async () => {
    throw new BadRequestError("Not implemented");
};
