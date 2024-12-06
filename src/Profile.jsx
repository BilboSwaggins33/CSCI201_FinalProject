import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


function Profile() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post' },
    { id: 2, title: 'Post' },
    { id: 3, title: 'Post' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
    console.log("Is Editing:", isEditing);
  };
  const handleCloseModal = () => {
    setIsEditing(false);
  };
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    school: '',
    posts: [],
  });

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  

  return (
    
        <div className="Profile">
        
            
               
            <header className="profile-header">Profile</header>
            <div className="profile-content">
                
                <div className="profile-info">
                <div className="profile-image-container">
                    <img
                    src="path-to-default-image.jpg"
                    alt="profile pic?"
                    className="profile-image"
                    />
                    <button className="edit-icon" onClick={handleEditClick}>✎</button>
                </div>
                <p className="profile-name">Name</p>
                <p className="profile-username">username</p>
                <p className="profile-school">University of Southern California</p>
                </div>

                
                <div className="profile-details">
                <div className="user-info">
                    <p>Username: username</p>
                    <p>Password: trojans1</p>
                    <p>School: University of Southern California</p>
                </div>
                <div className="posts-section">
                    {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        onDelete={() => handleDelete(post.id)}
                        onEdit={() => {handleEditClick(post.id)}}
                    />
                    ))}
                </div>
                </div>
                {isEditing && <Modal onClose={handleCloseModal} />}
            </div>
           
           
        </div>
    
  );
}

function PostCard({ title, onDelete, onEdit }) {
  return (
    <div className="post-card">
      <p>{title}</p>
      <div className="post-actions">
        <button onClick={onDelete}>🗑️</button>
        <button >✎</button>
      </div>
    </div>
  );
}



function Modal({ onClose }) {

    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
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
        navigate('/sign-in');
        
        const jsonData = JSON.stringify(formData);
        console.log('User Registration Data:', jsonData);
        onClose();
      } else {
        alert('Please fill out the fields correctly.');
      }
    };
  
    return (
      <div className="Modal-overlay">
        <div className="Modal">
          <h3>To edit your account, enter new information below</h3>
          <form onSubmit={onSubmit}>
            <div className="Form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First"
                required
              />
            </div>
            <div className="Form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last"
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
  
  
            <button className="Button2" type="submit">Submit</button>
          </form>
          <button className="Close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

export default Profile;