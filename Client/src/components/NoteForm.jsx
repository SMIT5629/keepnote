import React, { useState, useEffect } from "react";
import { createNote } from "../api/notes";

const NoteForm = ({ onNoteAdded, editNote, onUpdate }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (editNote) {
            setTitle(editNote.title);
            setContent(editNote.content);
        }
    }, [editNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (editNote) {
                await onUpdate(title, content);
            } else {
                await createNote({ title, content }, token);
                onNoteAdded();
            }
            setTitle("");
            setContent("");
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form
            className=" mx-auto m-8 bg-white rounded-lg space-y-4"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
            />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded min-h-[120px] resize-vertical focus:outline-none focus:border-blue-500"
                required
            ></textarea>

            <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
            >
                {editNote ? "Update Note" : "Add Note"}
            </button>
        </form>
    );
};

export default NoteForm;
