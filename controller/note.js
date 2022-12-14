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
    if (!createdNote) {
      const error = new Error('Note Creation Failed');
      error.status = 422;
      throw error;
    }
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

exports.getById = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      const error = new Error('Note Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Note Fechted Succesfully', note });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const noteId = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  try {
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      const error = new Error('Note Not Found');
      error.status = 422;
      throw error;
    }
    existingNote.title = title;
    existingNote.body = body;
    const updateNote = await existingNote.save();
    if (!updateNote) {
      const error = new Error('Note Updation Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Note Updated', note: updateNote });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const deleteNote = await Note.findByIdAndRemove(noteId);
    if (!deleteNote) {
      const error = new Error('Note Deletion Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Note Deleted Successfully' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
