const express = require('express');
const VisitorController = require('../controllers/visitorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, VisitorController.createVisitor);
router.get('/', authMiddleware.authenticate, VisitorController.getVisitorsByUser);
router.get('/:id', authMiddleware.authenticate, VisitorController.getVisitorById);
router.put('/:id', authMiddleware.authenticate, VisitorController.updateVisitor);
router.delete('/:id', authMiddleware.authenticate, VisitorController.deleteVisitor);

module.exports = router;
