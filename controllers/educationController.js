const {
    getAllEducations,
    getEducationById,
    addEducation,
    deleteEducation,
} = require('../backend/models/education');

const fetchAllEducations = async (req, res) => {
    try {
        const educations = await getAllEducations();
        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch education records', details: error.message });
    }
};

const fetchEducationById = async (req, res) => {
    const { id } = req.params;
    try {
        const education = await getEducationById(id);
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch education record', details: error.message });
    }
};

const createEducation = async (req, res) => {
    const {
        candidateId,
        levelOfEducation,
        university,
        course,
        specialization,
        courseType,
        courseDuration,
        gradingSystem,
    } = req.body;

    try {
        const id = await addEducation(
            candidateId,
            levelOfEducation,
            university,
            course,
            specialization,
            courseType,
            courseDuration,
            gradingSystem
        );
        res.status(201).json({ message: 'Education record added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add education record', details: error.message });
    }
};

const removeEducation = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteEducation(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Education record deleted' });
        } else {
            res.status(404).json({ message: 'Education record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete education record', details: error.message });
    }
};

module.exports = {
    fetchAllEducations,
    fetchEducationById,
    createEducation,
    removeEducation,
};
