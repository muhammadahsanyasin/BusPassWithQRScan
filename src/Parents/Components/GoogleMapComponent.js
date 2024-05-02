import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function GoogleMapComponent() {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.648383767098835,
    lng: 73.06993428172473
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const defaultProps = {
    center: currentPosition,
    zoom: 11
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCwSl6luqyglE0qb_GxCZydv20tVcyVgLU" }} // Replace with your Google Maps API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={currentPosition.lat}
          lng={currentPosition.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default React.memo(GoogleMapComponent);
