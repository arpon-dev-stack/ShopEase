import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Categorie from './pages/Categorie'
import Deal from './pages/Deal';
import ScrollToTop from './components/ScrollToTop';
import Profile from './pages/Profile';
import ProtectedComponent from './components/ProtectedComponent';

function App() {

  return (
    <Router>
      <div className="min-w-[280px] max-w-[1400px] mx-auto flex flex-col relative">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-5 z-30">
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path='/categories' element={<Categorie />} />
              <Route path='/deals' element={<Deal />} />
              <Route path='/profile' element={<ProtectedComponent><Profile /></ProtectedComponent>} />
            </Routes>
          </ScrollToTop>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;