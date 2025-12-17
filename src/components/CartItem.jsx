import React from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-img"
      />

      <div className="cart-item-details">
        <h5 className="cart-item-name">{item.name}</h5>
        <p className="cart-item-unit-price">
          Unit Price: ${item.price.toFixed(2)}
        </p>
        <p className="cart-item-total">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="cart-item-actions">
        <div className="cart-item-quantity">
          <button
            className="btn btn-sm btn-outline-secondary quantity-btn"
            onClick={() => dispatch(decreaseQuantity(item.id))}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="quantity-value">{item.quantity}</span>

          <button
            className="btn btn-sm btn-outline-secondary quantity-btn"
            onClick={() => dispatch(increaseQuantity(item.id))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
