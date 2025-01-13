const {
    getAllDashboardEntries,
    getDashboardEntryById,
    addDashboardEntry,
    updateDashboardEntry,
    deleteDashboardEntry,
} = require('../backend/models/dashboard');

const fetchDashboardEntries = async (req, res) => {
    try {
        const entries = await getAllDashboardEntries();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard entries', details: error.message });
    }
};

const fetchDashboardEntryById = async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await getDashboardEntryById(id);
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: 'Dashboard entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard entry', details: error.message });
    }
};

const createDashboardEntry = async (req, res) => {
    const { photo, fullName, location, fresher_experience, availability, phone, email } = req.body;
    try {
        const entryId = await addDashboardEntry(photo, fullName, location, fresher_experience, availability, phone, email);
        res.status(201).json({ message: 'Dashboard entry added', entryId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add dashboard entry', details: error.message });
    }
};

const modifyDashboardEntry = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await updateDashboardEntry(id, updates);
        if (affectedRows) {
            res.status(200).json({ message: 'Dashboard entry updated' });
        } else {
            res.status(404).json({ message: 'Dashboard entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update dashboard entry', details: error.message });
    }
};

const removeDashboardEntry = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteDashboardEntry(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Dashboard entry deleted' });
        } else {
            res.status(404).json({ message: 'Dashboard entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete dashboard entry', details: error.message });
    }
};

module.exports = {
    fetchDashboardEntries,
    fetchDashboardEntryById,
    createDashboardEntry,
    modifyDashboardEntry,
    removeDashboardEntry,
};
