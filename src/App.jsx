
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import Profile from './Profile';
import Home from './Home';
import Post from './Post';
import MapPage from './MapPage';
import AddPost from './AddPost';
import EditPost from './EditPost';


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
                  <Link to="/home">
                    <button className="Button">Guest Access</button>
                  </Link>
                  
                  </div>
                {isSigningUp && <Modal onClose={handleCloseModal} />}
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/post/:postID" element={<Post />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:postID" element={<EditPost />} />



        </Routes>
      </div>
      </Router>

  );
}

function Modal({ onClose }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fname: '',
    lname: '',
    university: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formValid = document.querySelector('form').checkValidity();
    if (formValid) {
      

      const jsonData = JSON.stringify(formData);
      console.log('user registration data:', jsonData);
      const registerUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/user/register',{
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData,
        }
          );
    
          const data = await response.json();
    
          if (response.ok) {
            console.log(data);
          } 
        } catch (error) {
          console.log('Error during getting post:', error);
        }
      };
      
      registerUser();
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
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User"
              required
            />
          </div>
          <div className="Form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="************"
              required
            />
          </div>
          <div className="Form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="Form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First"
              required
            />
          </div>
          <div className="Form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last"
              required
            />
          </div>
          <div className="Form-group">
            <label>University:</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University"
              required
            />
          </div>



          <button className="Button2" type="submit">Submit</button>
        </form>
        <button className="Close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default App;
