import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  // Function to handle map clicks and set position
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });

    return position ? (
      <Marker
        position={position}
        icon={
          new L.Icon({
            iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Google Maps-style pin icon
            iconSize: [16, 24], // Adjusted size for better accuracy
            iconAnchor: [10, 22], // Adjusted anchor point to align with the thumb tip
          })
        }
      />
    ) : null;
  };

  // Function to save the pinned location and navigate back
  const saveLocation = () => {
    if (position) {
      localStorage.setItem('pinnedLocation', `{${position[0]}, ${position[1]}}`);
      alert(`Location saved! {${position[0]}, ${position[1]}}`);
      navigate(-1); // Redirect to the previous page
    } else {
      alert('Please select a location first.');
    }
  };

  return (
    <div>
      <h1>Map Page</h1>
      <MapContainer center={[51.505, -0.09]} zoom={18} style={{ height: '500px', width: '100%' }}>
         {/* Satellite Base Layer */}
         <TileLayer
           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
           attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
         />

         {/* Labels Layer */}
         <TileLayer
           url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
           attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
         />
        <LocationMarker />
      </MapContainer>
      <button onClick={saveLocation}>Save Location</button>
    </div>
  );
};

export default MapPage;
