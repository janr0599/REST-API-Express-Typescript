import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailability,
    updateproduct,
} from "./handlers/product";
import {
    handleDeleteError,
    handleInputErrors,
    handleParamError,
    handleUpdateErrors,
} from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

router.get("/:id", handleParamError, getProductById);

router.post("/", handleInputErrors, createProduct);

router.put("/:id", handleUpdateErrors, updateproduct);

router.patch("/:id", updateAvailability);

router.delete("/:id", handleDeleteError, deleteProduct);

export default router;
