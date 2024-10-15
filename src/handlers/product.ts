import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [["id", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);

    res.status(201).json({ data: product });
};

export const updateproduct = async (req: Request, res: Response) => {
    // Validate
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    // Update
    await product.update(req.body);
    // Save
    await product.save();
    res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
    // Validate
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    // Update
    // await product.update(req.body);
    product.availability = !product.dataValues.availability;
    // Save
    await product.save();

    res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
    // Validate
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    // Delete
    await product.destroy();

    res.json({ data: "Product deleted" });
};
