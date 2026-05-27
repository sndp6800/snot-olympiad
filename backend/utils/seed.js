require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();
  try {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) { console.log('Admin already exists'); process.exit(0); }

    await User.create({
      name: 'SNOT Admin',
      email: process.env.ADMIN_EMAIL || 'admin@snotolympiad.in',
      password: process.env.ADMIN_PASSWORD || 'Admin@1234',
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    });
    console.log('✅ Admin user seeded successfully');
    console.log('   Email:', process.env.ADMIN_EMAIL);
    console.log('   Password:', process.env.ADMIN_PASSWORD);
    console.log('   ⚠️  Change password immediately after first login!');
  } catch (err) {
    console.error('Seed failed:', err.message);
  }
  process.exit(0);
};

seed();
