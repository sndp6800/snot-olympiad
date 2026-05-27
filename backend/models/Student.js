const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, unique: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  class: { type: String, required: true, enum: ['1','2','3','4','5','6','7','8','9','10','11','12'] },
  section: { type: String, trim: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  parentName: String,
  parentPhone: String,
  parentEmail: String,
  subjects: [{
    type: String,
    enum: ['Mathematics', 'Science', 'English', 'General Knowledge', 'Cyber', 'Reasoning']
  }],
  registrationStatus: { type: String, enum: ['registered', 'confirmed', 'withdrawn'], default: 'registered' },
  feePaid: { type: Boolean, default: false },
  feeAmount: { type: Number, default: 0 },
  admitCardGenerated: { type: Boolean, default: false },
  examCenter: String,
  result: {
    score: Number,
    rank: Number,
    grade: String,
    certificate: String
  }
}, { timestamps: true });

// Auto-generate roll number
studentSchema.pre('save', async function(next) {
  if (!this.rollNumber) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.model('Student').countDocuments();
    this.rollNumber = `SNOT${year}${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
