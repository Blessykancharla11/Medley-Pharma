import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddMedicine from './AddMedicine';
import './ViewMedicines.css';

const ViewMedicines = ({ role, category, cart, setCart, wishlist, setWishlist }) => {
  const [medicines, setMedicines] = useState([]);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [editMedicine, setEditMedicine] = useState(null);

  const fetchMedicines = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/medicines/category/${category}`);
      console.log('API response:', response.data); // Debug API data
      setMedicines(response.data);
    } catch (error) {
      alert('Error fetching medicines');
    }
  }, [category]);

  useEffect(() => {
    fetchMedicines();
  }, [category, fetchMedicines]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddToCart = (medicine) => {
    const qty = quantity[medicine._id] || 1;
  
    if (qty > medicine.stock) {
      alert('Stock unavailable');
      return;
    }
  
    const updatedMedicine = { ...medicine };
    updatedMedicine.stock -= qty;
  
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex((item) => item._id === medicine._id);
  
    if (existingItemIndex !== -1) {
      newCart[existingItemIndex].quantity += qty;
      newCart[existingItemIndex].total = newCart[existingItemIndex].price * newCart[existingItemIndex].quantity;
    } else {
      newCart.push({
        ...medicine,
        quantity: qty,
        total: qty * medicine.price,
      });
    }
  
    setCart(newCart);
    alert('Added to cart successfully');
  
    // Update medicines state after adding to cart
    const updatedMedicines = [...medicines];
    const medicineIndex = updatedMedicines.findIndex((item) => item._id === medicine._id);
    updatedMedicines[medicineIndex] = updatedMedicine;
  
    if (updatedMedicine.stock === 0) {
      updatedMedicines.splice(medicineIndex, 1); // Remove from view if stock is zero
    }
  
    setMedicines(updatedMedicines);
  };
  
  const handleAddToWishlist = (medicine) => {
    if (!wishlist.find(item => item._id === medicine._id)) {
      setWishlist([...wishlist, medicine]);
    }
  };

  const handleQuantityChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity({ ...quantity, [id]: parsedValue });
    } else {
      setQuantity({ ...quantity, [id]: 1 });
    }
  };

  const handleEditMedicine = (medicine) => {
    setEditMedicine(medicine);
    setShowAddMedicine(true);
  };

  const handleDeleteMedicine = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/medicines/delete/${id}`);
      alert('Medicine deleted successfully');
      fetchMedicines();
    } catch (error) {
      alert('Error deleting medicine');
    }
  };

  const handleCloseForm = () => {
    setShowAddMedicine(false);
    setEditMedicine(null);
  };

  return (
    <div className="container">
      <h2>{category} Medicines</h2>
      {role === 'admin' && (
        <button className="btn btn-primary mb-3" onClick={() => { setShowAddMedicine(!showAddMedicine); setEditMedicine(null); }}>
          {showAddMedicine ? 'Cancel' : 'Add Medicine'}
        </button>
      )}
      {showAddMedicine && <AddMedicine category={category} onMedicineAdded={fetchMedicines} onClose={handleCloseForm} editMedicine={editMedicine} />}
      <div className="row">
        {medicines.map((medicine) => (
          <div className="col-md-4" key={medicine._id}>
            <div className="card mb-4">
              {medicine.imageUrl && (
                <img
                  src={medicine.imageUrl}
                  alt={medicine.name}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{medicine.name}</h5>
                <p className="card-text">{medicine.description}</p>
                <p className="card-text">Price: ₹{medicine.price}</p>
                <p className="card-text">Stock: {medicine.stock}</p>
                <p className="card-text">Expiry Date: {formatDate(medicine.expiry)}</p>
                <p className="card-text">Category: {medicine.category}</p>
                {role === 'user' && (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={quantity[medicine._id] || ''}
                      onChange={(e) => handleQuantityChange(medicine._id, e.target.value)}
                      className="form-control mb-2"
                      placeholder="Quantity"
                    />
                    {quantity[medicine._id] > medicine.stock && (
                      <p style={{ color: 'red' }}>Stock unavailable</p>
                    )}
                    <button className="btn btn-primary" onClick={() => handleAddToCart(medicine)}>
                      Add to Cart
                    </button>
                    <button className="btn btn-light" onClick={() => handleAddToWishlist(medicine)}>
                      ❤️
                    </button>
                  </>
                )}
                {role === 'admin' && (
                  <div className="button-container">
                    <button className="btn btn-secondary mr-2" onClick={() => handleEditMedicine(medicine)}>
                      ✎
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteMedicine(medicine._id)}>
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMedicines;
