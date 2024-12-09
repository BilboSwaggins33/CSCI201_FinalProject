import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';

const Home = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate(); 


  //const userId = localStorage.getItem('userId');

  useEffect(() => {
    // if (!userId) {
    //   console.error("No userId found in localStorage. Redirect to sign-in page.");
    //   // In a real app, you might redirect or handle the missing userId case here.
    //   return;
    // }

    // const fetchPosts = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/post/all', {
    //       method: 'GET',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ username, password }),
    //     });
  
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       setPostData(data);
    //     } 
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     setErrorMessage('Error.');
    //   }
    // };
      
 

    // Hardcoded test data
    const testData = [
      {
        id: 1,
        name: "Example Cafe",
        address: "123 Main St, Somewhere, USA",
        rating: 3.1,
        description: "A great place to grab a coffee.",
        views: 234,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-08-05 09:30:34"
      },
      {
        id: 2,
        name: "About Time",
        address: "456 Elm St, Anytown, USA",
        rating: 4.2,
        description: "Delicious lattes and friendly staff.",
        views: 512,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-12-09 09:30:34"
      },
      {
        id: 3,
        name: "MemoryLook",
        address: "456 Elm St, Anytown, USA",
        rating: 5,
        description: "Delicious lattes and friendly staff.",
        views: 300,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-11-07 09:30:34"
      },
      {
        id: 4,
        name: "Olive X James",
        address: "456 Elm St, Anytown, USA",
        rating: 2,
        description: "Delicious lattes and friendly staff.",
        views: 800,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-12-05 09:30:34"
      },
      {
        id: 5,
        name: "Stagger Coffee",
        address: "456 Elm St, Anytown, USA",
        rating: 4.6,
        description: "Delicious lattes and friendly staff.",
        views: 1000,
        ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        Time: "2024-11-08 09:30:34"
      }
    ];
    const sortedData = [...testData].sort((a, b) => new Date(b.Time) - new Date(a.Time));


    setPostData(sortedData);

  }, []);//, [userId]

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
                    <button className="Button" style={{marginRight:'10px'}}>Post Spot</button>
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
                {/* <button
                  className="px-5 py-2 w-full text-neutral-800 text-sm font-body rounded hover:bg-gray-200 text-left"
                  onClick={() => {
                    setSortMode("Recently posted");
                    //setDropdownVisible(false);
                    //let sortedPosts = posts.sort((a, b) => new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime());
                    let sortedPosts = postData.sort((a, b) => a.name.localeCompare(b.name));
                    setPostData(sortedPosts);
                  }}
                >
                  A-Z ASC
                </button>
                <button
                  className="px-5 py-2 w-full text-neutral-800 text-sm font-body rounded hover:bg-gray-200 text-left"
                  onClick={() => {
                    setSortMode("Popular");
                    //setDropdownVisible(false);
                    //let sortedPosts = posts.sort((a, b) => (b.comment_count - a.comment_count));
                    let sortedPosts = postData.sort((a, b) => b.name.localeCompare(a.name));
                    setPostData(sortedPosts);
                  }}
                >
                  A-Z DESC
                </button> */}
          <p style={{ margin: '5px 0', fontSize: '17px', color: '#999' }}>
                Sort By
              </p>
          <select
             style={{
              border: '1px solid #ccc', // Light gray border
              borderRadius: '5px', // Rounded corners
              padding: '10px 20px', // Padding (equivalent to px-5 py-2)
              backgroundColor: '#ffffff', // White background
              color: '#555', // Neutral text color
              fontSize: '14px', // Small text (equivalent to text-sm)
              fontFamily: 'Arial, sans-serif', // Replace 'font-body' with a common font
              cursor: 'pointer', // Pointer cursor for interactivity
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
                const sortedPosts = [...postData].sort((a, b) => new Date(b.Time) - new Date(a.Time));
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
        //flexWrap: 'nowrap', 
        alignItems: 'center',
        //flexWrap: 'wrap', 
        gap: '20px', 
        marginTop: '20px', 
        height: '650px',
        width: '800px', 
        overflowY: 'scroll',
        width: '100%'
        }}>
        {postData.map(post => (
          <div 
            key={post.id} 
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
                alt={post.name} 
                style={{ width: '100%' , height: '100%' }} 
              />
            </div>
            <div style={{ padding: '15px' }}>
              <h2 style={{ margin: '10px 0' }}>{post.name}</h2>
              <p style={{ margin: '5px 0', color: '#555' }}>{post.address}</p>
              <p style={{ margin: '5px 0' }}>
                <strong>Rating:</strong> {post.rating}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#999' }}>
                Views: {post.views}
              </p>
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

                    //setDropdownVisible(false);
                    //let sortedPosts = posts.sort((a, b) => new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime());
                  }}
                >
                  Cafe Details
                </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
