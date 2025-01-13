const express = require('express');
const {
    fetchAllWorkSamples,
    fetchWorkSampleById,
    createWorkSample,
    removeWorkSample,
} = require('../controllers/workSampleController');

const router = express.Router();

router.get('/', fetchAllWorkSamples);
router.get('/:id', fetchWorkSampleById);
router.post('/', createWorkSample);
router.delete('/:id', removeWorkSample);

module.exports = router;
