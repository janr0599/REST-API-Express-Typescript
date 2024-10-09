import { Router } from "express";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get("/", (req, res) => {
    res.json("Desde get");
});

router.post("/", handleInputErrors, createProduct);

router.put("/", (req, res) => {
    res.json("Desde put");
});

router.patch("/", (req, res) => {
    res.json("Desde patch");
});

router.delete("/", (req, res) => {
    res.json("Desde delete");
});

export default router;
