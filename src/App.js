
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

function App() {
  const [isSigningUp, setIsSigningUp] = useState(false);


  const handleSignUpClick = () => {
    setIsSigningUp(true);
  };

  const handleCloseModal = () => {
    setIsSigningUp(false);
  };

  return (
 
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <p>CAFE LA</p>
                </header>
                <div className="App-body">
                  <Link to="/sign-in">
                    <button className="Button">Sign In</button>
                  </Link>
                  <button className="Button" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                  </div>
                {isSigningUp && <Modal onClose={handleCloseModal} />}
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

function Modal({ onClose }) {

  const navigate = useNavigate(); 

  const onSubmit = (e) => {
    e.preventDefault(); 
    const formValid = document.querySelector('form').checkValidity();
    if (formValid) {
      navigate('/sign-in');
      onClose();
    } else {
      alert('Please fill out the fields correctly.');
    }
  };

  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <h3>To create your account, enter your information below</h3>
        <form onSubmit={onSubmit}>
          <div className="Form-group">
            <label>First Name:</label>
            <input type="text" placeholder="First" required/>
          </div>
          <div className="Form-group">
            <label>Last Name:</label>
            <input type="text" placeholder="Last" required />
          </div>
          <div className="Form-group">
            <label>Email:</label>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="Form-group">
            <label>Username:</label>
            <input type="text" placeholder="User" required />
          </div>
          <div className="Form-group">
            <label>Password:</label>
            <input type="password" placeholder="************"required  />
          </div>


          <button className="Button2" type="submit">Submit</button>
        </form>
        <button className="Close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default App;
