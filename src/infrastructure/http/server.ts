import express from "express";
import bodyParser from "body-parser";
import { authRoutes } from "../../presentation/routes/authRoutes";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);

export { app };