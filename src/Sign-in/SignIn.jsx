import React, { useEffect, useState } from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function SignIn() {
    console.log("SignIn Component Rendered");
    return (
        
        <div className="SignIn">
             <header className="App-header">
                <p>CAFE LA</p>
            </header>
            <div className="App-body">
                <div className="SignInFields">
                    <label className="FieldLabel">Username:</label>
                    <input className="InputField" type="text" placeholder="Username" />
                
                
                    <label className="FieldLabel">Password:</label>
                    <input className="InputField" type="password" placeholder="************" />
                </div>
                
            </div>
            
        </div>
    );
};

export default SignIn;