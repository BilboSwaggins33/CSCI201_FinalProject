import logo from '../logo.svg';
import '../App.css';
import './MapPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';



function MapPage() {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const userInfo = localStorage.getItem('userInfo');



  console.log("Map Page Component Rendered");

  //for getting all posts
  useEffect(() => {
    if (!userInfo) {
      setLoggedIn(false);
    }
    else {
      setLoggedIn(true);
    }

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
          const sortedData = [...data].sort((a, b) => new Date(b.Time) - new Date(a.Time));
          setPostData(sortedData);
        }
      } catch (error) {
        console.error('Error during getting post:', error);
      }
    };
    fetchPosts();

  }, []);

  function signOut() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    navigate('/');
  }

  async function incrementView(postId) {
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



  const defaultIcon = new Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [45, 45], // size of the icon
    iconAnchor: [22.5, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
  })
  return (
    <div className='MapPage'
    >
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
          <Link to="/home">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Home</button>
          </Link>

          {isLoggedIn ? (
            <div>
              <Link to="/addpost">
                <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Post</button>
              </Link>
              <Link to="/Profile">
                <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Profile</button>
              </Link>
              <Link to="/">
                <button className="Button" style={{ borderRadius: '30px', color: 'white' }} onClick={() => signOut()}>Sign Out</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/sign-in">
                <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Sign In</button>
              </Link>

              <Link to="/" >
                <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Sign Up</button>
              </Link>
            </div>
          )}


        </div>
      </div>





      {/* <div className='TopBar'>
      
       <div className='Search'>
        <form action="SearchServlet">
            Sort By: 
            <select id="sortby">
              <option value="0">Surprise Me</option>
              <option value="1">Distance (Close->Far)</option>
              <option value="2">Distance (Far->Close)</option>
              <option value="3">Ratings (High->Low)</option>
              <option value="4">Ratings (Low->High)</option>
              <option value="5">Views (High->Low)</option>
              <option value="6">Views (Low->High)</option>
            </select>
            <input type="text" className="searchBar" placeholder='Address, Name, ...'/>
            <button className='submitButton' type="submit"><img width='20px' height='20px' src='search.png' alt='Search'></img></button>
        </form>
        </div>
      </div> */}
      <div className="Map">
        <MapContainer center={[34.02235633613326, -118.28512377318303]} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {postData.map((post) => (
            <Marker
              key={post.postId}
              position={[post.latitude, post.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div>
                  <h3>{post.name}</h3>
                  <br />
                  Address: {post.address}
                  <br />
                  Ratings: {post.rating}
                  <br />
                  Views: {post.views}
                  <br />
                  <Link to={`/post/${post.postId}`}>
                    <button
                      style={{
                        alignItems: 'flex-end',
                        backgroundColor: '#cee7f1',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'black',
                        borderRadius: '2px',
                        padding: '3px'
                      }}
                      onClick={() => {
                        incrementView(post.postId);
                      }}
                    >
                      Cafe Details
                    </button>

                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}


        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
