const express = require('express');
const MemberController = require('../controllers/memberController');

const router = express.Router();

router.post('/', MemberController.createMember);
router.get('/', MemberController.getAllMembers);
router.get('/:id', MemberController.getMemberById);
router.put('/:id', MemberController.updateMember);
router.delete('/:id', MemberController.deleteMember);

module.exports = router;
