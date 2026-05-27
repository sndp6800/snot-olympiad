const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['registration', 'kit', 'training', 'other'], default: 'registration' },
  method: { type: String, enum: ['upi', 'card', 'netbanking', 'cheque', 'cash', 'neft'], default: 'upi' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: { type: String, unique: true, sparse: true },
  invoiceNumber: { type: String, unique: true },
  description: String,
  paidAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Auto-generate invoice number
paymentSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const count = await mongoose.model('Payment').countDocuments();
    this.invoiceNumber = `SNOT-INV-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  if (this.status === 'completed' && !this.paidAt) {
    this.paidAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
