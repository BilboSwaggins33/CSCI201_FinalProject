import React, { useEffect, useState } from 'react';
import '../App.css';
import './sign-in.css';
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
				const user = JSON.stringify(data);
				const userObject = JSON.parse(user);
                localStorage.setItem('userInfo', user);
				console.log("user: " + user);
				localStorage.setItem('userId', userObject.id);
                navigate('/home');
            } else {
                setErrorMessage(data.message || 'Invalid username or password');
                alert(data.message || 'Inavlid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Error. Invalid username or password');
            alert("Invalid username or password.");
        }
    };

    return (

        <div className="SignIn">
            <header className="App-header">
				<div class="typewriter">
                   <p>CAFE LA</p>
                </div>
            </header>
            <div className="App-body">
				<form className="SignInFields" onSubmit={handleSubmit}>
				  <div className="FieldRow">
				    <label className="FieldLabel">Username:</label>
				    <input
				      className="InputField"
				      type="text"
				      placeholder="Username"
				      value={username}
				      onChange={(e) => setUsername(e.target.value)}
				      required
				    />
				  </div>
				  <div className="FieldRow">
				    <label className="FieldLabel">Password:</label>
				    <input
				      className="InputField"
				      type="password"
				      placeholder="******"
				      value={password}
				      onChange={(e) => setPassword(e.target.value)}
				      required
				    />
				  </div>
				  <button className="Button3" type="submit">
				    Sign In
				  </button>
				</form>


            </div>

        </div>
    );
}




export default SignIn;
