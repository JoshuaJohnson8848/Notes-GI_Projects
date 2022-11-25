const express = require('express');

const router = express.Router();
const noteController = require('../controller/note');

router.post('', noteController.postNote);

router.get('', noteController.getNotes);

module.exports = router;
