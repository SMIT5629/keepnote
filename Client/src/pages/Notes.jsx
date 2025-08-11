import React, { useEffect, useState } from "react";
import { getNotes, updateNote } from "../api/notes";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await getNotes(token);
            setNotes(data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleEdit = (note) => {
        setEditNote(note);
    };

    const handleUpdate = async (title, content) => {
        try {
            const token = localStorage.getItem("token");
            await updateNote(editNote._id, { title, content }, token);
            setEditNote(null);
            fetchNotes();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Your Notes
            </h1>

            <div className="mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <NoteForm
                    onNoteAdded={fetchNotes}
                    editNote={editNote}
                    onUpdate={handleUpdate}
                />
            </div>

            {notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={fetchNotes}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">
                    No notes yet. Add your first one above.
                </p>
            )}
        </div>
    );
};

export default Notes;
