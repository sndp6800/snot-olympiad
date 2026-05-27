const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Contact: ${contact.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
          <p><strong>Organization:</strong> ${contact.organization || 'N/A'}</p>
          <p><strong>Type:</strong> ${contact.type}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Message:</strong><br/>${contact.message}</p>
        `
      });

      // Send acknowledgement to user
      await sendEmail({
        to: contact.email,
        subject: 'Thank you for contacting SNOT Olympiad',
        html: `
          <h2>Hello ${contact.name},</h2>
          <p>Thank you for reaching out to StudyNLearn National Olympiad (SNOT).</p>
          <p>We have received your message and will respond within 24-48 hours.</p>
          <p><strong>Your Reference ID:</strong> ${contact._id}</p>
          <br/>
          <p>Best regards,<br/>SNOT Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: { id: contact._id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contacts (Admin)
// @route   GET /api/contact
// @access  Private/Admin
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = status ? { status } : {};

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: contacts,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
