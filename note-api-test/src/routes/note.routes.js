const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

module.exports = router;
