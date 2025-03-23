import {Routes, Route, Router} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {

  return (
      <>
          <NavBar/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
          <Footer/>
      </>
  )
}

export default App;
