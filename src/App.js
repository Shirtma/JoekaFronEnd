import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/HomePage";
import Footer from "./components/footer";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { UserProvider } from "./context/user_context";
import { ProductsProvider } from "./context/products_context";
import CartPage from "./pages/ShopOptions/CartPage";
import ProductDetail from "./pages/ShopOptions/ProductDetail";
import CheckoutPage from "./pages/ShopOptions/CheckoutPage";
import OrderSuccessPage from "./pages/ShopOptions/OrderSuccessPage";
import Shop from "./pages/ShopOptions/shop";
import Signup2 from "./pages/signup2";
import AccountPage from "./pages/Account/AccountPage";
// import Aboutus from "./pages/Aboutus";

function App() {
  return (
    <>
      <UserProvider>
        <ProductsProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/register/details" element={<Signup2 />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<AccountPage />} />
              <Route path="/account/profile" element={<AccountPage />} />
            </Routes>
            <Footer />
          </Router>
        </ProductsProvider>
      </UserProvider>
    </>
  );
}

export default App;
