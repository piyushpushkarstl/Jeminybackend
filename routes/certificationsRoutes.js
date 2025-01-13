const express = require('express');
const {
    fetchAllCertifications,
    fetchCertificationById,
    createCertification,
    removeCertification,
} = require('../controllers/certificationsController');

const router = express.Router();

router.get('/', fetchAllCertifications);
router.get('/:id', fetchCertificationById);
router.post('/', createCertification);
router.delete('/:id', removeCertification);

module.exports = router;
