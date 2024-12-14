import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../App.css';
//import axios from 'axios';


const Home = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();


  const userInfo = localStorage.getItem('userInfo');
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(!userInfo){
      setLoggedIn(false);
    }
    else{
      setLoggedIn(true);
    }

    // if (!userId) {
    //   console.error("No userId found in localStorage. Redirect to sign-in page.");
    //   return;
    // }
    let allPosts;

    // const fetchPosts = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/post/all');

    //     if (response.status === 200) {
    //       allPosts = response.data; 
    //     }
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //     setErrorMessage('Error.');
    //   }
    // };

    //FETCH VERSION
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/post/all', {
          method: 'GET'
        }
        );
        const data = await response.json();
        if (response.ok) {
          const sortedData = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
          setPostData(sortedData);
        }
      } catch (error) {
        console.error('Error during getting post:', error);
      }
    };
    fetchPosts();

  }, []);

  function eachPosts({ title, onDelete, onEdit }) {
    return (
      <div className="post-card">
        <p>{title}</p>
        <div className="post-content">
          <button onClick={onDelete}>🗑️</button>
          <button >✎</button>
        </div>
      </div>
    );
  }

  function signOut() {
    localStorage.removeItem("userID");
	  localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    navigate('/');
  }

  async function incrementView(postId){
    try {
      const response = await fetch(`http://localhost:8080/post/incrementView/${postId}`, {
        method: 'PUT'
      });
      if (response.ok) {
        console.log(`View count incremented for postId: ${postId}`);
      } else {
        console.error(`Failed to increment view count. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during getting post:', error);
    }
  };

  return (
    <div  >
		<div class="background"> </div>
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
		
		<div class="typewriter" 	  style={{
				marginLeft: '70px',
				marginTop: '30px',
		        fontSize: '60px', 
		        maxWidth: 'fit-content',
		        whiteSpace: 'nowrap',
		        borderRight: '2px solid #581c14', 
		        paddingRight: '10px', 
		      }}>
           <p>CAFE LA</p>
         </div>
        <div style={{
            position: 'absolute',
             right: '100px',
             top: '40px',
             gap: '10px',
             display: 'flex',
			flexDirection: 'row'
        }}>
          <Link to="/map">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Map</button>
          </Link>

          {isLoggedIn ? (
            <div>
          <Link to="/addpost">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white'  }}>Post</button>
          </Link>
            <Link to="/Profile">
                      <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Profile</button>
            </Link>
            <Link to="/">
                      <button className="Button" style = {{borderRadius: '30px', color: 'white' }} onClick= {() => signOut()}>Sign Out</button>
            </Link>
          </div>
          ):(
            <div>
            <Link to="/sign-in">
                    <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Sign In</button>
            </Link>
            
            <Link to="/" >
                      <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Sign Up</button>
            </Link>
          </div>
          )}
          
          
        </div>


      </div>

      <div style={{
        left: '500px',
        padding: '10px',
        backgroundColor: '#581c14',
        border: 'none ',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        width: '100%'

      }}>
	  <div
	    style={{
	      display: 'flex', // Makes children elements appear in the same row
	      alignItems: 'center', // Align items vertically
	      gap: '10px', // Add space between elements
	    }}
	  >
	  		<p style={{ margin: '5px 0', fontSize: '17px', color: 'white', fontFamily: '"Courier New", Courier, monospace', fontWeight: 'bold'}}>
	           Sort By: 
	         </p>
	         <select
	           style={{
	             border: '1px solid #ccc',
	             borderRadius: '5px',
	             padding: '6px 20px',
	             backgroundColor: '#ffffff',
	             color: '#555',
	             fontSize: '14px',
	             fontFamily: '"Courier New", Courier, monospace',
				 color: 'black',
	             cursor: 'pointer',
	           }}
	           onChange={(e) => {
	             console.log("Before sorting:", postData);
	             const selectedValue = e.target.value;
	             if (selectedValue === "AZ") {
	               const sortedPosts = [...postData].sort((a, b) => a.name.localeCompare(b.name));
	               console.log("After sorting:", sortedPosts);
	               setPostData(sortedPosts);
	             } else if (selectedValue === "ZA") {
	               const sortedPosts = [...postData].sort((a, b) => b.name.localeCompare(a.name));
	               console.log("After sorting:", sortedPosts);
	               setPostData(sortedPosts);
	             }
	             else if (selectedValue === "recentPost") {
	               const sortedPosts = [...postData].sort((a, b) => new Date(b.time) - new Date(a.time));
	               console.log("After sorting:", sortedPosts);
	               setPostData(sortedPosts);
	             }
	             else if (selectedValue === "highRated") {
	               const sortedPosts = [...postData].sort((a, b) => b.rating - a.rating);
	               console.log("After sorting:", sortedPosts);
	               setPostData(sortedPosts);
	             }
	             else if (selectedValue === "popular") {
	               const sortedPosts = [...postData].sort((a, b) => b.views - a.views);
	               console.log("After sorting:", sortedPosts);
	               setPostData(sortedPosts);
	             }
	           }}
	         >
	           <option value="recentPost">Recently Posted</option>
	           <option value="AZ">Alphabetical A-Z</option>
	           <option value="ZA">Alphabetical Z-A</option>
	           <option value="highRated">Highest Rated</option>
	           <option value="popular">Popularity</option>
	         </select>
	  </div>
       
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
        height: '650px',
        width: '800px',
        overflowY: 'scroll',
        width: '100%'
      }}>
        {postData.map(post => (
          <div
            key={post.postId}
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              width: '600px',
              height: '175px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#581c14',
              gap: '20px'
            }}
          >
            <div style={{ width: '170px', height: '170px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
              <img
                src={post.imageArray}
                alt={post.name}
                style={{ width: '100%', height: '100%' }}
                onError={(e) => { e.target.src = 'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'; }}
              />
            </div>
        	<div 	style={{
			          padding: '15px',
			          width: '300px',
			          color: 'white',
			          display: 'flex',
			          flexDirection: 'column', 
			          justifyContent: 'space-between', 
			        }}>
              <h2 style={{ margin: '8px 0', fontFamily: '"Courier New", Courier, monospace', fontWeight: 'bold', fontSize:'30px', whiteSpace: 'nowrap',
    overflow: 'hidden', 
    }}>{post.name}</h2>
              <p style={{ margin: '0px 0', color: '#f0f0f0' }}>{post.address}</p>
              <p style={{ margin: '5px 0' }}>
                <strong>Rating:</strong> {post.rating}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#dedede' }}>
                Views: {post.views}
              </p>
			        <div
			          style={{
			            display: 'flex',
                  flexDirection: 'row',
			            alignItems: 'center',
                  marginTop: '-40px',
                  marginLeft: '220px',
                  position: 'relative',
			          }}
			        >
                    <Link to={`/post/${post.postId}`} >
                      <button
                        style={{
                        marginTop: '0px',
                        marginLeft: 'auto',
                        backgroundColor: '#cee7f1',
                        border: 'none',
                        cursor: 'pointer', 
                        color: '#581c14',
                        fontFamily: '"Courier New", Courier, monospace',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        padding: '7px 12px', 
                        borderRadius: '14px',
                
                        }}
                        onClick={() => {
                          incrementView(post.postId);
                        }}
                      >
                        Details
                      </button>
                    </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
