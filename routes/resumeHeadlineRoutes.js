const express = require('express');
const {
    fetchAllResumeHeadlines,
    fetchResumeHeadlineById,
    createResumeHeadline,
    modifyResumeHeadline,
    removeResumeHeadline,
} = require('../controllers/resumeHeadlineController');

const router = express.Router();

router.get('/', fetchAllResumeHeadlines);
router.get('/:id', fetchResumeHeadlineById);
router.post('/', createResumeHeadline);
router.put('/:id', modifyResumeHeadline);
router.delete('/:id', removeResumeHeadline);

module.exports = router;
