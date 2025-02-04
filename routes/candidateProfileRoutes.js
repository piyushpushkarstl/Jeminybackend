/*const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware'); // Import middleware
const {
    createCandidateProfile,
    updateCandidateProfile,
    getCandidateProfile
} = require('../controllers/candidateProfileController'); // Import controller

const router = express.Router();

// Protect all routes with `verifyToken` to extract `candidate_id` from the token

// POST: Create Candidate Profile
router.post('/create', verifyToken, createCandidateProfile);

// PATCH: Update Candidate Profile
router.patch('/update', verifyToken, updateCandidateProfile);

// GET: Fetch Candidate Profile
router.get('/get', verifyToken, getCandidateProfile);

module.exports = router;*/

//candidateProfileRoutes.js

const OTP = require("../models/otp");
const TemporaryUsers = require("../models/temporaryUsers");
const User = require("../models/user");


const express = require("express");
const { getUserDetails, updateUserDetails, getCandidatesByExperience,addNewRecord,updateSpecificRecord,deleteRecord } = require("../controllers/candidateProfileController");
console.log("Imported candidateProfileController functions:", { getUserDetails, updateUserDetails, getCandidatesByExperience,addNewRecord,updateSpecificRecord,deleteRecord });
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Secure route with both token verification and candidate_id validation
router.get("/user-details/:candidate_id", verifyToken, getUserDetails);

// Update route
router.patch("/update-user/:candidate_id", verifyToken, updateUserDetails);

// GET: Fetch candidates by experience 
router.get("/candidates/experience/range", verifyToken, getCandidatesByExperience);

// Add new record
router.post("/education/:candidate_id", verifyToken, addNewRecord);
router.post("/employment/:candidate_id", verifyToken, addNewRecord);
router.post("/projects/:candidate_id", verifyToken, addNewRecord);

// Update specific record
router.patch("/education/:record_id", verifyToken, updateSpecificRecord);
router.patch("/employment/:record_id", verifyToken, updateSpecificRecord);
router.patch("/projects/:record_id", verifyToken, updateSpecificRecord);

// Delete specific record
router.delete("/education/:record_id", verifyToken, deleteRecord);
router.delete("/employment/:record_id", verifyToken, deleteRecord);
router.delete("/projects/:record_id", verifyToken, deleteRecord);

module.exports = router;
