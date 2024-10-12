import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations related to products",
            },
        ],
        info: {
            title: "REST API Node.js / Express / Typescript",
            version: "1.0.0",
            description: "API Docs for products",
        },
    },
    apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url("https://cdn.shopsy.pk/logos/metro-online.pk_favicon.png");
            height: 200px;
            width: auto;

        }
        .swagger-ui .topbar {
            background-color: #E2E1DA
        }
    `,
    customSiteTitle: "REST API Node.js - Express - Typescript - Documentation ",
};

export default swaggerSpec;
export { swaggerUiOptions };
