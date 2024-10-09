import { Router } from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    updateproduct,
} from "./handlers/product";
import { handleInputErrors, handleParamError } from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

router.get("/:id", handleParamError, getProductById);

router.post("/", handleInputErrors, createProduct);

router.put("/:id", updateproduct);

router.patch("/", (req, res) => {
    res.json("Desde patch");
});

router.delete("/", (req, res) => {
    res.json("Desde delete");
});

export default router;
