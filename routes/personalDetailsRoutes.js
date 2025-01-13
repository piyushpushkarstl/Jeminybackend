const express = require('express');
const {
    fetchAllPersonalDetails,
    fetchPersonalDetailsById,
    createPersonalDetails,
    removePersonalDetails,
} = require('../controllers/personalDetailsController');

const router = express.Router();

router.get('/', fetchAllPersonalDetails);
router.get('/:id', fetchPersonalDetailsById);
router.post('/', createPersonalDetails);
router.delete('/:id', removePersonalDetails);

module.exports = router;
