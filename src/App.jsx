import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Advertise from "./pages/Advertise/Advertise.jsx";
import Product from "./pages/Product/Product.jsx";

function App() {
  return (
      <>
          <NavBar/>
          <Routes>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/advertise" element={<Advertise/>}/>
              <Route path="/product" element={<Product/>}/>
              <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
          <Footer/>
      </>
  )
}

export default App;
