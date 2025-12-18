// gia lap db
let todos = [];
let currentId = 1;

// GET tat ca todos
exports.getAllTodos = (req, res) => {
    res.json(todos);
};

// GET tat ca todo theo id
exports.getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo không tồn tại' });
    }

    res.json(todo);
};

// Tao todos
exports.createTodo = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title là bắt buộc' });
    }

    const newTodo = {
        id: currentId++,
        title,
        description: description || '',
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
};

//Update todo
exports.updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo không tồn tại' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
};

// xoa todo
exports.deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Todo không tồn tại' });
    }

    todos.splice(index, 1);
    res.json({ message: 'Xóa thành công' });
};

