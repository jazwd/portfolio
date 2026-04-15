import { Db, MongoClient } from "mongodb";
import { env } from "./env";

let client: MongoClient | null = null;
let database: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
	if (database) {
		return database;
	}

	if (!env.mongoUri) {
		throw new Error("Missing MONGODB_URI in environment variables.");
	}

	if (!env.mongoDbName) {
		throw new Error("Missing MONGODB_DB_NAME in environment variables.");
	}

	client = new MongoClient(env.mongoUri, {
		maxPoolSize: 5,
		minPoolSize: 0,
		maxIdleTimeMS: 10000,
		serverSelectionTimeoutMS: 5000,
	});

	await client.connect();
	database = client.db(env.mongoDbName);

	console.log(`Connected to MongoDB Atlas database: ${env.mongoDbName}`);

	return database;
};

export const getDatabase = async (): Promise<Db> => {
	return database ?? connectToDatabase();
};
