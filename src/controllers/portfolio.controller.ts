import { NextFunction, Request, Response } from 'express';
import { getPortfolioCollection } from '../models/portfolio.model';

export const createPortfolioItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
      res.status(400).json({
        message: 'Request body cannot be empty',
      });
      return;
    }

    const collection = await getPortfolioCollection();
    const result = await collection.insertOne(payload);

    res.status(201).json({
      message: 'Portfolio item created successfully',
      insertedId: result.insertedId,
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioItems = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const collection = await getPortfolioCollection();
    const items = await collection.find({}).toArray();

    res.status(200).json({
      message: 'Portfolio items fetched successfully',
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};
