import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import Checkout from './pages/Checkout';
import { useSelector, useDispatch } from 'react-redux';
import AuthModal from './components/AuthModal';
import { useEffect, useState, useRef } from 'react';
import { verifyToken, signupUser, signinUser } from './services/auth/authApi';
import AuthInput from './components/AuthInput';

function App() {

  const { user, token, isAuthenticated, popup } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const signInRef = useRef();
  const signUpRef = useRef();

  useEffect(() => {
    if (popup === 'signin') {
      signInRef.current?.showModal();
    } else if (popup === 'signup') {
      signUpRef.current?.showModal();
    }
  }, [popup])

  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token))
    }
  }, [token]);

  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const toggleModal = (ref, action) => {
    if (action === 'open') {
      ref.current.showModal()
    } else {
      ref.current?.close();
    }
  }
  const handleAuth = (auth) => {
    if (auth === 'signin') {
      console.log("signin")
      dispatch(signinUser({email: formData.email, password: formData.password}))
    } else {
      console.log("hello")
      dispatch(signupUser(formData));
    }
  }

  return (
    <Router>
      <div className="min-w-[280px] max-w-[1600px] mx-auto flex flex-col">
        <Header />
        <main className="w-full max-w-[1400px] flex-1 mx-auto px-4 py-5 z-30 shrink-0">
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path='/categories' element={<Categorie />} />
              <Route path='/deals' element={<Deal />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </ScrollToTop>
          <AuthModal
            dialogRef={signInRef}
            title="Sign In"
            onClose={() => { toggleModal(signInRef, 'close') }}
            switchModal={() => toggleModal(signUpRef, 'open')}
            switchText="Don't have an account? Sign Up"
            formSubmit={() => handleAuth('signin')}
          >
            <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </AuthModal>

          <AuthModal
            dialogRef={signUpRef}
            title="Create Account"
            onClose={() => toggleModal(signUpRef, 'close')}
            switchModal={() => toggleModal(signInRef, 'open')}
            switchText="Already have an account? Sign In"
            formSubmit={() => handleAuth('signup')}
          >
            <AuthInput type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </AuthModal>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;