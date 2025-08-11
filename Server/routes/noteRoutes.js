const express = require('express');
const router = express.Router();
const { GetNotes, CreateNote, updateNote, deleteNote } = require('../controllers/noteController');

const verifyToken = require('../middleware/authMiddleware'); 

router.use(verifyToken);

router.get('/', GetNotes);
router.post('/', CreateNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
