const express = require('express');
const {
    fetchAllSocialProfiles,
    fetchSocialProfileById,
    createSocialProfile,
    removeSocialProfile,
} = require('../controllers/socialProfileController');

const router = express.Router();

router.get('/', fetchAllSocialProfiles);
router.get('/:id', fetchSocialProfileById);
router.post('/', createSocialProfile);
router.delete('/:id', removeSocialProfile);

module.exports = router;
