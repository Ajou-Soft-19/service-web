import React from "react";
// import {createRoot} from 'react-dom/client';

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Circle } from "../components/Circle";
// import ControlPanel from './control-panel';

// import {POLYGONS} from './encoded-polygon-data';

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const INITIAL_CENTER = { lat: 41.1897, lng: -96.0627 };

const App = () => {
  const [center, setCenter] = React.useState(INITIAL_CENTER);
  const [radius, setRadius] = React.useState(43000);

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ width: 500, height: 500 }}>
        <Map zoom={10} center={INITIAL_CENTER} gestureHandling={"greedy"} disableDefaultUI={true}>
          <Marker
            position={center}
            draggable
            onDrag={(e) => setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })}
          />
          <Circle
            radius={radius}
            center={center}
            onRadiusChanged={setRadius}
            onCenterChanged={changeCenter}
            strokeColor={"#0c4cb3"}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={"#3b82f6"}
            fillOpacity={0.3}
            editable
            draggable
          />
        </Map>
      </div>
    </APIProvider>
  );
};
export default App;
