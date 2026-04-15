import { Router } from 'express';
import {
  createPortfolioItem,
  getPortfolioItems,
} from '../controllers/portfolio.controller';

const router = Router();

router.post('/', createPortfolioItem);
router.get('/', getPortfolioItems);

export default router;
