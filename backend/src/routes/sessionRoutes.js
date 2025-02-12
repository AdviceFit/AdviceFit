const express = require('express');
const SessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, SessionController.createSession);
router.get('/', authMiddleware.authenticate, SessionController.getAllSessions);
router.get('/:id', authMiddleware.authenticate, SessionController.getSessionById);
router.put('/:id', authMiddleware.authenticate, SessionController.updateSession);
router.delete('/:id', authMiddleware.authenticate, SessionController.deleteSession);

module.exports = router;
