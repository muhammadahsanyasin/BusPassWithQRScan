import React from 'react'

import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'

function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }
  
  function MyMapComponent() {
    return (
      <MapContainer center={[50.5, 30.5]} zoom={13}>
        <MyComponent />
      </MapContainer>
    )
  }

function Demomap() {
  return (
    <div>{MyMapComponent}</div>
  )
}

export default Demomap