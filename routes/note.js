const express = require('express');

const router = express.Router();
const postController = require('../controller/note');

router.post('', postController);

module.exports = router;
