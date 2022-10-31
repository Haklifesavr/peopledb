import logo from './logo.svg';
import './App.css';
import TableData from './components/TableData/TableData';
import DataTableDemo from './components/DataTable/DataTable';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import React, {useEffect, useState} from "react";
import CustomSnackbar from './components/SnackBar/SnackBar';

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  return (
    <Router>
      <div className="App">
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/signin" element={<Login setMessage={setErrorMessage} />} />
              <Route path="/signup" element={<Signup setMessage={setErrorMessage} />} />
              <Route path="/" element={<DataTableDemo setMessage={setErrorMessage} />} />
            </Routes>
            <CustomSnackbar
                message={errorMessage}
                setMessage={setErrorMessage}
              />
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App