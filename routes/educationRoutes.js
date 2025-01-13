const express = require('express');
const {
    fetchAllEducations,
    fetchEducationById,
    createEducation,
    removeEducation,
} = require('../controllers/educationController');

const router = express.Router();

router.get('/', fetchAllEducations);
router.get('/:id', fetchEducationById);
router.post('/', createEducation);
router.delete('/:id', removeEducation);

module.exports = router;
