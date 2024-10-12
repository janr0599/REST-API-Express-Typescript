import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar a base de datos
export const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue("Successfull connection to Database"));
    } catch (error) {
        // console.log(error);
        console.log(
            colors.red.bold("there was an error connecting to the database")
        );
    }
};
connectDB();

// Instancia de axios de express
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

//Docs
server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
