const {
    getAllEmployments,
    getEmploymentById,
    addEmployment,
    deleteEmployment,
} = require('../backend/models/employment');

const fetchAllEmployments = async (req, res) => {
    try {
        const employments = await getAllEmployments();
        res.status(200).json(employments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employment records', details: error.message });
    }
};

const fetchEmploymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const employment = await getEmploymentById(id);
        res.status(200).json(employment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employment record', details: error.message });
    }
};

const createEmployment = async (req, res) => {
    const {
        candidateId,
        currentEmployment,
        employmentType,
        experience,
        currentCompanyName,
        currentJobTitle,
        joiningDate,
        currentSalary,
        skillUsed,
        jobProfile,
        noticePeriod,
    } = req.body;

    try {
        const id = await addEmployment(
            candidateId,
            currentEmployment,
            employmentType,
            experience,
            currentCompanyName,
            currentJobTitle,
            joiningDate,
            currentSalary,
            skillUsed,
            jobProfile,
            noticePeriod
        );
        res.status(201).json({ message: 'Employment record added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add employment record', details: error.message });
    }
};

const removeEmployment = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteEmployment(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Employment record deleted' });
        } else {
            res.status(404).json({ message: 'Employment record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employment record', details: error.message });
    }
};

module.exports = {
    fetchAllEmployments,
    fetchEmploymentById,
    createEmployment,
    removeEmployment,
};
