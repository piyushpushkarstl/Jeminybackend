const {
    getAllPersonalDetails,
    getPersonalDetailsById,
    addPersonalDetails,
    deletePersonalDetails,
} = require('../backend/models/personalDetails');

const fetchAllPersonalDetails = async (req, res) => {
    try {
        const details = await getAllPersonalDetails();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch personal details', details: error.message });
    }
};

const fetchPersonalDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        const details = await getPersonalDetailsById(id);
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch personal details', details: error.message });
    }
};

const createPersonalDetails = async (req, res) => {
    const {
        candidateId,
        gender,
        moreInformation,
        maritalStatus,
        dob,
        category,
        differentlyAbled,
        careerBreak,
        workPermitToUsa,
        workPermitToCountry,
        permanentAddress,
        homeTown,
        pinCode,
        languageProficiency,
    } = req.body;

    try {
        const id = await addPersonalDetails(
            candidateId,
            gender,
            moreInformation,
            maritalStatus,
            dob,
            category,
            differentlyAbled,
            careerBreak,
            workPermitToUsa,
            workPermitToCountry,
            permanentAddress,
            homeTown,
            pinCode,
            languageProficiency
        );
        res.status(201).json({ message: 'Personal details added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add personal details', details: error.message });
    }
};

const removePersonalDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deletePersonalDetails(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Personal details deleted' });
        } else {
            res.status(404).json({ message: 'Personal details not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete personal details', details: error.message });
    }
};

module.exports = {
    fetchAllPersonalDetails,
    fetchPersonalDetailsById,
    createPersonalDetails,
    removePersonalDetails,
};
