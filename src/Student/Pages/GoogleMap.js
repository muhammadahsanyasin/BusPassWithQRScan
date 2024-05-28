import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import taxiIconUrl from '../../Assets/childloc.png'; // Ensure the image is in the src directory



function GoogleMap() {
  useEffect(() => {
    const map = L.map('map').setView([33.64340057674401, 73.0790521153456], 11);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
      maxZoom: 15,
    }).addTo(map);

    const taxiIcon = L.icon({
      iconUrl: taxiIconUrl,
      iconSize: [70, 70],
    });

    const marker = L.marker([33.64331651749647, 73.07780627129169], { icon: taxiIcon }).addTo(map);

    map.on('click', function (e) {
      const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(33.64331651749647, 73.07780627129169),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
      })
        .on('routesfound', function (e) {
          const routes = e.routes;

          e.routes[0].coordinates.forEach((coord, index) => {
            setTimeout(() => {
              marker.setLatLng([coord.lat, coord.lng]);
            }, 100 * index);
          });
        })
        .addTo(map);
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
  
}

export default GoogleMap;
