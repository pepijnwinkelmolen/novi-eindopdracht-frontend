import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from "./context/AuthContext.jsx";
import LoaderContextProvider from "./context/LoaderContext.jsx";

createRoot(document.getElementById('root')).render(
      <Router>
          <LoaderContextProvider>
               <AuthProvider>
                    <App />
               </AuthProvider>
          </LoaderContextProvider>
      </Router>
)
