import { Router } from 'express';
import { pool } from '../../db/client';

const router = Router();

/**
 * GET /api/collections?user_id=1
 * Returns all collections for a given user
 */
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/collections');

    const userId = parseInt(req.query.user_id as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Missing or invalid user_id' });
    }

    const result = await pool.query(
      `SELECT * FROM tcg.astp_get_collections($1::int)`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching collections:', error);
    res.status(500).json({ message: 'Failed to fetch collections' });
  }
});

/**
 * GET /api/collections/:id/cards?limit=50&offset=0
 * Returns cards for a specific collection
 */
router.get('/:id/cards', async (req, res) => {
  try {
    console.log('📥 GET /api/collections/:id/cards');

    const collectionId = parseInt(req.params.id);
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    if (isNaN(collectionId)) {
      return res.status(400).json({ message: 'Invalid collection_id' });
    }

    const result = await pool.query(
      `SELECT * FROM tcg.astp_get_collection_cards($1::int, $2::int, $3::int)`,
      [collectionId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching collection cards:', error);
    res.status(500).json({ message: 'Failed to fetch collection cards' });
  }
});

export default router;
