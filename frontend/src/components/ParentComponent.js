import React, { useState, useEffect } from 'react';
import Wishlist from './Wishlist';
import ViewMedicines from './ViewMedicines';

const ParentComponent = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    return Array.isArray(savedWishlist) ? savedWishlist : [];
  });

  const handleAddToWishlist = (medicine) => {
    if (!wishlist.some(item => item._id === medicine._id)) {
      const updatedWishlist = [...wishlist, medicine];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div>
      <Wishlist wishlist={wishlist} setWishlist={setWishlist} />
      <ViewMedicines role="user" category="All" cart={[]} setCart={() => {}} wishlist={wishlist} setWishlist={handleAddToWishlist} />
    </div>
  );
};

export default ParentComponent;
