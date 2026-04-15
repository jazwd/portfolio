import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authenticateRequest = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const authorization = req.header("authorization");

	if (!env.jwtSecret) {
		res.status(500).json({
			message:
				"JWT security is not configured. Add JWT_SECRET to the environment.",
		});
		return;
	}

	if (!authorization?.startsWith("Bearer ")) {
		res.status(401).json({
			message: "Missing Bearer token",
		});
		return;
	}

	const token = authorization.slice(7);

	try {
		jwt.verify(token, env.jwtSecret);
		next();
	} catch {
		res.status(401).json({
			message: "Invalid or expired token",
		});
	}
};
