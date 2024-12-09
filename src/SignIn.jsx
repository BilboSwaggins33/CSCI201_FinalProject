import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:8080/user/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        
        localStorage.setItem('userInfo', JSON.stringify(data)); 
        navigate('/home'); 
      } else {
      
        setErrorMessage(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error.');
    }
};
    
    return (
        
        <div className="SignIn">
             <header className="App-header">
                <p>CAFE LA</p>
            </header>
            <div className="App-body">
                <form className="SignInFields" onSubmit={handleSubmit}>
                    <label className="FieldLabel">Username:</label>
                    <input
                        className="InputField"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="FieldLabel">Password:</label>
                    <input
                        className="InputField"
                        type="password"
                        placeholder="************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="Button3" type="submit">
                        Submit
                    </button>
                </form>
                    
            </div>
            
        </div>
    );
}




export default SignIn;
