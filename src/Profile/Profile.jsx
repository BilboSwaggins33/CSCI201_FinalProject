import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


function Profile() {

  const [posts, setPosts] = useState([]);

  const [userInfo, setUserInfo] = useState();

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {


    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      console.log("id:" + userId);
      // NOTE: For now, this code fetches and stores in localStorage
      // Will remove in the future once login functionality is finished
      try {
        fetch(`http://localhost:8080/user/id/${userId}`, {
          method: "GET",
        }).then((response) => response.json()).then((data) => {
          setUserInfo(data);
        });



        // NOTE: Can change this implementation later.
        fetch(`http://localhost:8080/post/all`, {
          method: "GET",
        }).then((response) => response.json()).then((data) => {
          const userPosts = data.filter((post) => String(post.user.id) === String(userId));
          setPosts(userPosts);
          console.log(data);
        });
      } catch (error) {
        console.error('Error during getting post:', error);
      }

    }

    fetchUserData();


  }, []);

  function signOut() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    navigate('/');
  }


  const handleEditClick = () => {
    setIsEditing(true);
    console.log("Is Editing:", isEditing);
  };
  const handleCloseModal = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handleDelete = (postId) => {
    const deletePost = async (postId) => {
      try {
        const response = await fetch(`http://localhost:8080/post/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete post. Status: ${response.status}`);
        }

      } catch (error) {
        console.error('Error during getting post:', error);
      }
    }
    console.log("deleting " + postId);

    deletePost(postId);
    window.location.reload();


  };


  // <button className="edit-icon" onClick={handleEditClick}>✎</button>


  return (

    <div className="Profile">
      <div style={{
        marginTop: '0px',
        width: '100%',
        height: '120px',
        overflow: 'hidden',
        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor: '#cee7f1',
        boxSizing: ' border-box'
      }}>
        <div className="typewriter" style={{
          marginLeft: '70px',
          marginTop: '30px',
          fontSize: '60px',
          maxWidth: 'fit-content',
          whiteSpace: 'nowrap',
          borderRight: '2px solid #581c14',
          paddingRight: '10px',
        }}>
          <p>Profile</p>
        </div>
        <div style={{
          position: 'absolute',
          right: '30px',
          top: '34.5px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>


          <Link to="/home">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Home</button>
          </Link>
          <Link to="/map">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Map</button>
          </Link>
          <Link to="/addpost">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Post</button>
          </Link>
          <Link to="/">
            <button className="Button" style={{ borderRadius: '30px', color: 'white' }} onClick={() => signOut()}>Sign Out</button>
          </Link>
        </div>
      </div>

      <div className="background-prof">
      </div>

      <div className="profile-content">

        <div className="profile-details">
          <div className="user-info">
            <h2 style={{ fontFamily: 'Courier New' }}>User Information</h2>
            <div className="profile-row-container">
              <div className="profile-row">
                <span>First Name</span>
                <p>{userInfo?.fname}</p>
              </div>

              <div className="profile-row">
                <span>Last Name</span>
                <p>{userInfo?.lname}</p>
              </div>

              <div className="profile-row">
                <span>Username</span>
                <p>{userInfo?.username}</p>
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

            </div>


            <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
          </div>
        </div>

        <div className="posts-section-container">
          <h2 className="your-posts">Your Posts</h2>
          <div className="posts-section">
            {posts.map((post, idx) => (
              <PostCard
                key={idx}
                postId={post.postId}
                title={post.name}
                onDelete={() => handleDelete(post.postId)}
                onEdit={() => { handleEditClick(post.postId) }}
              />
            ))}
          </div>
        </div>


      </div>

      {isEditing && <Modal data={userInfo} onClose={handleCloseModal} />}


    </div >

  );
}

function PostCard({ postId, title, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  }

  const handleEdit = (e) => {
    onEdit();
    e.preventDefault();
    e.stopPropagation();
    navigate(`/editpost/${postId}`);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  }

  return (
    <div className="post-card-prof" onClick={handleClick}>
      <p>{title}</p>
      <div className="post-actions-prof">
        <button onClick={handleDelete}>🗑️</button>
        <button onClick={handleEdit}>✎</button>
      </div>

    </div>

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
        localStorage.setItem('userInfo', resp);
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


