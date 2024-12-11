import React, { useEffect, useState } from 'react';
import './AddPost.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


const AddPost = ({ existingPost, onSave }) => {

  const [cafeName, setCafeName] = useState(existingPost?.cafeName || '');
  const [address, setAddress] = useState(existingPost?.address || '');
  const [coords, setCoords] = useState(existingPost?.coords || '');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [images, setImages] = useState(existingPost?.images || []);
  const [rating, setRating] = useState(existingPost?.rating || '');
  const [description, setDescription] = useState(existingPost?.description || '');
  const [instructions, setInstructions] = useState(existingPost?.instructions || '');
  const [thoughts, setThoughts] = useState(existingPost?.thoughts || '');


  const handleCoordsChange = (event) => {
    setCoords(event.target.value);

  };


  const handleLocationClick = async () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          // Replace with Google Maps API call if necessary
          setCoords(`Latitude: ${latitude}, Longitude: ${longitude}`);

        },

        (error) => {
          alert('Unable to retrieve your location.');
        }
      );

    } else {
      alert('Geolocation is not supported by your browser.');
    }

  };


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    if (!cafeName || !address || !coords || !rating || !description || !instructions || !thoughts) {
      alert('Please fill out all required fields.');
      return;
    }



    // onSave(postData);

    const parts = coords.split(',');
    const latitudePart = parts[0].split(':')[1].trim();
    const longitudePart = parts[1].split(':')[1].trim();

    // const user = localStorage.getItem("userInfo");
    // NOTE: hardcoded user for now
    const currentTimestamp = new Date().toISOString();
    const body = {
      "name": cafeName,
      "address": address,
      "imageArray": "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
      "user": {
        "id": 1
      },
      "latitude": parseFloat(latitudePart),
      "longitude": parseFloat(longitudePart),
      "description": description,
      "rating": rating,
      "directions": instructions,
      "ambiance": thoughts,
      "views": 1,
      "time": currentTimestamp
    }

    console.log(body);

    fetch("http://localhost:8080/post/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(error => {
      alert(error);
    })
    .then((data) => {
      alert('Post saved successfully!');
      window.location.href = "./home";
    })



  };


  return (

    <div className="add-post-container">
      <h2>{existingPost ? 'Edit Post' : 'Add a New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cafe Name *</label>
          <input
            type="text"
            value={cafeName}
            onChange={(e) => setCafeName(e.target.value)}
            placeholder="Type here..."

          />

        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address..."
          />

        </div>


        <div className="form-group">
          <label>Geolocation *</label>
          <div className="address-group">

            <input
              type="text"
              value={coords}
              onChange={handleCoordsChange}
              placeholder="Geolocation..."
            />

            <button type="button" className="location-button" onClick={handleLocationClick}>
              Get current location
            </button>

          </div>

        </div>


        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          <div className="image-preview">
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Uploaded ${index + 1}`} />
            ))}
          </div>

        </div>


        <div className="form-group">
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">1-10</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here..."
          ></textarea>
        </div>


        <div className="form-group">
          <label>Directions/Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="How to get there..."
          ></textarea>

        </div>


        <div className="form-group">
          <label>Ambiance/Vibe</label>
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            placeholder="Thoughts..."
          ></textarea>

        </div>


        <button type="submit">Save post</button>

      </form>

    </div>

  );

};


export default AddPost;
