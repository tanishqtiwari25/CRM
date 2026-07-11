const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLeadStatus } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getLeads)
  .post(protect, authorize('Super Admin', 'Admin', 'Sales Manager', 'Sales Executive'), createLead);

router.route('/:id/status')
  .patch(protect, authorize('Super Admin', 'Admin', 'Sales Manager', 'Sales Executive'), updateLeadStatus);

module.exports = router;