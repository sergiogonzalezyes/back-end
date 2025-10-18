import { Router } from 'express';
import cardRoutes from './cardRoutes/cards';

console.log('✅ routesIndex loaded');  // Confirm router file is being imported

const router = Router();

router.get('/', (_, res) => {
  res.send('Router root working ✅');
});

router.use('/cards', cardRoutes);

export default router;
