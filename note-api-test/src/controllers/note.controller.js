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
  const result = await db.query(
    'SELECT * FROM notes WHERE id = $1',
    [req.params.id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json(result.rows[0]);
};

// CREATE NOTE
exports.create = async (req, res) => {
  const { title, content } = req.body;

  if (!title)
    return res.status(400).json({ message: 'Title is required' });

  const result = await db.query(
    `INSERT INTO notes (title, content)
     VALUES ($1, $2)
     RETURNING *`,
    [title, content]
  );

  res.status(201).json(result.rows[0]);
};

// UPDATE NOTE
exports.update = async (req, res) => {
  const { title, content } = req.body;

  const result = await db.query(
    `UPDATE notes
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [title, content, req.params.id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json(result.rows[0]);
};

// DELETE NOTE
exports.remove = async (req, res) => {
  const result = await db.query(
    'DELETE FROM notes WHERE id = $1 RETURNING *',
    [req.params.id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: 'Note not found' });

  res.json({ message: 'Deleted successfully' });
};
