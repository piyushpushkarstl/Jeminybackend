const express = require('express');
const {
    fetchDashboardEntries,
    fetchDashboardEntryById,
    createDashboardEntry,
    modifyDashboardEntry,
    removeDashboardEntry,
} = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', fetchDashboardEntries);
router.get('/:id', fetchDashboardEntryById);
router.post('/', createDashboardEntry);
router.put('/:id', modifyDashboardEntry);
router.delete('/:id', removeDashboardEntry);

module.exports = router;
