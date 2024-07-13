// src/components/EditMedicine.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMedicine = () => {
  const { id, category } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: category,
    stock: '',
  });
  const navigate = useNavigate();

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/medicines/${id}`);
      setFormData(response.data);
    } catch (error) {
      alert('Error fetching medicine details');
    }
  };

  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/medicines/${id}`, formData);
      alert('Medicine updated successfully');
      navigate(`/categories/${category}`);
    } catch (error) {
      alert('Error updating medicine');
    }
  };

  return (
    <div className="container">
      <h2>Edit Medicine</h2>
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
        <div className="form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Update Medicine</button>
      </form>
    </div>
  );
};

export default EditMedicine;
