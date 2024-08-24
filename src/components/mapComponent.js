import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Rectangle, useMapEvent, useMap, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../styles/mapComponent.css";
import data1 from '../locationData/test1.json';
import data2 from '../locationData/test2.json';

import { DefaultIcon, colors, POSITION_CLASSES } from './mapUI.js';

L.Marker.prototype.options.icon = DefaultIcon;

const SetViewOnClick = ({ animateRef }) => {
  const map = useMapEvent('click', (e) => {
    if (animateRef.current) {
      map.setView(e.latlng, 8, { animate: true });
    }
  });
  return null;
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
  const [mapTime, setMapTime] = useState("real time map");
  const animateRef = useRef(false);
  const [pos, setPos] = useState([]);
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState(null);

  const [data, setData] = useState(data1);

  useEffect(() => {
    setData(mapTime === "real time map" ? data1 : data2);
  }, [mapTime]);

  useEffect(() => {
    const length = data.length;
    const arr = new Array(length).fill(0);
    setPos(arr);
    console.log("This is the length of the array", length);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prevPos) =>
        prevPos.map((position, index) => {
          if (position < data[index].COORDS.length - 1) {
            return position + 1;
          } else {
            return position;
          }
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  const handleMapChange = (e) => {
    setMapTime(e.target.value);
    console.log(mapTime);
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={[27, -95]} zoom={7} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[27, -95]}>
          <Tooltip direction='bottom' permanent>Gulf of Mexico</Tooltip>
        </Marker>
        <SetViewOnClick animateRef={animateRef} />
        <MinimapControl position="topright" />

        {data.map((ship, index) => {
          const coord = ship.COORDS[pos[index]] || [];

          if (coord.length < 2) {
            console.warn(`Invalid coordinate at index ${index}:`, coord);
            return null;
          }

          return (
            <React.Fragment key={index}>
              <Marker
                position={coord}
                eventHandlers={{
                  mouseover: () => setHoveredMarkerIndex(index),
                  mouseout: () => setHoveredMarkerIndex(null),
                }}
              >
                <Popup>
                  Ship MMSI Id : {ship.MMSI}<br />
                  Latitude : {coord[0]}<br />
                  Longitude : {coord[1]}
                </Popup>
              </Marker>
              {hoveredMarkerIndex === index && ship.COORDS.length > 1 && (
                <Polyline
                  positions={ship.COORDS.filter((loc, i) => i <= pos[index])}
                  color={colors[index]}
                  weight={2}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      <select
        onChange={handleMapChange}
        value={mapTime}
        className='selectLocation'>
        <option value="real time map">Real Time Map</option>
        <option value="old map">Old Map</option>
      </select>
      
      <div className="map-controls">
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current;
            }}
          />
          Animate panning
        </label>
        <label>
          <input type="radio" name="data-option" />
          Raw AIS Data
        </label>
        <label>
          <input type="radio" name="data-option" />
          Pre Processed Data
        </label>
        <label>
          <input type="radio" name="data-option" />
          Anomality
        </label>
      </div>
    </div>
  );
};

export default MapComponent;