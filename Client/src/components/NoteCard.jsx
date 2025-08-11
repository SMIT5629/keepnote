import React from "react";
import { deleteNote } from "../api/notes";

const NoteCard = ({ note, onDelete, onEdit }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await deleteNote(note._id, token);
            onDelete(); // refresh notes
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.content}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(note)}
                    className="px-3 py-1 text-sm text-blue-400 hover:text-blue-600 transition-colors duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm text-red-400 hover:text-red-600 transition-colors duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
