const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, school } = req.query;
    const query = {};
    if (status) query.status = status;
    if (school) query.school = school;
    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('school', 'name code address.city')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, data: payments, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/stats', async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $group: {
        _id: '$status',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }}
    ]);
    res.json({ success: true, data: result });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: payment });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
