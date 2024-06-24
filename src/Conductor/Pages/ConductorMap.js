import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import busIcon from "../../Assets/BusMapMarker.png";
import { Modal, Button, Dropdown } from "react-bootstrap";
import axios from 'axios';
import "../Pages/Styles/ConductorMap.css";

// Define the custom icons
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const busMarkerIcon = L.icon({
  iconUrl: busIcon,
  iconSize: [38, 38],
});

// Initial position
const initialPosition = [33.64340057674401, 73.0790521153456];

function ConductorMap() {
  const [busPosition, setBusPosition] = useState(initialPosition);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [routeStops, setRouteStops] = useState([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  // Function to update bus location in the database
  const updateBusLocation = async (busId, routeId, latitude, longitude) => {
    try {
      const response = await axios.post(`http://localhost/WebApi/api/Conductor/UpdateBusLocation`, {
        BusId: busId,
        RouteId: routeId,
        Cords: {
          latitude: latitude,
          longitude: longitude
        }
      });
      if (response.status === 200) {
        console.log('Bus location updated successfully.');
      } else {
        console.error('Failed to update bus location.');
      }
    } catch (error) {
      console.error('Error updating bus location:', error);
    }
  };

  // Function to fetch assigned routes
  const fetchAssignedRoutes = async (conductorId) => {
    try {
      const response = await axios.get(`http://localhost/WebApi/api/Conductor/GetAssignedRoutes/?conductorId=${conductorId}`);
      if (response.status === 200) {
        setRoutes(response.data);
      } else {
        console.error('Failed to fetch assigned routes.');
      }
    } catch (error) {
      console.error('Error fetching assigned routes:', error);
    }
  };

  // Function to start journey with selected route
  const startJourney = async () => {
    if (!selectedRoute) {
      alert('Please select a route.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost/WebApi/api/Conductor/StartJourney/?busId=2&routeId=${selectedRoute}`);
      if (response.status === 200) {
        alert('Journey started successfully!');
        setJourneyStarted(true);
        fetchRouteStops(selectedRoute); // Fetch stops for the selected route

        // Start updating the bus location every 1 second
        const interval = setInterval(() => {
          // Simulating bus movement by slightly altering the position
          const newLat = busPosition[0] + (Math.random() - 0.5) * 0.0001;
          const newLng = busPosition[1] + (Math.random() - 0.5) * 0.0001;
          const newPosition = [newLat, newLng];

          // Update the bus position in state
          setBusPosition(newPosition);

          // Update the latest position in the database
          updateBusLocation(2, selectedRoute, newLat, newLng);
        }, 1000); // Update every second

        setIntervalId(interval);
      } else {
        alert('Failed to start journey.');
      }
    } catch (error) {
      console.error('Error starting journey:', error);
    }
  };

  // Function to fetch route stops
  const fetchRouteStops = async (routeId) => {
    try {
      const response = await axios.get(`http://localhost/WebApi/api/Conductor/GetRouteStops/?routeId=${routeId}`);
      if (response.status === 200) {
        setRouteStops(response.data);
        // Extracting points for polyline
        const routePoints = response.data.map(stop => [stop.Latitude, stop.Longitude]);
        setPoints(routePoints);
      } else {
        console.error('Failed to fetch route stops.');
      }
    } catch (error) {
      console.error('Error fetching route stops:', error);
    }
  };

  // Fetch assigned routes on component mount
  useEffect(() => {
    fetchAssignedRoutes(1); // Example with hardcoded conductorId, adjust as needed
  }, []);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleMapClick = (event) => {
    const newPosition = [event.latlng.lat, event.latlng.lng];
    setBusPosition(newPosition);
    updateBusLocation(2, selectedRoute, event.latlng.lat, event.latlng.lng); // Update bus location with selected routeId
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowMarkerModal(true);
  };

  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Button 
        onClick={() => setShowMarkerModal(true)} 
        disabled={journeyStarted} 
        style={{ 
          position: "absolute", 
          top: "10px", 
          right: "10px", 
          color: "black",
          zIndex: 1000 
        }}>
        {journeyStarted ? 'Journey Started' : 'Start Journey'}
      </Button>

      {/* Modal for selecting journey */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            <Modal.Title>Select Journey</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedRoute ? `Route ${selectedRoute}` : 'Select Route'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {routes.map((route) => (
                  <Dropdown.Item key={route.RouteId} onClick={() => setSelectedRoute(route.RouteId)}>
                    {route.RouteTitle}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={startJourney} disabled={!selectedRoute}>
              Start Journey
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={busPosition || initialPosition}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render bus marker if position is available */}
        {busPosition && (
          <Marker position={busPosition} icon={busMarkerIcon}>
            <Popup>
              Bus current location. <br /> Latitude: {busPosition[0]}, Longitude: {busPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Adding child markers */}
        {routeStops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.Latitude, stop.Longitude]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(stop) }}
          />
        ))}

        {/* Draw polyline between points */}
        {points.length > 0 && (
          <Polyline positions={points} color={journeyStarted ? 'green' : 'blue'} />
        )}
      </MapContainer>
    </div>
  );
}

export default ConductorMap;
