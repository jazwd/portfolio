import cors from "cors";
import express from "express";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import { authenticateRequest } from "./middleware/auth.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins =
	env.allowedOrigin === "*"
		? true
		: env.allowedOrigin.split(",").map((origin) => origin.trim());

app.use(
	cors({
		origin: allowedOrigins,
	}),
);
app.use(express.json());

app.get("/health", (_req, res) => {
	res.status(200).json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", authenticateRequest, portfolioRoutes);
app.use(errorHandler);

export default app;
