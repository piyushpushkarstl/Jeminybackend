const express = require('express');
const {
    fetchAllEmployments,
    fetchEmploymentById,
    createEmployment,
    removeEmployment,
} = require('../controllers/employmentController');

const router = express.Router();

router.get('/', fetchAllEmployments);
router.get('/:id', fetchEmploymentById);
router.post('/', createEmployment);
router.delete('/:id', removeEmployment);

module.exports = router;
