import { useState, useEffect } from 'react';
import StudySetService from '../StudySetService';
import NoteService from '../NoteService';
import { useParams, Link } from 'react-router-dom';

const StudySetDetailsComponent = () => {
    const { id } = useParams();
    const [studySet, setStudySet] = useState(null);
    const [notes, setNotes] = useState([]);
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");

    useEffect(() => {
        document.id = 'Study Set Details';

        StudySetService.getStudySetById(id).then((res) => {
            const set = res.data;
            setStudySet(set);

            if (set?.id) {
                NoteService.getNotesBySet(set.id).then((res) => {
                    setNotes(res.data);
                });
            }
        });


    }, [id]);

    const handleAddNote = (e) => {
        e.preventDefault();

        if (!studySet || !studySet.id) {
            console.error("Study set not loaded yet");
            return;
        }

        const newNote = {
            set_id: id,
            term: term.trim(),
            definition: definition.trim()
        };

        NoteService.createNote(newNote).then((res) => {
            setNotes([...notes, res.data]);

            setTerm("");
            setDefinition("");
        });
    };

    const handleDeleteNote = (id) => {
        NoteService.deleteNote(id).then(() => {
            setNotes(prev => prev.filter(n => n.id !== id));
        });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2 className="text-center">Study Set Details: {studySet?.title}</h2>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-topbar">
                    <p> Description: {studySet?.description}</p>
                    <Link to="/" className="btn btn-outline-primary">
                        Back
                    </Link>
                </div>

                <div className="studyset-card">
                    <h3>Add Note</h3>

                    <form onSubmit={handleAddNote} className="studyset-card note-form">
                        <input
                            className="form-control mb-2"
                            placeholder="Term"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            required />

                        <textarea
                            className="form-control note-input"
                            placeholder="Definition"
                            value={definition}
                            onChange={(e) => setDefinition(e.target.value)}
                            required />

                        <button className="btn btn-primary" type="submit">
                            Add Note
                        </button>
                    </form>
                </div>

                <div className="studyset-grid">
                    {notes.map(note => (
                        <div key={note.id} className="studyset-card">
                            <h5>{note.term}</h5>
                            <p>{note.definition}</p>
                            <div className="card-buttons">
                                <button className="btn-delete" onClick={() => handleDeleteNote(note.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudySetDetailsComponent;