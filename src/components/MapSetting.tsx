import React, { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const MapSetting = () => {
  const map = useMap("bf51a910020fa25a");
  const { Circle } = useMapsLibrary("maps");

  useEffect(() => {
    if (!map) return;
    Circle.setmap(map);
  }, [map]);
  return <div>This is map component;</div>;
};

export default MapSetting;
