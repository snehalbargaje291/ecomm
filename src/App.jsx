// App.js
import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import SignUpp from "./pages/SignUp";
import SignInn from "./pages/SignIn";
import Footer from "./Components/Footer";
import Checkout from "./pages/Checkout";
import { GlobalProvider } from "./context/GlobalState";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign-up" element={<SignUpp />} />
          <Route path="/sign-in" element={<SignInn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
