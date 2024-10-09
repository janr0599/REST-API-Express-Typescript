import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleInputErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Validation
    await check("name")
        .notEmpty()
        .withMessage("Product name is required")
        .run(req);

    await check("price")
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => value > 0)
        .withMessage("Not a valid price")
        .notEmpty()
        .withMessage("Product price is required")
        .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
};
