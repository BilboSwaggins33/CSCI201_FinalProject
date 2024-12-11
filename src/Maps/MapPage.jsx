import logo from '../logo.svg';
import '../App.css';
import './MapPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {Icon} from 'leaflet'

function MapPage() {
  console.log("Map Page Component Rendered");
  
  const defaultIcon = new Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [45, 45], // size of the icon
    iconAnchor: [22.5, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
  })
  return (
    <div className='MapPage'>
      <div className='TopBar'>
      
        <a href="/home">Home</a>
        <a href="/post">Post</a>
        <a href="/profile">Profile</a>
        <a className='active' href="#map">Map</a>
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
      </div>
      <div className="Map">
        <MapContainer center={[34.02235633613326, -118.28512377318303]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[34.025321, -118.285365]} icon={defaultIcon} >
          <Popup>
          <h3>Dulce</h3>
          <br></br>
          Address: 3096 McClintock Ave Ste 1420, Los Angeles, CA 90007
          <br></br>
          Description: ...
          <br></br>
          Ratings: 4.5
          <br></br>
          Directions: ...
          <br></br>
          Ambiance: ...
          <br></br>
          Views: 446
          <br></br>

          </Popup>
        </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
