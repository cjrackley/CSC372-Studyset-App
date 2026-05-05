import { useState, useEffect } from 'react';
import StudySetService from '../StudySetService';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext.jsx';
import WeatherWidgetComponent from './WeatherWidgetComponent.jsx';

const StudySetListComponent = () => {
    const [studySets, setStudySets] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Study Sets List';

        StudySetService.getStudySets().then((res) => {
            setStudySets(res.data);
        });
    }, []);

    const handleDelete = (id) => {
        StudySetService.deleteStudySet(id)
            .then(() => {
                setStudySets(prev => prev.filter(s => s.id !== id));
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h2>Hello, {user?.firstname || user?.displayname || "User"}!</h2>
            </div>

            <div className="dashboard-weather">
                <WeatherWidgetComponent/>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-topbar">
                    <h2>Your Study Sets</h2>

                    <Link to="/add-study-set" className="btn btn-primary small-btn">
                        Add Study Set
                    </Link>
                </div>
                <div className="studyset-grid">
                    {studySets.map(set => (
                        <div key={set.id} className="studyset-card">
                            <h3>{set.title}</h3>
                            <p>{set.description}</p>

                            <div className="card-buttons">
                                <Link to={`/study-sets/${set.id}`} className="btn-view">
                                    View
                                </Link>

                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(set.id)}
                                >
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

export default StudySetListComponent;