import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';  // Import react-select
import axios from 'axios';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];

function LongPressHandler({ onLongPress }) {
  useMapEvents({
    mousedown(e) {
      this.pressTimer = setTimeout(() => onLongPress(e), 1000); // 1 second for long press
    },
    mouseup() {
      clearTimeout(this.pressTimer);
    },
    mousemove() {
      clearTimeout(this.pressTimer);
    },
  });
  return null;
}

function AdminMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showStopModal, setShowStopModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [stopName, setStopName] = useState("");
  const [routeName, setRouteName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [routeOptions, setRouteOptions] = useState([]);  // Add state for route options

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

  const handleLongPress = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
    setSelectedLocation([event.latlng.lat, event.latlng.lng]);
    setShowMarkerModal(true);
  };

  // Handler to close the marker modal
  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  const handleAddNewStop = () => {
    setShowMarkerModal(false);
    setShowStopModal(true);
  };

  const handleAddNewRoute = async () => {
    setShowMarkerModal(false);
    try {
      const response = await axios.get("http://localhost/WebApi/api/Stops/GetAllStops");
      // Flatten the data
      const stops = response.data.flat().map(stop => ({
        value: stop.Id,
        label: stop.Name
      }));
      setRouteOptions(stops);
      setShowRouteModal(true);
    } catch (error) {
      console.error("Error fetching stops:", error);
    }
  };

  const handleStopNameChange = (event) => {
    setStopName(event.target.value);
  };

  const handleRouteNameChange = (event) => {
    setRouteName(event.target.value);
  };

  const handleSaveStop = async () => {
    if (selectedLocation && stopName) {
      const [lat, lng] = selectedLocation;
      const stopData = {
        name: stopName,
        latitude: lat,
        longitude: lng,
      };

      try {
        await axios.post("http://localhost/WebApi/api/Admin/InsertStop", stopData);
        alert("Stop added successfully!");
        setShowStopModal(false);
      } catch (error) {
        console.error("Error adding new stop:", error);
        alert("Failed to add stop. Please try again.");
      }
    } else {
      alert("Please select a location and enter a stop name.");
    }
  };

  const handleSaveRoute = async () => {
    if (routeName && selectedOptions.length > 0) {
      const routeData = {
        RouteTitle: routeName,
        Stops: selectedOptions.map(option => option.value)
      };

      try {
        await axios.post("http://localhost/WebApi/api/Admin/InsertRoute", routeData);
        alert("Route added successfully!");
        setShowRouteModal(false);
      } catch (error) {
        console.error("Error adding new route:", error);
        alert("Failed to add route. Please try again.");
      }
    } else {
      alert("Please enter a route title and select at least one stop.");
    }
  };

  return (
    <div
      className="googlemap-container"
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Modal for marker actions */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <section className="mappoup-container">
              <Button className="student-button edit-stops" onClick={handleAddNewStop}>
                ADD New Stop
              </Button>
              <Button className="student-button edit-stops" onClick={handleAddNewRoute}>
                ADD New Route
              </Button>
            </section>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      {/* Modal for adding a new stop */}
      <Modal show={showStopModal} onHide={() => setShowStopModal(false)}>
        <div style={{ backgroundColor: "#2FAA98" }} className="modal-color">
          <Modal.Header closeButton>
            <Modal.Title>Stop Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Stop Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter stop name"
                  value={stopName}
                  onChange={handleStopNameChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowStopModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveStop}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Modal for adding a new route */}
      <Modal show={showRouteModal} onHide={() => setShowRouteModal(false)}>
        <div style={{ backgroundColor: "#2FAA98" }} className="modal-color">
          <Modal.Header closeButton>
            <Modal.Title>Route Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
              <Form.Group>
                <Form.Label>Route Title</Form.Label>
                <Form.Control
                  type="text"
                  name="routeName"
                  placeholder="Enter route title"
                  value={routeName}
                  onChange={handleRouteNameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Stops</Form.Label>
                <Select
                  isMulti
                  name="stops"
                  options={routeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={setSelectedOptions}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRouteModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveRoute}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LongPressHandler onLongPress={handleLongPress} />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={customIcon}
          >
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default AdminMap;

