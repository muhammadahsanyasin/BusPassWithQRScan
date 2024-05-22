import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import Modal from 'react-modal';
import '../Pages/Styles/StudentMap.css';

// Modal styles and settings
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    maxWidth: '400px',
  },
};

Modal.setAppElement('#root'); // Ensure accessibility

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];
const points = [
  [33.65221479100481, 73.06464916506403],
  [33.64325572431809, 73.06407053297772],
  [33.64266730832196, 73.07319440734358],
  [33.64179296464606, 73.07699834732112],
  [33.64331651749647, 73.07780627129169],
  [33.64314132414114, 73.07901841479297],
];

function StudentMap() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
    return () => {
      setMarkerPosition(null);
    };
  }, []);

  const handleMapClick = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedLocation(null);
  };

  const handleMarkerClick = (location) => {
    console.log("Marker clicked:", location); // Debugging: Log the location
    setSelectedLocation(location);
    openModal();
  };

  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh" }}>
      <MapContainer
        center={markerPosition || initialPosition}
        zoom={20}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon} eventHandlers={{ click: () => getCurrentLocation() }}>
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(point) }}
          />
        ))}
        <Polyline positions={points} color="blue" />
      </MapContainer>

      {/* Modal for marker information */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Marker Modal"
      >
        <h2 style={titleStyle}>Marker Information</h2>
        {selectedLocation ? (
          <p style={contentStyle}>
            Latitude: {selectedLocation[0]}<br />
            Longitude: {selectedLocation[1]}
          </p>
        ) : (
          <p style={contentStyle}>No location selected.</p>
        )}
        <button onClick={closeModal} style={closeButtonStyle}>
          Close
        </button>
      </Modal>
    </div>
  );
}

// Styles
const titleStyle = {
  textAlign: 'center',
  margin: '0',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: '5px 10px',
  backgroundColor: '#f00',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const contentStyle = {
  padding: '20px',
};

export default StudentMap;
