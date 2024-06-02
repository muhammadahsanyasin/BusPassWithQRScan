import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import taxiIconUrl from '../../Assets/childloc.png'; // Ensure the image is in the src directory

function GoogleMap() {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [stopPoints, setStopPoints] = useState([]);
  const [routingControl, setRoutingControl] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapInitialized) {
      const mapInstance = L.map('map').setView([33.64340057674401, 73.0790521153456], 11);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, contribution',
        maxZoom: 15,
      }).addTo(mapInstance);
      setMap(mapInstance);
      setMapInitialized(true);
    }
  }, [mapInitialized]);

  const startJourney = () => {
    if (map && stopPoints.length > 0) {
      if (routingControl) {
        routingControl.remove();
      }

      const newRoutingControl = L.Routing.control({
        waypoints: stopPoints.map(point => L.latLng(point[0], point[1])),
        createMarker: (i, waypoint, n) => {
          return L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: taxiIconUrl,
              iconSize: [30, 30],
            })
          });
        },
        routeWhileDragging: false,
      }).addTo(map);

      setRoutingControl(newRoutingControl);

      newRoutingControl.on('routesfound', (e) => {
        const route = e.routes[0].coordinates;
        animateMarker(route);
      });
    }
  };

  const animateMarker = (route) => {
    const marker = L.marker(route[0], {
      icon: L.icon({
        iconUrl: taxiIconUrl,
        iconSize: [30, 30],
      })
    }).addTo(map);

    let currentIndex = 0;

    const moveMarker = () => {
      if (currentIndex < route.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextLatLng = route[nextIndex];
        marker.setLatLng(nextLatLng);
        currentIndex = nextIndex;
        setTimeout(moveMarker, 200); // Adjust this value to control the speed (higher value = slower)
      }
    };

    moveMarker();
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      <button onClick={startJourney} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        Start Journey
      </button>
    </div>
  );
}

export default GoogleMap;
