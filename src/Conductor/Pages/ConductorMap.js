import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import busIcon from "../../Assets/BusMapMarker.png";
import { Modal, Button, Dropdown } from "react-bootstrap";
import axios from 'axios';
import "../Pages/Styles/ConductorMap.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

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

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          icon: i === 0 ? busMarkerIcon : customIcon, // Use bus icon for the first marker
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
      autoRoute: true,
      lineOptions: {
        styles: [{ color: 'blue', opacity: 1, weight: 5 }]
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

function ConductorMap() {
  const [busPosition, setBusPosition] = useState(initialPosition);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [routeStops, setRouteStops] = useState([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Function to update bus location
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
        // Optionally handle any logic after updating bus location
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

  const handleMapClick = (event) => {
    setBusPosition([event.latlng.lat, event.latlng.lng]);
    updateBusLocation(2, 2, event.latlng.lat, event.latlng.lng); // Example with hardcoded busId and routeId, adjust as needed
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
        <Polyline positions={points} color="blue" />

        {/* Routing Machine to show the route */}
        {journeyStarted && <RoutingMachine waypoints={[busPosition, ...points.map(point => [point.Latitude, point.Longitude])]} />}
      </MapContainer>
    </div>
  );
}

export default ConductorMap;
