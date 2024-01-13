import React from "react";
import Layout from "../components/Layout";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const Test = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  console.log(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  return (
    <Layout>
      <APIProvider apiKey={API_KEY}>
        <div style={{ height: "500px" }}>
          <Map
            zoom={3}
            center={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </div>
      </APIProvider>
    </Layout>
  );
};

export default Test;
