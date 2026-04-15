import { Collection, Document } from 'mongodb';
import { getDatabase } from '../config/database';
import { env } from '../config/env';

export interface PortfolioDocument extends Document {
  [key: string]: unknown;
}

export const getPortfolioCollection = async (): Promise<Collection<PortfolioDocument>> => {
  const database = await getDatabase();
  return database.collection<PortfolioDocument>(env.mongoCollectionName);
};
