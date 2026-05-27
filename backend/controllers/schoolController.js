const School = require('../models/School');

// @desc    Get all schools
// @route   GET /api/schools
// @access  Private/Admin
exports.getSchools = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, state, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (state) query['address.state'] = new RegExp(state, 'i');
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { code: new RegExp(search, 'i') },
        { 'coordinator.name': new RegExp(search, 'i') },
        { 'address.city': new RegExp(search, 'i') }
      ];
    }

    const total = await School.countDocuments(query);
    const schools = await School.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: schools,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single school
// @route   GET /api/schools/:id
// @access  Private
exports.getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate('createdBy', 'name email');
    if (!school) return res.status(404).json({ success: false, message: 'School not found' });
    res.json({ success: true, data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create school
// @route   POST /api/schools
// @access  Private/Admin
exports.createSchool = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const school = await School.create(req.body);
    res.status(201).json({ success: true, message: 'School created successfully', data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update school
// @route   PUT /api/schools/:id
// @access  Private/Admin
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!school) return res.status(404).json({ success: false, message: 'School not found' });
    res.json({ success: true, message: 'School updated successfully', data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete school
// @route   DELETE /api/schools/:id
// @access  Private/Admin
exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ success: false, message: 'School not found' });
    res.json({ success: true, message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get school stats
// @route   GET /api/schools/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const total = await School.countDocuments();
    const active = await School.countDocuments({ status: 'active' });
    const pending = await School.countDocuments({ status: 'pending' });
    const feePending = await School.countDocuments({ status: 'fee_pending' });

    const byState = await School.aggregate([
      { $group: { _id: '$address.state', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({ success: true, data: { total, active, pending, feePending, byState } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
