const db = require('../db/postgres');

// LIST
exports.index = async (req, res) => {
  const result = await db.query('SELECT * FROM notes ORDER BY id');
  res.render('index', { notes: result.rows });
};

// CREATE FORM
exports.createForm = (req, res) => {
  res.render('create');
};

// CREATE
exports.create = async (req, res) => {
  const { id, title, content } = req.body;

  if (!id || !title) {
    const result = await db.query('SELECT * FROM notes ORDER BY id');
    return res.render('index', {
      notes: result.rows,
      error: 'ID và Title là bắt buộc'
    });
  }

  try {
    await db.query(
      'INSERT INTO notes (id, title, content) VALUES ($1, $2, $3)',
      [id, title, content]
    );

    res.redirect('/');
  } catch (err) {
    const result = await db.query('SELECT * FROM notes ORDER BY id');

    res.render('index', {
      notes: result.rows,
      error: 'ID đã tồn tại, vui lòng nhập ID khác'
    });
  }
};


// EDIT FORM
exports.editForm = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM notes WHERE id = $1',
    [req.params.id]
  );

  if (result.rows.length === 0) return res.send('Không tìm thấy note');

  res.render('edit', { note: result.rows[0] });
};

// UPDATE
exports.update = async (req, res) => {
  const { title, content } = req.body;

  await db.query(
    'UPDATE notes SET title=$1, content=$2 WHERE id=$3',
    [title, content, req.params.id]
  );

  res.redirect('/');
};

// DELETE
exports.remove = async (req, res) => {
  console.log(' DELETE HIT, ID =', req.params.id);

  await db.query(
    'DELETE FROM notes WHERE id = $1',
    [req.params.id]
  );

  res.redirect('/');
};

