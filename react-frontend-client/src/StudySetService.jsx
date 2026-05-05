import axios from 'axios';

const STUDYSETS_API_BASE_URL = import.meta.env.VITE_API_URL;

class StudySetService {

    getStudySets() {
        return axios.get(
            `${STUDYSETS_API_BASE_URL}/study-sets`,
            { withCredentials: true }
        );
    }

    createStudySet(studySet) {
        return axios.post(
            `${STUDYSETS_API_BASE_URL}/study-sets`,
            studySet,
            { withCredentials: true }
        );
    }

    getStudySetById(id) {
        return axios.get(
            `${STUDYSETS_API_BASE_URL}/study-sets/${id}`,
            { withCredentials: true }
        );
    }

    deleteStudySet(id) {
        return axios.delete(`${STUDYSETS_API_BASE_URL}/study-sets/${id}`, {
            withCredentials: true
        })
    }
}


export default new StudySetService();