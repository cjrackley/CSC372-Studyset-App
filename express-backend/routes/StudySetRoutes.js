"use strict";
const { Router } = require('express');
const cors = require('cors');

const router = Router();

const studySetController = require('../controllers/studySetController');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

const requireAuth = require('../auth/requireAuth');

router.get("/", requireAuth, studySetController.fetchAllStudySets);
router.get("/:id", requireAuth, studySetController.fetchStudySetById);
router.post("/", requireAuth, studySetController.createStudySet);
router.delete("/:id", requireAuth, studySetController.removeStudySet);


module.exports = router;