import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Rectangle, useMapEvent, useMap } from 'react-leaflet';
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
  const map = useMapEvent('move', () => { });
  map.flyTo(center, map.getZoom());
  return null;
};

const SetViewOnClick = ({ animateRef }) => {
  const map = useMapEvent('click', (e) => {
    if (animateRef.current) {
      map.setView(e.latlng, 8, {
        animate: true,
      });
    }
  });

  return null;
};

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());

  useEffect(() => {
    const onChange = () => {
      setBounds(parentMap.getBounds());
      minimap.setView(parentMap.getCenter(), zoom);
    };

    parentMap.on('move', onChange);
    parentMap.on('zoom', onChange);

    return () => {
      parentMap.off('move', onChange);
      parentMap.off('zoom', onChange);
    };
  }, [minimap, parentMap, zoom]);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [parentMap, mapZoom],
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

const MapComponent = () => {
  const [location, setLocation] = useState("mexico");
  const animateRef = useRef(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={locations[location].coords} zoom={7} style={{ height: "100vh", width: "100%" }}>
        <ChangeView center={locations[location].coords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={locations[location].coords}>
          <Tooltip direction='bottom' permanent>{locations[location].name}</Tooltip>
        </Marker>
        <SetViewOnClick animateRef={animateRef} />
        <MinimapControl position="topright" />
      </MapContainer>

      <select
        onChange={handleLocationChange}
        value={location}
        className='selectLocation'>
        <option value="mexico">Gulf of Mexico</option>
        <option value="china">China</option>
      </select>

      <p className='animateRef'>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current;
            }}
          />
          Animate panning
        </label>
      </p>
    </div>
  );
};

export default MapComponent;