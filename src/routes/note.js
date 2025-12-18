const express = require('express');
const Note = require('../model/note');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      name: req.body.name,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note' });
  }
});
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Note.countDocuments();
    res.status(200).json({
      data: notes,
      page,
      limit,
      total,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note deleted successfully',
      deleted: note,
    });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note updated successfully',
      note,
    });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Failed to update note' });
  }
});

module.exports = router;
