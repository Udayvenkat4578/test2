import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationArrow } from 'react-icons/fa';

// Fix default marker icon issue in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to move map view programmatically
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

const Emergency = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const getBrowserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setError('');
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getBrowserLocation();
  }, []);

  return (
    <div className='min-h-screen' style={{ position: 'relative', width: '100%', height: '500px' }}>
      <MapContainer
        center={location || { lat: 20, lng: 0 }}
        zoom={location ? 15 : 2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <>
            <ChangeView center={location} zoom={15} />
            <Marker position={location}>
              <Popup>You are here</Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {/* Refresh Location Button */}
      <button
        onClick={getBrowserLocation}
        title="Refresh Location"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'white',
          borderRadius: '50%',
          padding: '10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        <FaLocationArrow color="#2563EB" size={20} />
      </button>

      {error && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            color: 'red',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            fontSize: '0.9rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Emergency;
