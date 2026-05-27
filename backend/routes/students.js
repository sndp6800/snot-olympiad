// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, school, class: cls, search } = req.query;
    const query = {};
    if (school) query.school = school;
    if (cls) query.class = cls;
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { rollNumber: new RegExp(search, 'i') }
    ];
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('school', 'name code address.city')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, data: students, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', authorize('admin', 'coordinator'), async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/stats', authorize('admin'), async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const confirmed = await Student.countDocuments({ registrationStatus: 'confirmed' });
    const byClass = await Student.aggregate([
      { $group: { _id: '$class', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json({ success: true, data: { total, confirmed, byClass } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id', authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
