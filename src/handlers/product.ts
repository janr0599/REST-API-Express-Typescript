import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["price", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({ data: product });
    } catch (error) {
        console.log(error);
    }
};

export const updateproduct = async (req: Request, res: Response) => {
    try {
        // Validate
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        // Update
        await product.update(req.body);
        // Save
        await product.save();
        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
};

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        // Validate
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        // Update
        // await product.update(req.body);
        product.availability = !product.dataValues.availability;
        // Save
        await product.save();

        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        // Validate
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        // Delete
        await product.destroy();

        res.json({ data: "Product deleted" });
    } catch (error) {
        console.log(error);
    }
};
