import { Handler } from "express";
import multer, { MulterError } from "multer";

import { BadRequestError } from "../utils";

const upload = multer({
    fileFilter(req, file, next) {
        const imageExtensions = ["image/png", "image/jpg", "image/jpeg"];

        const isImage = imageExtensions.some((ext) => file.mimetype === ext);

        if (!isImage) {
            const error = new BadRequestError(
                `Invalid type of image. Allowed types is: ${imageExtensions.join(", ").trim()}`
            );

            next(error);
        }

        next(null, true);
    },
}).single("image");

export const uploadMiddleware: Handler = async (req, res, next) => {
    //TODO: How to handle error when user send more than 1 file?
    // Right now i get "Unexpected field" message from multer
    // so that's not so informative

    upload(req, res, (error) => {
        if (error instanceof MulterError) {
            const customError = new BadRequestError(error.message);
            return next(customError);
        }

        next(error);
    });
};
