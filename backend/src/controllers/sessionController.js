const SessionService = require('../services/sessionService');

// Create a new session
exports.createSession = async (req, res) => {
    try {
        const sessionData = req.body;
        sessionData.createdBy = req.user._id;

        const newSession = await SessionService.createSession(sessionData);
        res.status(201).json({ message: 'Session created successfully', session: newSession });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await SessionService.findAllSessions();
        res.status(200).json({ session: sessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await SessionService.findSessionById(id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ session: session });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update session
exports.updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedBy = req.user._id;

        const updatedSession = await SessionService.updateSession(id, updateData);

        if (!updatedSession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session updated successfully', session: updatedSession });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete session (Soft Delete)
exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSession = await SessionService.updateSession(id, {
            isDeleted: true,
            deletedBy: req.user._id,
        });

        if (!deletedSession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
