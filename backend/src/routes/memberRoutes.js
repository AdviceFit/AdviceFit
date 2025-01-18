const express = require('express');
const MemberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, MemberController.createMember);
// router.get('/', authMiddleware.authenticate, MemberController.getAllMembers);
router.get('/', authMiddleware.authenticate, MemberController.getMembersByUser);
router.get('/:id', authMiddleware.authenticate, MemberController.getMemberById);
router.put('/:id', authMiddleware.authenticate, MemberController.updateMember);
router.delete('/:id', authMiddleware.authenticate, MemberController.deleteMember);

module.exports = router;
