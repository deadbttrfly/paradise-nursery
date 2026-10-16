import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'plants' | 'cart'

  if (page === 'plants') return <ProductList onNavigate={setPage} />;
  if (page === 'cart') return <CartItem onNavigate={setPage} />;

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <p className="tagline">Tempat terbaik untuk tanaman hias favorit Anda</p>
        <button className="get-started-button" onClick={() => setPage('plants')}>
          Mulai
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
