import express from "express";
import bodyParser from "body-parser";
import { authRoutes } from "../../interfaces/routes/authRoutes";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);

export { app };