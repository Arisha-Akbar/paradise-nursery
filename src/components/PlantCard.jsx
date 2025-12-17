import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === plant.id);

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
  };

  return (
    <div className="plant-card">
      <img
        src={plant.image}
        alt={plant.name}
        className="plant-card-img"
      />
      <div className="plant-card-body">
        <h5 className="plant-card-title">{plant.name}</h5>
        {plant.description && (
          <p className="plant-card-description">{plant.description}</p>
        )}
        <p className="plant-card-price">${plant.price.toFixed(2)}</p>
        <button
          className={`btn ${isInCart ? 'btn-outline-success' : 'btn-success'} w-100`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default PlantCard;
