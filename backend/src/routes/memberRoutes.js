const express = require('express');
const MemberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.authenticate,MemberController.getMembersByUser);

router.get('/:id', authMiddleware.authenticate, MemberController.getMemberById);

router.post('/', authMiddleware.authenticate, MemberController.createMember);

router.put('/:id', authMiddleware.authenticate, MemberController.updateMember);

router.delete('/:id', authMiddleware.authenticate, MemberController.deleteMember);

module.exports = router;
