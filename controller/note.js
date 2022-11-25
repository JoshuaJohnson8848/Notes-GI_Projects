const Note = require('../models/note');

exports.postNote = async (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  try {
    const note = new Note({
      title: title,
      body: body,
    });
    const createdNote = await note.save();
    res.status(200).json({ message: 'Note Created', note: createdNote });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
