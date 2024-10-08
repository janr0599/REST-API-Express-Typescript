import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from "colors";

// Conectar a base de datos

const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue("Successfull connection to Database"));
    } catch (error) {
        console.log(error);
        console.log(
            colors.red.bold("there was an error connecting to the database")
        );
    }
};
connectDB();

const server = express();

server.use("/api/products", router);

export default server;
