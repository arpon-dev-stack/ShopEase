import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Categorie from './pages/Categorie'
import Deal from './pages/Deal';

function App() {
  // const [cartItems, setCartItems] = useState([]);

  // const handleAddToCart = (product) => {
  //   setCartItems(prevItems => {
  //     const existingItem = prevItems.find(item => item.id === product.id);
  //     if (existingItem) {
  //       return prevItems.map(item =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + (product.quantity || 1) }
  //           : item
  //       );
  //     }
  //     return [...prevItems, { ...product, quantity: product.quantity || 1 }];
  //   });
  // };

  // const handleRemoveItem = (productId) => {
  //   setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  // };

  // const handleUpdateQuantity = (productId, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(prevItems =>
  //     prevItems.map(item =>
  //       item.id === productId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  return (
    <Router>
      <div className="min-w-[280px] max-w-[1400px] mx-auto flex flex-col">
        <Header/>
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<ProductList/>} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<CartPage/>}/>
            <Route path='/categories' element={<Categorie />} />
            <Route path='/deals' element={<Deal />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;