const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const noteRoutes = require('./routes/note.routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', noteRoutes);

app.listen(3000, () => {
  console.log('🚀 Note app running at http://localhost:3000');
});
