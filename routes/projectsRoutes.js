const express = require('express');
const {
    fetchAllProjects,
    fetchProjectsById,
    createProject,
    removeProject,
} = require('../controllers/projectsController');

const router = express.Router();

router.get('/', fetchAllProjects);
router.get('/:id', fetchProjectsById);
router.post('/', createProject);
router.delete('/:id', removeProject);

module.exports = router;
