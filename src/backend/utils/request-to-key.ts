import { Request } from "express";
import { sha1 } from "object-hash";

export const requestToKey = (req: Request) => `${req.path}@${sha1(req.query)}`;
