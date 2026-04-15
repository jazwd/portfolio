import dotenv from "dotenv";

dotenv.config();

export const env = {
	port: Number(process.env.PORT) || 3000,
	mongoUri: process.env.MONGODB_URI ?? "",
	mongoDbName: process.env.MONGODB_DB_NAME ?? "",
	mongoCollectionName: process.env.MONGODB_COLLECTION_NAME ?? "portfolio",
	jwtSecret: process.env.JWT_SECRET ?? "",
	jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
	authUsername: process.env.AUTH_USERNAME ?? "",
	authPassword: process.env.AUTH_PASSWORD ?? "",
	allowedOrigin: process.env.ALLOWED_ORIGIN ?? "*",
};
