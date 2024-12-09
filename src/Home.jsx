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
    // let allPosts;

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
    // const fetchPosts = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/post/all'
    //     });
  
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       allPosts = data;
    //     } 
    //   } catch (error) {
    //     console.error('Error during getting post:', error);
    //     setErrorMessage('Error.');
    //   }
    // };
 

    // Hardcoded test data
    const allPosts = [
      {
        PostID: 1,
        Name: "Example Cafe",
        Address: "123 Main St, Somewhere, USA",
        Rating: 3.1,
        description: "A great place to grab a coffee.",
        Views: 234,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-08-05 09:30:34"
      },
      {
        PostID: 2,
        Name: "About Time",
        Address: "456 Elm St, Anytown, USA",
        Rating: 4.2,
        description: "Delicious lattes and friendly staff.",
        Views: 512,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-12-09 09:30:34"
      },
      {
        PostID: 3,
        Name: "MemoryLook",
        Address: "456 Elm St, Anytown, USA",
        Rating: 5,
        description: "Delicious lattes and friendly staff.",
        Views: 300,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-11-07 09:30:34"
      },
      {
        PostID: 4,
        Name: "Olive X James",
        Address: "456 Elm St, Anytown, USA",
        Rating: 2,
        description: "Delicious lattes and friendly staff.",
        Views: 800,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-12-05 09:30:34"
      },
      {
        PostID: 5,
        Name: "Stagger Coffee",
        Address: "456 Elm St, Anytown, USA",
        Rating: 4.6,
        description: "Delicious lattes and friendly staff.",
        Views: 1000,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-11-08 09:30:34"
      }
    ];
    const sortedData = [...allPosts].sort((a, b) => new Date(b.Time) - new Date(a.Time));


    setPostData(sortedData);

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
          <Link to="/Profile">
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
                const sortedPosts = [...postData].sort((a, b) => a.Name.localeCompare(b.Name));
                console.log("After sorting:", sortedPosts);
                setPostData(sortedPosts); 
              } else if (selectedValue === "ZA") {
                const sortedPosts = [...postData].sort((a, b) => b.Name.localeCompare(a.Name));
                console.log("After sorting:", sortedPosts);
                setPostData(sortedPosts); 
              }
              else if (selectedValue === "recentPost") {
                const sortedPosts = [...postData].sort((a, b) => new Date(b.Time) - new Date(a.Time));
                console.log("After sorting:", sortedPosts);
                setPostData(sortedPosts); 
              }
              else if (selectedValue === "highRated") {
                const sortedPosts = [...postData].sort((a, b) => b.Rating - a.Rating);
                console.log("After sorting:", sortedPosts);
                setPostData(sortedPosts); 
              }
              else if (selectedValue === "popular") {
                const sortedPosts = [...postData].sort((a, b) => b.Views - a.Views);
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
            key={post.PostID} 
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
                src={post.ImageArray} 
                alt={post.Name} 
                style={{ width: '100%' , height: '100%' }} 
              />
            </div>
            <div style={{ padding: '15px' }}>
              <h2 style={{ margin: '10px 0' }}>{post.Name}</h2>
              <p style={{ margin: '5px 0', color: '#595959' }}>{post.Address}</p>
              <p style={{ margin: '5px 0' }}>
                <strong>Rating:</strong> {post.Rating}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#a3a2a2' }}>
                Views: {post.Views}
              </p>
              <Link to={`/post/${post.PostID}`}>
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
