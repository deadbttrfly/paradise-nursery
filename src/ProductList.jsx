import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// Thumbnail SVG (selalu tampil tanpa bergantung pada server gambar)
const img = (emoji, bg) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='220'><rect width='300' height='220' fill='${bg}'/><text x='150' y='145' font-size='110' text-anchor='middle'>${emoji}</text></svg>`
  )}`;

const plantsArray = [
  {
    category: 'Tanaman Pembersih Udara',
    plants: [
      { name: 'Lidah Mertua', image: img('🌿', '#c8e6c9'), cost: 12 },
      { name: 'Spider Plant', image: img('🍃', '#dcedc8'), cost: 10 },
      { name: 'Peace Lily', image: img('🌼', '#f1f8e9'), cost: 15 },
      { name: 'Lidah Buaya', image: img('🪴', '#b2dfdb'), cost: 9 },
      { name: 'Sirih Gading', image: img('🌱', '#c5e1a5'), cost: 8 },
      { name: 'Palem Areca', image: img('🌴', '#a5d6a7'), cost: 20 },
    ],
  },
  {
    category: 'Tanaman Aromaterapi',
    plants: [
      { name: 'Lavender', image: img('💜', '#e1bee7'), cost: 14 },
      { name: 'Mint', image: img('🌿', '#b9f6ca'), cost: 7 },
      { name: 'Rosemary', image: img('🌲', '#c8e6c9'), cost: 11 },
      { name: 'Serai Wangi', image: img('🌾', '#f0f4c3'), cost: 8 },
      { name: 'Melati', image: img('🤍', '#fafafa'), cost: 13 },
      { name: 'Kemangi', image: img('🍀', '#dcedc8'), cost: 6 },
    ],
  },
  {
    category: 'Tanaman Hias Daun',
    plants: [
      { name: 'Monstera', image: img('🌿', '#a5d6a7'), cost: 25 },
      { name: 'Calathea', image: img('🍂', '#ffe0b2'), cost: 18 },
      { name: 'Aglaonema', image: img('❤️', '#ffcdd2'), cost: 16 },
      { name: 'Philodendron', image: img('🍃', '#c8e6c9'), cost: 17 },
      { name: 'Alocasia', image: img('🌱', '#b2dfdb'), cost: 22 },
      { name: 'Pakis Boston', image: img('🌿', '#dcedc8'), cost: 12 },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

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

      <div className="product-grid-container">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="product-price">${plant.cost}</p>
                  <button
                    className="product-button"
                    disabled={isInCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.name) ? 'Sudah di Keranjang' : 'Tambahkan ke Keranjang'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
