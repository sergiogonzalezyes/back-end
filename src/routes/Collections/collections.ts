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
      `SELECT * FROM tcg.astp_get_collection_cards2($1::int, $2::int, $3::int)`,
      [collectionId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching collection cards:', error);
    res.status(500).json({ message: 'Failed to fetch collection cards' });
  }
});


/**
 * POST /api/collections
 * Creates a new collection for a given user.
 */
router.post("/", async (req, res) => {
  const { user_id, name, description, is_public } = req.body;

  // Basic validation
  if (!user_id || !name) {
    return res.status(400).json({ error: "Missing required fields: user_id or name" });
  }

  try {
    // Call the stored procedure
    const { rows } = await pool.query(
      "SELECT * FROM tcg.astp_insert_collection($1, $2, $3, $4);",
      [user_id, name, description || null, is_public ?? false]
    );

    if (!rows.length) {
      return res.status(500).json({ error: "Collection was not created" });
    }

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("❌ Error inserting collection:", error);
    res.status(500).json({ error: "Failed to insert collection" });
  }
});

/**
 * PUT /api/collections/:id
 * Updates an existing collection.
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, is_public } = req.body;

  // Validation
  if (!id || !user_id) {
    return res.status(400).json({ error: "Missing required fields: id or user_id" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM tcg.astp_update_collection($1, $2, $3, $4, $5);",
      [id, user_id, name || null, description || null, is_public ?? false]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Collection not found or not updated" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error updating collection:", error);
    res.status(500).json({ error: "Failed to update collection" });
  }
});


/**
 * DELETE /api/collections/:id
 * Deletes a collection by ID (only if user owns it)
 */
router.delete("/:id", async (req, res) => {

  console.log("📥 DELETE /api/collections/:id");

  const { id } = req.params;
  const { user_id } = req.body;

  if (!id || !user_id) {
    return res.status(400).json({ error: "Missing required fields: id or user_id" });
  }

  try {
    await pool.query("SELECT tcg.astp_delete_collection($1, $2);", [id, user_id]);
    res.status(204).send(); // No content, deletion successful
  } catch (error) {
  console.error("❌ Error deleting collection:", error);

  if (error instanceof Error) {
    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({ error: "Unauthorized or collection not found." });
    }
    return res.status(500).json({ error: error.message });
  }

  // Fallback for non-Error types
    res.status(500).json({ error: "Unknown error occurred." });
  }
});


export default router;
