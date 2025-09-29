import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar'; 
import Homepage from './pages/HomePage';
import Footer from './components/footer';
import Rooms from './pages/RoomOptions/rooms';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { UserProvider } from './context/user_context';
// import Aboutus from './pages/AboutUs/aboutus';


function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Rooms />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
            {/* <Route path="/about" element={<Aboutus />} /> */}
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
