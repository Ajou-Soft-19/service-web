import React, { useEffect, useState } from "react";
// import {createRoot} from 'react-dom/client';

import { APIProvider, Map, Marker, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Circle } from "../components/Circle";
import { Polygon } from "../components/Polygon";
import { getCookie } from "../utils";
import RouteDestination from "./../components/RouteDestination";
import { POLYGONS } from "../encoded-polygon-data";
import RouteSource from "../components/RouteSource";
import { RoutePath } from "../components/RoutePath";
import { position } from "../types";
const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const INITIAL_CENTER = { lat: 41.1897, lng: -96.0627 };

const App = () => {
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [radius, setRadius] = useState(43000);
  const [emergencyCar, setEmergencyCar] = useState<{
    src: position;
    dst: position;
    pathPoints: position[];
    checkPoints: position[];
  }>();

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    fetch(
      `http://${import.meta.env.VITE_API_SERVER}:7001/api/admin/monit/vehicle-status/emergency`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmergencyCar({
          src: { latitude: data.data.sourceLatitude, longitude: data.data.sourceLongitude },
          dst: { latitude: data.data.destLatitude, longitude: data.data.destLongitude },
          pathPoints: data.data.pathPoints,
          checkPoints: data.data.checkPoints,
        });
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ width: 1000, height: 1000 }}>
        <Map
          zoom={8}
          mapId={"bf51a910020fa25a"}
          center={{ lat: 37.3426011, lng: 127.1059845 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Polygon strokeWeight={1.5} encodedPaths={POLYGONS} />

          <Marker position={center} />
          {emergencyCar?.src && (
            <AdvancedMarker
              position={{
                lat: emergencyCar.src.longitude,
                lng: emergencyCar.src.latitude,
              }}
            >
              <RouteSource />
            </AdvancedMarker>
          )}
          {emergencyCar?.dst && (
            <AdvancedMarker
              position={{
                lat: emergencyCar.dst.longitude,
                lng: emergencyCar.dst.latitude,
              }}
            >
              <RouteDestination />
            </AdvancedMarker>
          )}
          {emergencyCar?.pathPoints && <RoutePath pathPoints={emergencyCar?.pathPoints} />}
          {emergencyCar?.checkPoints &&
            emergencyCar?.checkPoints.map((point, index) => (
              <AdvancedMarker
                key={index}
                position={{
                  lat: point.longitude,
                  lng: point.latitude,
                }}
              >
                {" "}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: "#0064CD",
                    border: "2px solid #0000FF",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </AdvancedMarker>
            ))}
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
          />
        </Map>
      </div>
    </APIProvider>
  );
};
export default App;
