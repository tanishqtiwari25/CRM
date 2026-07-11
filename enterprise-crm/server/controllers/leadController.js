const Lead = require('../models/Lead');

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({}).populate('assignedTo', 'name email role');
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

exports.createLead = async (req, res, next) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    next(error);
  }
};

exports.updateLeadStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Target lead reference entity not located' });
    res.json(lead);
  } catch (error) {
    next(error);
  }
};