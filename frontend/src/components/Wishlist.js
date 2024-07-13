import React from 'react';
import PropTypes from 'prop-types';
import './Wishlist.css'; // Add CSS for styling

const Wishlist = ({ wishlist, setWishlist, moveToCart }) => {
  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

    return (
      <div className="wishlist-container">
        <h2>Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div className="wishlist-items">
            {wishlist.map(item => (
              <div className="wishlist-item" key={item._id}>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="wishlist-item-image" />
                )}
                <div className="wishlist-item-details">
                  <h5 className="wishlist-item-title">{item.name}</h5>
                  <p className="wishlist-item-price">Price: ₹{item.price}</p>
                  <div className="wishlist-item-actions">
                    <button className="btn btn-primary" onClick={() => moveToCart(item)}>Move to Cart</button>
                    <button className="btn btn-danger" onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  Wishlist.propTypes = {
    wishlist: PropTypes.array.isRequired,
    moveToCart: PropTypes.func.isRequired
  };
  
  export default Wishlist;
  