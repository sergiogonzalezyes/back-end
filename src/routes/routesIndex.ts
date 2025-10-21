import { Router } from 'express';
import cardRoutes from './cardRoutes/cards';
import collectionRoutes from './Collections/collections';

const router = Router();

router.get('/', (_, res) => {
  res.send('Router root working ✅');
});

router.use('/cards', cardRoutes);
router.use('/collections', collectionRoutes);

export default router;
