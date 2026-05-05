"use strict";
const model = require('../models/studySetModel');

async function fetchAllStudySets(req, res) {
    try {
        const userId = req.user.id;
        const noteSets = await model.getAllStudySets(userId);
        res.json(noteSets);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchStudySetById(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).send("Missing required id param!");
    }

    try {
        const noteSet = await model.getStudySetById(id, userId);

        if (!noteSet) {
            return res.status(404).send("Study set not found");
        }

        res.json(noteSet);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function removeStudySet(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).send("Missing study set id");
    }

    try {
        const deletedCount = await model.deleteStudySet(id, userId);

        if (deletedCount > 0) {
            return res.send("Study set deleted successfully");
        } else {
            return res.status(404).send("Study set not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function createStudySet(req, res) {
    console.log("BODY:", req.body);
    const { title, description } = req.body;
    const userId = req.user.id;

    if (title && description) {
        try {
            const newStudySet = await model.addStudySet(title, description,userId);
            res.status(201).json(newStudySet);
        } catch (err) {
            console.error("CREATE ERROR:", err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required study set fields!");
    }
}

module.exports = {
    fetchAllStudySets,
    removeStudySet,
    createStudySet,
    fetchStudySetById
};