const express = require('express');
const router = express.Router();
const {
  getSchools, getSchool, createSchool, updateSchool, deleteSchool, getStats
} = require('../controllers/schoolController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/stats', authorize('admin'), getStats);
router.route('/').get(getSchools).post(authorize('admin'), createSchool);
router.route('/:id')
  .get(getSchool)
  .put(authorize('admin'), updateSchool)
  .delete(authorize('admin'), deleteSchool);

module.exports = router;
