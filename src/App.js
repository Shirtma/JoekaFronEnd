import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/HomePage";
import Footer from "./components/footer";
import Rooms from "./pages/RoomOptions/rooms";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { UserProvider } from "./context/user_context";
import ProductDetail from "./pages/RoomOptions/ProductDetail";
import { ProductsProvider } from "./context/products_context";
import CartPage from "./pages/RoomOptions/CartPage";
import CheckoutPage from "./pages/RoomOptions/CheckoutPage";
import OrderSuccessPage from "./pages/RoomOptions/OrderSuccessPage";
// import Aboutus from './pages/AboutUs/aboutus';

function App() {
  return (
    <>
      <UserProvider>
        <ProductsProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<Rooms />} />
              <Route path="/shop/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              {/* <Route path="/about" element={<Aboutus />} /> */}
            </Routes>
            <Footer />
          </Router>
        </ProductsProvider>
      </UserProvider>
    </>
  );
}

export default App;
