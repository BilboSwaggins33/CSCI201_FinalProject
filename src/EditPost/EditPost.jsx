import React, { useEffect, useState } from 'react';
import './EditPost.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";


const EditPost = ({ existingPost, onSave }) => {
    const { postID } = useParams();
	const navigate = useNavigate();
	
  const [cafeName, setCafeName] = useState(existingPost?.cafeName || '');
  const [address, setAddress] = useState(existingPost?.address || '');
  const [coords, setCoords] = useState(existingPost?.coords || '');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [images, setImages] = useState(existingPost?.images || '');
  const [rating, setRating] = useState(existingPost?.rating || '');
  const [description, setDescription] = useState(existingPost?.description || '');
  const [instructions, setInstructions] = useState(existingPost?.instructions || '');
  const [thoughts, setThoughts] = useState(existingPost?.thoughts || '');
  const userId = localStorage.getItem('userId');
  const [views, setViews] = useState(existingPost?.views || '');

  const firebaseConfig = {
    apiKey: "AIzaSyCA3chR_hV2CFfeLKsASOlLZoVkqfX-O4g",
    authDomain: "cafela-6faa4.firebaseapp.com",
    projectId: "cafela-6faa4",
    storageBucket: "cafela-6faa4.firebasestorage.app",
    messagingSenderId: "670270706673",
    appId: "1:670270706673:web:10bdd53e67856580af6a50",
    measurementId: "G-0P5SPWNNGW"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  useEffect(() => {

    // const fetchPosts = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/post/${postID}');
    //     if (response.status === 200) {
    //       thePost = response.data; 
    //     }
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //     setErrorMessage('Error.');
    //   }
    // };


    //FETCH VERSION
    const fetchPosts = async () => {
        try {
            console.log(postID);
            const response = await fetch(`http://localhost:8080/post/${postID}`, {
                method: 'GET'
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                setCafeName(data.name || '');
                setAddress(data.address || '');
                setCoords(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
                setImages(data.imageArray || '');
                setRating(data.rating || '');
                setDescription(data.description || '');
                setInstructions(data.directions || '');
                setThoughts(data.ambiance || '');
                setViews(data.views || '')
            }
        } catch (error) {
            console.error('Error during getting post:', error);
        }
    };
    fetchPosts();

    // const data = 
    //       {
    //         postID: 5,
    //         name: "Stagger Coffee",
    //         address: "1438 8th St, Los Angeles, USA",
    //         rating: 4.6,
    //         description: "Delicious lattes and friendly staff.",
    //         views: 1000,
    //         imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
    //         time: "2024-11-08T09:30:34",
    //         ambiance: "Very good studyvibes",
    //       }
    //     ;
        // setCafeName(data.name || '');
        //         setAddress(data.address || '');
        //         setCoords(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
        //         setImages([data.imageArray] || '[]');
        //         setRating(data.rating || '');
        //         setDescription(data.description || '');
        //         setInstructions(data.directions || '');
        //         setThoughts(data.ambiance || '');




}, []);



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


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const uploadImage = async (file) => {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    };
  
    try {
      const url = await uploadImage(file);
      setImages(url);
      console.log("Files uploaded. Accessible URLs:", url);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
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
      "imageArray": images || "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
      "user": {
        "id": userId
      },
      "latitude": parseFloat(latitudePart),
      "longitude": parseFloat(longitudePart),
      "description": description,
      "rating": rating,
      "directions": instructions,
      "ambiance": thoughts,
      "views": views,
      "time": currentTimestamp
    }

    console.log(body);

    fetch(`http://localhost:8080/post/edit/${postID}`, {
      method: "PUT",
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
       window.location.href = "/home";
    })



  };


  return (

    <div className="add-post-container">
		<button
		       className="Button"
		       style={{
				position: 'fixed', 
				    top: '15px',      
				    left: '40px',     
				    borderRadius: '30px',
				    padding: '3px 0px', 
				    backgroundColor: '#581c14',
				    color: 'white',    
				    border: 'none',     
				    fontSize: '30px',
					fontWeight: 'bold',   
				    cursor: 'pointer',  
				    zIndex: '1000'
		       }}
		       onClick={() => navigate(-1)} // Navigate back to the previous page
		     >
		       ←
		     </button>
      <h2 style = {{fontFamily: '"Courier New", Courier, monospace', fontWeight: 'bold', fontSize: '40px'}}>{ 'Edit Post'}</h2>
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
          value={address}
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
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div className="image-preview">
            {images && <img src={images} alt="Uploaded" />}
          </div>
        </div>


        <div className="form-group">
          <label>Rating</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Type here..."

          />
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


        <button type="submit" className="Button" style ={{marginLeft: '170px'}}>Save post</button>

      </form>

    </div>

  );

};


export default EditPost;
