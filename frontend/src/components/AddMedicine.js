import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMedicine = ({ category, onMedicineAdded, editMedicine }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: category,
    stock: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (editMedicine) {
      setFormData(editMedicine);
    }
  }, [editMedicine]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMedicine) {
        const response = await axios.put(`http://localhost:8000/api/medicines/update/${editMedicine._id}`, formData);
        alert(response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/api/medicines/add', formData);
        alert(response.data.message);
      }
      onMedicineAdded();
    } catch (error) {
      alert('Error saving medicine');
    }
  };

  return (
    <div className="container">
      <h2>{editMedicine ? 'Edit Medicine' : 'Add Medicine'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-control" readOnly />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form-control" required />
        </div>
        <div className='"form-group'>
          <label>Expiry Date</label>
          <input type="date" name="expiry" value = {formData.expiry} onChange={handleChange} className='form-control' required/>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">{editMedicine ? 'Update' : 'Add'} Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
