const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GetNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("GetNotes error:", error);
    res.status(500).json({ message: "Server error while fetching notes" });
  }
};

const CreateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await prisma.note.create({
      data: { title, content, userId: req.user.id },
    });
    res.status(201).json(note);
  } catch (error) {
    console.error("CreateNote error:", error);
    res.status(500).json({ message: "Server error while creating note" });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    const updatedNote = await prisma.note.update({
      where: { id: note.id },
      data: { title: title ?? note.title, content: content ?? note.content },
    });

    res.status(200).json({ message: "Note updated", note: updatedNote });
  } catch (error) {
    console.error("Update Note error:", error);
    res.status(500).json({ message: "Server error while updating note" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    await prisma.note.delete({ where: { id: note.id } });

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Delete Note error:", error);
    res.status(500).json({ message: "Server error while deleting note" });
  }
};

module.exports = { GetNotes, CreateNote, updateNote, deleteNote };


// const Note = require('../models/Note.js');

// const GetNotes = async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.status(200).json(notes);
//     } catch (error) {
//         console.error('GetNotes error:', error);
//         res.status(500).json({ message: 'Server error while fetching notes' });
//     }
// }

// const CreateNote = async (req, res) => {
//     const { title, content } = req.body;

//     try {
//         const note = new Note({
//             user: req.user.id,
//             title,
//             content
// });
//         await note.save();
//         res.status(201).json(note);
//     } catch (error) {
//         console.error('CreateNote error:', error);
//         res.status(500).json({ message: 'Server error while creating note' });
//     }
// }

// const updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     try {
//         let note = await Note.findOne({ _id: id, user: req.user.id });
//         if (!note) {
//             return res.status(404).json({ message: 'Note not found' });
//         }

//         if (title !== undefined) note.title = title;
//         if (content !== undefined) note.content = content;

//         await note.save();
//         res.status(200).json({ message: 'Note updated', note });
//     } catch (error) {
//         console.error('Update Note error:', error);
//         res.status(500).json({ message: 'Server error while updating note' });
//     }
// };

// const deleteNote = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
//         if (!note) {
//             return res.status(404).json({ message: 'Note not found' });
//         }
//         res.status(200).json({ message: 'Note deleted' });
//     } catch (error) {
//         console.error('Delete Note error:', error);
//         res.status(500).json({ message: 'Server error while deleting note' });
//     }
// }

// module.exports = {
//     GetNotes,
//     CreateNote,
//     updateNote,
//     deleteNote
// };
