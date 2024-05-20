import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import { Modal, Button } from "react-bootstrap";

import '../Pages/Styles/StudentMap.css';

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
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Function to get current location
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

    // Get the current location when the component mounts
    getCurrentLocation();

    // Clear the marker position when component unmounts
    return () => {
      setMarkerPosition(null);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleMapClick = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
  };

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

  // Handler for marker click to show modal
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowMarkerModal(true);
  };

  // Handler to close the marker modal
  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh" }}>
      {/* Modal for displaying marker information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            <Modal.Title>Marker Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add-stops-studentmap">
              <section className="dashboard-container">
                <div className="row">
                  <div className="stops">
                    <div className="studentmapstop-containers">
                      {/* <div className="person-icon">
                        <img src={checkin} alt="Person Icon" />
                      </div> */}
                      <p>Student Checkin </p>
                      <p className="bold">15</p>
                    </div>
                    <div className="studentmapstop-containers">
                      <p>Remaining Seats</p>
                      <p className="bold">35</p>
                    </div>
                  </div>
                </div>
                <button className=" student-button edit-stops">
                  ADD Favorite Stop
                </button>
              </section>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition}
        zoom={20}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon} eventHandlers={{ click: getCurrentLocation }}>
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Adding child markers */}
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(point) }}
          >
            {/* <Popup>
              Point {index + 1} <br /> Latitude: {point[0]}, Longitude: {point[1]}.
            </Popup> */}
          </Marker>
        ))}

        {/* Draw polyline between points */}
        <Polyline positions={points} color="blue" />
      </MapContainer>
    </div>
  );
}

export default StudentMap;
