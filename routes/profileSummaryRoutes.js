const express = require('express');
const {
    fetchAllProfileSummaries,
    fetchProfileSummaryById,
    createProfileSummary,
    removeProfileSummary,
} = require('../controllers/profileSummaryController');

const router = express.Router();

router.get('/', fetchAllProfileSummaries);
router.get('/:id', fetchProfileSummaryById);
router.post('/', createProfileSummary);
router.delete('/:id', removeProfileSummary);

module.exports = router;
