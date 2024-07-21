// App.js
import './App.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Error from './pages/Error';
import SignUpp from './pages/SignUpp';
import SignInn from './pages/SignInn';
import Footer from './Components/Footer';

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-up" element={<SignUpp />} />
        <Route path="/sign-in" element={<SignInn />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
