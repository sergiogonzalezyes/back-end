import { Router } from 'express';
import { pool } from '../../db/client';

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/cards");

    const lastId = parseInt(req.query.last_id as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await pool.query(
      `SELECT * FROM tcg.astp_get_cards_pagination($1::int, $2::int)`,
      [lastId, limit]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching paginated cards:", error);
    res.status(500).json({ message: "Failed to fetch cards" });
  }
});

router.get('/:id', async (req, res) => {
  console.log('📥 GET /api/cards/:id');
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM tcg_card WHERE id = $1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ message: 'Card not found' });
  res.json(result.rows[0]);
});

export default router;
