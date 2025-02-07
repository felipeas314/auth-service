import express from "express";
import bodyParser from "body-parser";
import { authRoutes } from "../../presentation/routes/authRoutes";
import { userRoutes } from "../../presentation/routes/userRoutes";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use(authRoutes);
app.use(userRoutes);

export { app };