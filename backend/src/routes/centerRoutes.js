const express = require('express');
const centerController = require('../controllers/centerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, centerController.createCenter); // Create Center
router.get('/', authMiddleware.authenticate, centerController.getAllCenters); // Get All Centers
router.get('/user', authMiddleware.authenticate, centerController.getCentersByUser); // Get Centers by Logged-In User
router.get('/:id', authMiddleware.authenticate, centerController.getCenterById); // Get Center by ID
router.put('/:id', authMiddleware.authenticate, centerController.updateCenter); // Update Center
router.delete('/:id', authMiddleware.authenticate, centerController.deleteCenter); // Delete Center (Soft Delete)

module.exports = router;
