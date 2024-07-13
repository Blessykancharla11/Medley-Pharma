const express = require('express');
const { addMedicine, getAllMedicines, getMedicinesByCategory, updateMedicine, deleteMedicine } = require('../controllers/medicineController');

const router = express.Router();

router.post('/add', addMedicine);
router.get('/', getAllMedicines);
router.get('/category/:category', getMedicinesByCategory);
router.put('/update/:id', updateMedicine);
router.delete('/delete/:id', deleteMedicine);

module.exports = router;
