import Layout from "../components/Layout";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Circle } from "@react-google-maps/api";
import MapSetting from "../components/MapSetting";

const Test = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  return (
    <Layout>
      <APIProvider apiKey={API_KEY}>
        <div style={{ height: "500px" }}>
          <MapSetting />
          <Map
            mapId={"bf51a910020fa25a"}
            zoom={3}
            center={{ lat: 12, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {/* simple marker */}
            <Marker
              position={{ lat: 10, lng: 10 }}
              clickable={true}
              onClick={() => alert("marker was clicked!")}
              title={"clickable google.maps.Marker"}
            />
            <Circle
              center={{ lat: 100, lng: 100 }}
              radius={30000}
              options={{ strokeColor: "#ff0000" }}
            />

            {/* advanced marker with customized pin */}
            <AdvancedMarker
              position={{ lat: 20, lng: 10 }}
              title={"AdvancedMarker with customized pin."}
            >
              <Pin
                background={"#22ccff"}
                borderColor={"#1e89a1"}
                glyphColor={"#0f677a"}
              ></Pin>
            </AdvancedMarker>

            {/* advanced marker with html pin glyph */}
            <AdvancedMarker
              position={{ lat: 15, lng: 20 }}
              title={"AdvancedMarker with customized pin."}
            >
              <Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1.4}>
                {/* children are rendered as 'glyph' of pin */}
                👀
              </Pin>
            </AdvancedMarker>

            {/* advanced marker with html-content */}
            <AdvancedMarker
              position={{ lat: 29, lng: 10 }}
              title={"AdvancedMarker with custom html content."}
            >
              <div
                style={{
                  width: 300,
                  height: 300,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  // background: "#1dbe80",
                  border: "2px solid #0e6443",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </Layout>
  );
};

export default Test;
