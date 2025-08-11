import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/notes";
console.log(`${API_URL}`); // See what URL is being called

// Get all notes
export const getNotes = async (token) => {
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Create note
export const createNote = async (noteData, token) => {
    const res = await axios.post(API_URL, noteData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Update note
export const updateNote = async (noteId, noteData, token) => {
    const res = await axios.put(`${API_URL}/${noteId}`, noteData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Delete note
export const deleteNote = async (noteId, token) => {
    const res = await axios.delete(`${API_URL}/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};