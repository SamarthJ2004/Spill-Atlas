import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../styles/mapComponent.css";

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const locations = {
  mexico: {
    name: "Gulf of Mexico",
    coords: [27, -95]
  },
  china: {
    name: "China",
    coords: [32, 124]
  }
};

const ChangeView = ({ center }) => {
  const map = useMap();
  map.flyTo(center, map.getZoom())
  return null;
};

const MapComponent = () => {
  const [location, setLocation] = useState(locations.mexico);

  const handleLocationChange = (e) => {
    const selectedLocation = locations[e.target.value];
    setLocation(selectedLocation);
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={location.coords} zoom={7} style={{ height: "100vh", width: "100%" }}>
        <ChangeView center={location.coords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location.coords}>
          <Tooltip direction='bottom' permanent>{location.name}</Tooltip>
        </Marker>
      </MapContainer>

      <select
        onChange={handleLocationChange}
        value={location.value}
        className='selectLocation'
      >
        <option value="mexico">Gulf of Mexico</option>
        <option value="china">China</option>
      </select>
    </div>
  );
}

export default MapComponent;