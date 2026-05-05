import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;

class NoteService {

    getNotes() {
        return axios.get(`${BASE}/notes`, {
            withCredentials: true
        });
    }

    createNote(note) {
        return axios.post(`${BASE}/notes`, note, {
            withCredentials: true
        });
    }

    getNotesBySet(setId) {
        return axios.get(`${BASE}/notes/set/${setId}`, {
            withCredentials: true
        });
    }

    deleteNote(id) {
        return axios.delete(`${BASE}/notes/${id}`, {
            withCredentials: true
        });
    }
}

export default new NoteService();