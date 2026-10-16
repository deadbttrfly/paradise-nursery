import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.cost * i.quantity, 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    else dispatch(removeItem(item.name));
  };

  const handleCheckout = () => alert('Checkout Segera Hadir!');

  return (
    <div>
      <nav className="navbar">
        <div className="brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <a onClick={() => onNavigate('home')}>Beranda</a>
          <a onClick={() => onNavigate('plants')}>Tanaman</a>
          <a onClick={() => onNavigate('cart')} aria-label="Keranjang">
            <span className="cart-icon">
              🛒<span className="cart-count">{totalQuantity}</span>
            </span>
          </a>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Keranjang Belanja</h2>
        <p>Total tanaman di keranjang: <strong>{totalQuantity}</strong></p>

        {items.length === 0 ? (
          <div className="empty-cart">Keranjang Anda masih kosong.</div>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Harga satuan: ${item.cost}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)} aria-label="Kurangi">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} aria-label="Tambah">+</button>
                </div>
                <p className="cart-item-total">Total: ${item.cost * item.quantity}</p>
              </div>
              <button className="cart-btn delete-btn" onClick={() => dispatch(removeItem(item.name))}>
                Hapus
              </button>
            </div>
          ))
        )}

        <div className="cart-summary">
          Total Biaya Keseluruhan: <span className="total-amount">${totalAmount}</span>
        </div>

        <div className="cart-actions">
          <button className="cart-btn continue-btn" onClick={() => onNavigate('plants')}>
            Lanjutkan Berbelanja
          </button>
          <button className="cart-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
