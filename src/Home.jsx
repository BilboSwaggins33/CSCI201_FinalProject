import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';


const Home = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate(); 


  const userId = localStorage.getItem('userId');

  useEffect(() => {
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
        const response = await fetch('http://localhost:8080/post/all',{
          method: 'GET'
      }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          const sortedData = [...data].sort((a, b) => new Date(b.Time) - new Date(a.Time));
          setPostData(sortedData);
        } 
      } catch (error) {
        console.error('Error during getting post:', error);
      }
    };
    fetchPosts();


    //Hardcoded test data
    // const allPosts = [
    //   {
    //     postID: 1,
    //     name: "Example Cafe",
    //     address: "123 Main St, Somewhere, USA",
    //     rating: 3.1,
    //     description: "A great place to grab a coffee.",
    //     views: 234,
    //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //     time: "2024-08-05T09:30:34"
    //   },
    //   {
    //     postID: 2,
    //     name: "About Time",
    //     address: "456 Elm St, Anytown, USA",
    //     rating: 4.2,
    //     description: "Delicious lattes and friendly staff.",
    //     views: 512,
    //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //     time: "2024-12-09T09:30:34"
    //   },
    //   {
    //     postID: 3,
    //     name: "MemoryLook",
    //     address: "456 Elm St, Anytown, USA",
    //     rating: 5,
    //     description: "Delicious lattes and friendly staff.",
    //     views: 300,
    //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //     time: "2024-11-07T09:30:34"
    //   },
    //   {
    //     postID: 4,
    //     name: "Olive X James",
    //     address: "456 Elm St, Anytown, USA",
    //     rating: 2,
    //     description: "Delicious lattes and friendly staff.",
    //     views: 800,
    //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //     time: "2024-12-05T09:30:34"
    //   },
    //   {
    //     postID: 5,
    //     name: "Stagger Coffee",
    //     address: "1438 8th St, Los Angeles, USA",
    //     rating: 4.6,
    //     description: "Delicious lattes and friendly staff.",
    //     views: 1000,
    //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //     time: "2024-11-08T09:30:34"
    //   }
    // ];
    // const sortedData = [...allPosts].sort((a, b) => new Date(b.Time) - new Date(a.Time));
    // setPostData(sortedData);

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
    navigate('/'); 
  }



  return (
    <div >
      <div style={{
              marginTop: '0px',
              width: '100%',
              height: '150px',
              overflow: 'hidden',
              justifyContent: 'left',
              alignItems: 'center',
              backgroundColor: '#cee7f1',
              boxSizing:' border-box'
            }}>
        <h1 style={{
                marginLeft: '100px',
                fontSize: '60px',
                color: '#581c14'
              }}>CAFE LA </h1> 
        <div style={{
            position: 'absolute',
             right: '100px',
             top: '50px',
             gap: '10px',
        }}>
          <Link to="/map">
                    <button className="Button" style={{marginRight:'10px'}}>Map</button>
          </Link>
          <Link to="/Profile">
                    <button className="Button" style={{marginRight:'10px'}}>Post</button>
          </Link>
          <Link to="/Profile">
                    <button className="Button" style={{marginRight:'10px'}}>Profile</button>
          </Link>
          <Link to="/">
                    <button className="Button" onClick= {() => signOut()}>Sign Out</button>
          </Link>
          
        </div>


      </div>

      <div style= {{
        left: '500px',
        padding: '0.375rem 0.375rem 0.25rem 0.375rem',
        backgroundColor: '#ffffff',
        border: 'none ',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        width: '100%'
      
      }}>
          <p style={{ margin: '5px 0', fontSize: '17px', color: '#999' }}>
                Sort By
              </p>
          <select
             style={{
              border: '1px solid #ccc', 
              borderRadius: '5px',
              padding: '10px 20px', 
              backgroundColor: '#ffffff',
              color: '#555',
              fontSize: '14px', 
              fontFamily: 'Arial, sans-serif', 
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
      
      <div style={{ display: 'flex', 
        flexDirection: 'column' ,
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
              backgroundColor: '#cee7f1',
              gap: '40px'
            }}
          >
            <div style={{width: '170px', height:'170px' , backgroundColor: '#ffffff', overflow: 'hidden' }}>
              <img 
                src={post.imageArray} 
                alt={post.name}
                style={{ width: '100%' , height: '100%' }} 
                onError={(e) => { e.target.src = 'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'; }}
              />
            </div>
            <div style={{ padding: '15px' , width: '300px'}}>
              <h2 style={{ margin: '10px 0' }}>{post.name}</h2>
              <p style={{ margin: '5px 0', color: '#595959' }}>{post.address}</p>
              <p style={{ margin: '5px 0' }}>
                <strong>Rating:</strong> {post.rating}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#a3a2a2' }}>
                Views: {post.views}
              </p>
              <Link to={`/post/${post.postId}`}>
                <button
                    style={{
                      alignItems: 'flex-end',
                      backgroundColor: '#ffffff',
                      border: 'none' ,
                      cursor: 'pointer',
                      color: 'black',
                      borderRadius: '2px'
                    }}
                    onClick={() => {
                      // use axios to update post and increase view by one
                      
                    }}
                  >
                    Cafe Details
                  </button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
