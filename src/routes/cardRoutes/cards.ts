import { Router } from 'express';
import { pool } from '../../db/client';

const router = Router();

console.log('✅ cardRoutes loaded'); // Confirm subrouter is being imported

router.get('/', async (_, res) => {
  console.log('📥 GET /api/cards');
  const result = await pool.query('SELECT * FROM tcg_card LIMIT 10');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  console.log('📥 GET /api/cards/:id');
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM tcg_card WHERE id = $1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ message: 'Card not found' });
  res.json(result.rows[0]);
});

export default router;
