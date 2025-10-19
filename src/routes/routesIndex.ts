import { Router } from 'express';
import cardRoutes from './cardRoutes/cards';

const router = Router();

router.get('/', (_, res) => {
  res.send('Router root working ✅');
});

router.use('/cards', cardRoutes);

export default router;
