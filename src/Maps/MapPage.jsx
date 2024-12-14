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

  useEffect(() => {
    if (!userInfo) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/post/all', {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          const sortedData = [...data].sort(
            (a, b) => new Date(b.Time) - new Date(a.Time)
          );
          setPostData(sortedData);
        }
      } catch (error) {
        console.error('Error during getting post:', error);
      }
    };
    fetchPosts();
  }, []);

  function signOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  const defaultIcon = new Icon({
    iconUrl:
      'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [45, 45],
    iconAnchor: [22.5, 45],
    popupAnchor: [0, -45],
  });

  return (
    <div id="root">
      {/* Header */}
      <div className="Header">
        <div className="typewriter" 	  style={{
	           marginLeft: '53px',
	           marginTop: '13px',
	           fontSize: '60px',
	           maxWidth: 'fit-content',
	           whiteSpace: 'nowrap',
	           borderRight: '2px solid #581c14',
	           paddingRight: '10px',
	         }}>
          <p>CAFE LA</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/home">
            <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Home</button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/addpost">
                <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Post</button>
              </Link>
              <Link to="/Profile">
                <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Profile</button>
              </Link>
              <Link to="/">
                <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }} onClick={() => signOut()}>
                  Sign Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Sign In</button>
              </Link>
              <Link to="/">
                <button className="Button"  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="Map">
        <MapContainer
          center={[34.02235633613326, -118.28512377318303]}
          zoom={15}
          scrollWheelZoom={true}
          className="leaflet-container"
        >
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
                  <h3 style={{fontFamily: '"Courier New", Courier, monospace', fontSize: '30px'}}> {post.name}</h3>
                  <p style = {{ marginTop: '0px'}}> {post.address}</p>
                  <p >Ratings: {post.rating}</p>
                  <p>Views: {post.views}</p>
                  <Link to={`/post/${post.postId}`}>
                    <button
                      style={{
                        backgroundColor: '#581c14',
						fontFamily: '"Courier New", Courier, monospace',
						fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#cee7f1',
                        borderRadius: '4px',
                        padding: '3px',
						fontSize: '13px'
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
