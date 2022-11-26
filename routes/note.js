const express = require('express');

const router = express.Router();
const noteController = require('../controller/note');

router.post('', noteController.postNote);

router.get('', noteController.getNotes);

router.get('/:id', noteController.getById);

router.put('/:id', noteController.update);

router.delete('/:id', noteController.deleteById);

module.exports = router;
