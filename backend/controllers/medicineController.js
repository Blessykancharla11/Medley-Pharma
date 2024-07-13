const Medicine = require('../models/Medicine');

const addMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully', data: newMedicine });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicinesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const medicines = await Medicine.find({ category });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine updated successfully', data: updatedMedicine });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    console.log('Deleting medicine with ID:', req.params.id);
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine removed successfully' });
  } catch (error) {
    console.error('Error removing medicine:', error);
    res.status(500).json({ message: 'Error removing medicine', error: error.message });
  }
};


module.exports = {
  addMedicine,
  getAllMedicines,
  getMedicinesByCategory,
  updateMedicine,
  deleteMedicine,
};
