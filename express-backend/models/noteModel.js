"use strict";
const pool = require('./dbConnection');

async function getAllNotes() {
    const queryText = "SELECT * FROM notes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getNotesByStudySet(set_id) {
    let queryText = "SELECT * FROM notes where set_id= $1";
    const values = [set_id];
    const result = await pool.query(queryText, values);
    return result.rows;
}


async function deleteNote(id) {
    let queryText = "DELETE FROM notes WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addNote(set_id, term, definition) {
    let queryText = "INSERT INTO notes ( set_id, term, definition) VALUES ($1, $2, $3) RETURNING *";
    let values = [set_id, term, definition];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllNotes,
    getNotesByStudySet,
    deleteNote,
    addNote
};