// import React from "react";
// import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// const testContainer = document.createElement("div");
// document.body.appendChild(testContainer);

// const clearContainer = () => {
//   testContainer.innerHTML = "";
// };

// clearContainer();
// render(
//   <BrowserRouter> 
//     <App />
//   </BrowserRouter>,
//   testContainer
// );


// //getting the checking of the frontend

// const header = testContainer.querySelector(".App-header p");
// console.assert(
//   header.textContent === "CAFE LA",
//   "no values"
// );

// const signInButton = testContainer.querySelector("a > .Button");
// console.assert(
//   signInButton && signInButton.textContent === "Sign In",
//   "Test 1 None"
// );

// const signUpButton = testContainer.querySelector(".Button:not(a > .Button)");
// console.assert(
//   signUpButton && signUpButton.textContent === "Sign Up",
//   "NO BUTTON DAEGh"
// );

// clearContainer();
// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   testContainer
// );


