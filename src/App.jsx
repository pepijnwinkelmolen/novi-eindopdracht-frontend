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
import {useContext, useState} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
  const { isAuth } = useContext(AuthContext);
  const [advertisementList, setAdvertisementList] = useState([]);

  return (
      <>
          <NavBar setAdvertisementList={setAdvertisementList}/>
          <Routes>
              <Route path="/home" element={<HomePage advertisementList={advertisementList} setAdvertisementList={setAdvertisementList}/>}/>
              <Route path="/register" element={isAuth ? <Navigate to={"/home"}/> : <Register/>}/>
              <Route path="/login" element={isAuth ? <Navigate to={"/home"}/> : <Login/>}/>
              <Route path="/profile" element={<Navigate to={"/home"}/>}/>
              <Route path="/profile/:id" element={!isAuth ? <Navigate to={"/home"}/> : <Profile/>}/>
              <Route path="/advertise" element={!isAuth ? <Navigate to={"/home"}/> : <Advertise/>}/>
              <Route path="/product" element={<Navigate to={"/home"}/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
          <Footer/>
      </>
  )
}

export default App;
