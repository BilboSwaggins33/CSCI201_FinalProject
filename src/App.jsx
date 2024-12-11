
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignIn from './Sign-in/SignIn';
import Profile from './Profile/Profile';
import Home from './Dashboard/Home';
import Post from './AddPost/Post';
import MapPage from './Maps/MapPage';
import AddPost from './AddPost/AddPost';
import EditPost from './EditPost/EditPost';
import Moda from './Modal/Moda';




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
                  <div class="typewriter">
                    <p>CAFE LA</p>
                  </div>
                </header>
                <div className="App-body">
                  <div className="main">
                    <div className="rowButton">
                      <Link to="/sign-in">
                        <button className="Button" id="sign">Sign In</button>
                      </Link>
                      <button className="Button" id="up" onClick={handleSignUpClick}>
                        Sign Up
                      </button>
					  <Link to="/home">
                        <button className="Button" id="guest">Guest Access</button>
                      </Link>
                    </div>
                    
                  </div>
                  </div>
                {isSigningUp && <Moda onClose={handleCloseModal} />}
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



export default App;
