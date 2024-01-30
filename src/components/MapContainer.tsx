import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const MapContainer = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [radius, setRadius] = useState(5000); // 반경 설정 (미터 단위)
  const [circleOptions, setCircleOptions] = useState({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    // 지도가 로드되면 호출되는 함수
    if (map) {
      // 중심 마커 추가
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
        title: "Center Marker",
      });

      // 반경을 나타내는 원 추가
      const circle = new window.google.maps.Circle({
        ...circleOptions,
        map: map,
        center: center,
        radius: radius,
      });
    }
  }, [map, center, radius, circleOptions]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["geometry"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {/* 지도에 마커 추가 */}
        <Marker position={center} title={"Center Marker"} />

        {/* 지도에 원 추가 */}
        <Circle center={center} radius={radius} options={circleOptions} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
