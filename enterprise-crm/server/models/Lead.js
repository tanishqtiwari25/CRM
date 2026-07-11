const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  companyName: { type: String, trim: true },
  email: { type: String, required: true },
  phone: { type: String },
  source: { 
    type: String, 
    enum: ['Website Forms', 'Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'WhatsApp', 'Phone Calls', 'Email', 'Manual Entry'],
    default: 'Manual Entry' 
  },
  budget: { type: Number, default: 0 },
  interestedServices: [{ type: String }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost', 'Rejected'], 
    default: 'New' 
  },
  leadScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);