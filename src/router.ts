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
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: iPhone 13 Pro Max
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 899.99
 *
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

//Routing
router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Gets a list of products
 *          tags:
 *              - Products
 *          description: Returns a list of products
 *          responses:
 *              200:
 *                  description: Sucessful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 */

router.get("/:id", handleParamError, getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Gets a product by ID
 *          tags:
 *              - Products
 *          description: Returns a product by its ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Not a valid ID
 */

router.post("/", handleInputErrors, createProduct);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "iPad 14 Pro 2024"
 *                              price:
 *                                  type: number
 *                                  example: 899.99
 *          responses:
 *              201:
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request - Invalid input data
 */

router.put("/:id", handleUpdateErrors, updateproduct);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "iPad 14 Pro 2024"
 *                              price:
 *                                  type: number
 *                                  example: 899.99
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *
 *              400:
 *                  description: Bad request - Not a valid ID or Invalid input data
 *              404:
 *                  description: Product not found

 */

router.patch("/:id", updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates the availability of a product
 *          tags:
 *              - Products
 *          description: Returns the product with the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *
 *          responses:
 *              200:
 *                  description: successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request - Not a valid ID
 *              404:
 *                  description: Product not found
 */

router.delete("/:id", handleDeleteError, deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product from the database
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *
 *          responses:
 *              200:
 *                  description: successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: string
 *                                      example: "Product deleted"
 *              400:
 *                  description: Bad request - Not a valid ID
 *              404:
 *                  description: Product not found
 */

export default router;
