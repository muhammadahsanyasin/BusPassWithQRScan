import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import busIcon from "../../Assets/BusMapMarker.png";
import { Modal, Button, Dropdown, Alert } from "react-bootstrap";
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

function ConductorMap() {
  // State variables for managing UI state and data
  const [showMarkerModal, setShowMarkerModal] = useState(false); // Modal visibility state
  const [journeyStarted, setJourneyStarted] = useState(false); // Flag to indicate if journey is started
  const [journeyCompleted, setJourneyCompleted] = useState(false); // Flag to indicate if journey is completed
  const [routes, setRoutes] = useState([]); // Array to store fetched routes
  const [selectedRoute, setSelectedRoute] = useState(null); // Currently selected route
  const [routeStops, setRouteStops] = useState([]); // Array to store stops of selected route
  const [points, setPoints] = useState([]); // Array to store points for polyline on map
  const [busPosition, setBusPosition] = useState(null); // Coordinates of bus position on map
  const [selectedStop, setSelectedStop] = useState(null); // Currently selected stop
  const busId = 1; // Assuming the bus ID is 1

  // Fetch assigned routes and check if a route is already started on component mount
  useEffect(() => {
    // Fetch assigned routes from API
    axios.get("http://localhost/WebApi/api/Conductor/GetAssignedRoutes/?conductorId=1")
      .then(response => {
        setRoutes(response.data); // Update state with fetched routes
      })
      .catch(error => {
        console.error("There was an error fetching the routes!", error);
      });

    // Check if a route is already started for the conductor
    axios.get("http://localhost/WebApi/api/Conductor/GetStartedRoute/?conductorId=1")
      .then(response => {
        const startedRoute = response.data; // Retrieve started route data from response
        if (startedRoute) {
          // If a route is started, set the selected route and its details
          setSelectedRoute(startedRoute); // Set selected route
          setRouteStops(startedRoute.Stops); // Set stops of the selected route
          setPoints(startedRoute.Stops.map(stop => [stop.Latitude, stop.Longitude])); // Set points for polyline on map

          // Set initial bus position to the last known coordinates of the started route
          const lastStop = startedRoute.Stops[startedRoute.Stops.length - 1];
          setBusPosition([lastStop.Latitude, lastStop.Longitude]);

          // Mark journey as started
          setJourneyStarted(true);
        }
      })
      .catch(error => {
        console.error("Error fetching started route:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Effect to manage bus position and journey state updates when journey is started
  useEffect(() => {
    if (journeyStarted) {
      // Interval to update bus location every 3 seconds
      const locationUpdateInterval = setInterval(() => {
        if (busPosition && selectedRoute) {
          updateBusLocation(busId, selectedRoute.RouteId, busPosition[0], busPosition[1]); // Update bus location in database
          checkProximityToStops(busPosition[0], busPosition[1]); // Check if bus is near any stops
        }
      }, 3000); // Interval duration: 3 seconds

      // Interval to check journey completion every 30 seconds
      const journeyStatusInterval = setInterval(() => {
        checkJourneyCompletion(); // Check if journey is completed
      }, 30000); // Interval duration: 30 seconds

      // Cleanup function to clear intervals on component unmount or journey stop
      return () => {
        clearInterval(locationUpdateInterval); // Clear location update interval
        clearInterval(journeyStatusInterval); // Clear journey status check interval
      };
    }
  }, [journeyStarted, busPosition, selectedRoute]); // Dependencies: journeyStarted, busPosition, selectedRoute

  // Function to update bus location in the database
  const updateBusLocation = async (busId, routeId, latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost/WebApi/api/Conductor/UpdateBusLocation", {
        BusId: busId,
        RouteId: routeId,
        Cords: {
          latitude: latitude,
          longitude: longitude
        }
      });
      if (response.status === 200) {
        console.log('Bus location updated successfully.');
        // Update the bus position state on map
        setBusPosition([latitude, longitude]);
      } else {
        console.error('Failed to update bus location.');
      }
    } catch (error) {
      console.error('Error updating bus location:', error);
    }
  };

  // Function to check proximity to stops and call API if within 50 meters
  const checkProximityToStops = (latitude, longitude) => {
    routeStops.forEach(stop => {
      const distance = calculateDistance(latitude, longitude, stop.Latitude, stop.Longitude);
      if (distance <= 50) {
        handleReachedStop(stop.StopId); // Call API function when bus is near stop
      }
    });
  };

  // Function to call the ReachedStop API
  const handleReachedStop = async (stopId) => {
    try {
      const response = await axios.post("http://localhost/WebApi/api/Conductor/ReachedAtStop", {
        BusId: busId,
        RouteId: selectedRoute.RouteId,
        StopId: stopId
      });
      if (response.status === 200) {
        console.log(`Bus reached stop ${stopId} successfully.`);
      } else {
        console.error(`Failed to mark bus reached stop ${stopId}.`);
      }
    } catch (error) {
      console.error(`Error reaching stop ${stopId}:`, error);
    }
  };

  // Function to check if the journey is completed
  const checkJourneyCompletion = async () => {
    try {
      const response = await axios.get("http://localhost/WebApi/api/Conductor/IsJourneyCompleted/?conductorId=2");
      if (response.data) {
        setJourneyCompleted(true); // Set journey as completed
        setJourneyStarted(false); // Set journey as not started
        console.log('Journey completed successfully.');
      } else {
        console.log('Journey not completed yet.');
      }
    } catch (error) {
      console.error("Error checking journey completion:", error);
    }
  };

  // Handler for marker click on map (stop information)
  const handleMarkerClick = (stop) => {
    setSelectedStop(stop); // Set selected stop details
    setShowMarkerModal(true); // Display modal with stop information
  };

  // Handler for closing stop information modal
  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false); // Hide stop information modal
    setSelectedStop(null); // Reset selected stop details
  };

  // Handler for selecting a route from dropdown
  const handleRouteSelect = (route) => {
    setSelectedRoute(route); // Set selected route
    setRouteStops(route.Stops); // Set stops of the selected route
    setPoints(route.Stops.map(stop => [stop.Latitude, stop.Longitude])); // Set points for polyline on map

    // Update bus position to the first stop's coordinates
    const initialStop = route.Stops[0];
    setBusPosition([initialStop.Latitude, initialStop.Longitude]);

    // Start the journey if not already started
    if (!journeyStarted) {
      startJourney(); // Start the journey
    }
  };

  // Function to start the journey
  const startJourney = () => {
    if (selectedRoute) {
      // Call API to start journey with busId and routeId
      axios.post(`http://localhost/WebApi/api/Conductor/StartJourney/?busId=${busId}&routeId=${selectedRoute.RouteId}`)
        .then(response => {
          setJourneyStarted(true); // Set journey as started
          setShowMarkerModal(false); // Hide stop information modal
          console.log('Journey started successfully.');
        })
        .catch(error => {
          console.error("There was an error starting the journey!", error);
        });
    }
  };

  // Handler for map click event
  const handleMapClick = (event) => {
    if (journeyStarted) {
      const { lat, lng } = event.latlng; // Get coordinates of clicked location
      setBusPosition([lat, lng]); // Update bus position state with clicked location coordinates
      updateBusLocation(busId, selectedRoute.RouteId, lat, lng); // Update bus location in database
    }
  };

  // Function to calculate distance between two coordinates (in meters)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // Convert latitude to radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    // Haversine formula to calculate distance
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // Distance in meters
    return distance;
  };

  // Render the component
  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Button to start journey or indicate journey status */}
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

      {/* Alert to indicate journey completion */}
      {journeyCompleted && (
        <Alert variant="success" style={{ position: "absolute", top: "60px", right: "10px", zIndex: 1000 }}>
          Journey Completed!
        </Alert>
      )}

      {/* Modal for selecting journey or showing stop information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedStop ? "Stop Information" : "Select Journey"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStop ? (
              <div>
                <p><strong>Name:</strong> {selectedStop.Name}</p>
                <p><strong>Timing:</strong> {selectedStop.Timing}</p>
                <p><strong>Longitude:</strong> {selectedStop.Longitude}</p>
                <p><strong>Latitude:</strong> {selectedStop.Latitude}</p>
              </div>
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedRoute ? `Route ${selectedRoute.RouteTitle}` : 'Select Route'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {routes.map((route) => (
                    <Dropdown.Item key={route.RouteId} onClick={() => handleRouteSelect(route)}>
                      {route.RouteTitle}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedStop ? (
              <Button variant="secondary" onClick={handleCloseMarkerModal}>
                Close
              </Button>
            ) : (
              <Button variant="primary" onClick={startJourney} disabled={!selectedRoute}>
                Start Journey
              </Button>
            )}
          </Modal.Footer>
        </div>
      </Modal>

      {/* Map container to display the map */}
      <MapContainer
        center={busPosition || [33.64340057674401, 73.0790521153456]} // Default position if busPosition is null
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick} // Handle click events on the map
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

        {/* Render markers for each stop on the route */}
        {routeStops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.Latitude, stop.Longitude]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(stop) }} // Handle click events on stop markers
          />
        ))}

        {/* Draw polyline between points if there are points available */}
        {points.length > 0 && (
          <Polyline positions={points} color={journeyStarted ? 'green' : 'blue'} /> // Set polyline color based on journey status
        )}
      </MapContainer>
    </div>
  );
}

export default ConductorMap;
