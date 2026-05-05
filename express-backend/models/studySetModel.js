"use strict";
const pool = require('./dbConnection');

async function getAllStudySets(userId) {
    const queryText = "SELECT * FROM notesets WHERE user_id = $1";
    const result = await pool.query(queryText, [userId]);
    return result.rows;
}

async function getStudySetById(id, userId) {
    const queryText = "SELECT * FROM notesets WHERE id = $1 AND user_id = $2";
    const values = [id, userId];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteStudySet(id, userId) {
    let queryText = "DELETE FROM notesets WHERE id = $1 AND user_id = $2 ";
    const result = await pool.query(queryText, [id, userId]);
    return result.rowCount;
}

async function addStudySet(title, description, userId) {
    let queryText = "INSERT INTO notesets ( title, description, user_id) VALUES ($1, $2, $3) RETURNING *";
    let values = [title, description, userId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllStudySets,
    deleteStudySet,
    addStudySet,
    getStudySetById
};