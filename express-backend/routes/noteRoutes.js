"use strict";
const express = require("express");
const router = express.Router();
const noteController = require('../controllers/noteController');
const cors = require('cors');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

const requireAuth = require('../auth/requireAuth');

router.get("/", requireAuth, noteController.fetchAllNotes);
router.get("/set/:set_id", requireAuth, noteController.fetchNotesByStudySet);
router.post("/", requireAuth, noteController.createNote);
router.delete("/:id", requireAuth, noteController.removeNote);
module.exports = router;