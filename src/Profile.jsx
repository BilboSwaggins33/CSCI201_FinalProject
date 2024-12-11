import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


function Profile() {

  const [posts, setPosts] = useState([]);

  const [userInfo, setUserInfo] = useState();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {


    const fetchUserData = async () => {
      // NOTE: Remove hardcoded id in the future
      const userId = localStorage.getItem('userId');
	  console.log("id:" +userId);
      // NOTE: For now, this code fetches and stores in localStorage
      // Will remove in the future once login functionality is finished
      fetch(`http://localhost:8080/user/id/${userId}`, {
        method: "GET",
      }).then((response) => response.json()).then((data) => {
        setUserInfo(data);
      });



      // NOTE: Can change this implementation later.
      fetch(`http://localhost:8080/post/all`, {
        method: "GET",
      }).then((response) => response.json()).then((data) => {
        const userPosts = data.filter((post, idx) => (post.user.id == userId));
        setPosts(userPosts);
        console.log(data);
      });

    }

    fetchUserData();


  }, []);


  const handleEditClick = () => {
    setIsEditing(true);
    console.log("Is Editing:", isEditing);
  };
  const handleCloseModal = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };


  // <button className="edit-icon" onClick={handleEditClick}>✎</button>


  return (

    <div className="Profile">
      <header className="profile-header">Profile</header>
      <div className="profile-content">

        <div className="profile-info">
          <div className="profile-image-container">
            {/*<img
              src="path-to-default-image.jpg"
              alt="profile pic?"
              className="profile-image"
            />*/}
          </div>
          <p className="profile-name"></p>
          <p className="profile-username">{userInfo?.fname} {userInfo?.lname}</p>
          <p className="profile-school">{userInfo?.university}</p>
        </div>


        <div className="profile-details">
          <div className="user-info">
            <h2>User Information</h2>
            <div className="profile-row">
              <span>First Name</span>
              <p>{userInfo?.fname}</p>
            </div>

            <div className="profile-row">
              <span>Last Name</span>
              <p>{userInfo?.lname}</p>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <p>{userInfo?.email}</p>
            </div>

            <div className="profile-row">
              <span>Password</span>
              <p>{userInfo?.password}</p>
            </div>

            <div className="profile-row">
              <span>University</span>
              <p>{userInfo?.university}</p>
            </div>


            <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
          </div>
          <div className="posts-section">
            {posts.map((post, idx) => (
              <PostCard
                key={post.postId}
                postId={post.postId}
                title={post.name}
                onDelete={() => handleDelete(post.postId)}
                onEdit={() => { handleEditClick(post.postId) }}
              />
            ))}
          </div>
        </div>
        {isEditing && <Modal data={userInfo} onClose={handleCloseModal} />}
      </div>


    </div>

  );
}

function PostCard({postId, title, onDelete, onEdit }) {
  return (
    <Link to={`/post/${postId}`}>
    <div className="post-card">
      <p>{title}</p>
      <div className="post-actions">
        <button onClick={onDelete}>🗑️</button>
        <button >✎</button>
      </div>
    </div>
    </Link>
  );
}



function Modal({ data, onClose }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState(data);

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
      // navigate('/sign-in');
      const jsonData = JSON.stringify(formData);
      console.log('User Registration Data:', jsonData);
      const userId = data.id;
      fetch("http://localhost:8080/user/update", {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json()).then((resp) => {
        console.log(resp);
        onClose();
      });
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
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First"
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
            />
          </div>




          <button className="Button2" type="submit">Save</button>
        </form>
        <button className="Close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Profile;
