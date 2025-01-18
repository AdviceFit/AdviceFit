const express = require('express');
const VisitorController = require('../controllers/visitorController');

const router = express.Router();

router.post('/', VisitorController.createVisitor);
router.get('/', VisitorController.getAllVisitors);
router.get('/:id', VisitorController.getVisitorById);
router.put('/:id', VisitorController.updateVisitor);
router.delete('/:id', VisitorController.deleteVisitor);

module.exports = router;
