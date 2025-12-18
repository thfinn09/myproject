const express = require('express');
const todoRoutes = require('./routes/todo.routes');

const app = express();
app.use(express.json());


// Routes
app.use('/todos', todoRoutes); //cấu hình trung gian

app.get('/', (req, res) => {
    res.send('TODO API is running');
});


const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});