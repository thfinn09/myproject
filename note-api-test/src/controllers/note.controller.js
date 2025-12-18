const db = require('../db/postgres');

// GET ALL NOTES
exports.getAll = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM notes ORDER BY created_at DESC'
  );
  res.json(result.rows);
};

// GET NOTE BY ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    'SELECT * FROM notes WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json(result.rows[0]);
};

// CREATE NOTE (ID DO USER NHẬP)
exports.create = async (req, res) => {
  const { id, title, content } = req.body;

  if (!id || !title) {
    return res.status(400).json({
      message: 'ID and Title are required'
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO notes (id, title, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({
        message: 'ID already exists'
      });
    }
    res.status(500).json(err);
  }
};

// UPDATE NOTE
exports.update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const result = await db.query(
    `UPDATE notes
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [title, content, id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json(result.rows[0]);
};

// DELETE NOTE
exports.remove = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    'DELETE FROM notes WHERE id = $1 RETURNING *',
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json({ message: 'Deleted successfully' });
};
