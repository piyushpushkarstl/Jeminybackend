const express = require('express');
const {
    fetchAllResumes,
    fetchResumeById,
    createResume,
    modifyResume,
    removeResume,
} = require('../controllers/resumeController');

const router = express.Router();

router.get('/', fetchAllResumes);
router.get('/:id', fetchResumeById);
router.post('/', createResume);
router.put('/:id', modifyResume);
router.delete('/:id', removeResume);

module.exports = router;
