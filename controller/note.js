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

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    if (!notes) {
      const error = new Error('Unable to fetch Note');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Notes Fetched Successfully', notes });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
