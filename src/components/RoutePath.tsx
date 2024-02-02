/* eslint-disable complexity */
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from "react";

import { GoogleMapsContext, useMapsLibrary } from "@vis.gl/react-google-maps";

import type { Ref } from "react";
import { position } from "../types";

export type PolylineProps = google.maps.PolylineOptions;
export type PolylineRef = Ref<google.maps.Polyline | null>;

function usePolyline({ pathPoints }: { pathPoints: position[] }) {
  const geometryLibrary = useMapsLibrary("geometry");
  const polyline = useRef(new google.maps.Polyline()).current;
  const map = useContext(GoogleMapsContext)?.map;

  // update the path with the encodedPath
  useMemo(() => {
    if (!geometryLibrary) return;
    polyline.setPath(pathPoints.map((point) => ({ lng: point.latitude, lat: point.longitude })));
  }, [polyline, geometryLibrary]);

  // create polyline  instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined) console.error("<polyline > has to be inside a Map component.");
      return;
    }

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map]);

  return polyline;
}

export const RoutePath = forwardRef(
  ({ pathPoints }: { pathPoints: position[] }, ref: PolylineRef) => {
    const polyline = usePolyline({ pathPoints });

    useImperativeHandle(ref, () => polyline, []);

    return null;
  }
);
