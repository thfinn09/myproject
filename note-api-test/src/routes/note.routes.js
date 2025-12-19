const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

router.get('/', noteController.index);

router.get('/create', noteController.createForm);
router.post('/create', noteController.create);

router.get('/edit/:id', noteController.editForm);
router.post('/edit/:id', noteController.update);

// DELETE — POST ONLY
router.post('/delete/:id', noteController.remove);

module.exports = router;
