import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer } from 'react-toastify';
import './ToastStyles.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          onCartClick={() => setShowCart(true)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </main>

        <Footer />

        <Cart
          show={showCart}
          handleClose={() => setShowCart(false)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
