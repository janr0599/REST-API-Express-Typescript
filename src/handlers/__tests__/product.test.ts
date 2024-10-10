import request from "supertest";
import server from "../../server";

describe("POST api/products", () => {
    test("Should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(201);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
    });

    test("Should validate price greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Apple Watch Series 9 40mm",
            price: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(201);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
    });

    test("Should validate price is a number and greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Apple Watch Series 9 40mm",
            price: "Hola",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(201);
        expect(response.body).not.toHaveProperty("data");
        expect(response.body.errors).not.toHaveLength(4);
    });

    test("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "iPad 14 Pro 2024",
            price: 799.99,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/products", () => {
    test("Check /api/products url exists", async () => {
        const response = await request(server).get("/api/products");

        expect(response.status).not.toBe(404);
    });

    test("should display products in the database", async () => {
        const response = await request(server).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.headers["content-type"]).toMatch(/json/);

        expect(response.body).not.toHaveProperty("errors");
    });
});
