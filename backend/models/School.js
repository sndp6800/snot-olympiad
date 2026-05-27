const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, unique: true, uppercase: true },
  board: { type: String, enum: ['CBSE', 'ICSE', 'State Board', 'IB', 'Other'], default: 'CBSE' },
  coordinator: {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true }
  },
  address: {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: String
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'fee_pending', 'suspended'],
    default: 'pending'
  },
  onboarding: {
    registered: { type: Boolean, default: true },
    coordinatorAssigned: { type: Boolean, default: false },
    mouSigned: { type: Boolean, default: false },
    feePaid: { type: Boolean, default: false },
    studentsRegistered: { type: Boolean, default: false },
    kitDispatched: { type: Boolean, default: false }
  },
  totalStudents: { type: Number, default: 0 },
  feesAmount: { type: Number, default: 0 },
  feesPaid: { type: Number, default: 0 },
  mouDocumentUrl: String,
  examDate: Date,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Auto-generate school code
schoolSchema.pre('save', async function(next) {
  if (!this.code) {
    const prefix = this.name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
    const count = await mongoose.model('School').countDocuments();
    this.code = `${prefix}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('School', schoolSchema);
