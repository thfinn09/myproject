const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const noteRoutes = require('./routes/note.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 👉 SERVE FILE TĨNH (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// API
app.use('/api/notes', noteRoutes);

// Trang chủ -> index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('🚀 App running at http://localhost:3000');
});
