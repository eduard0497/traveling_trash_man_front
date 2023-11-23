import React from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import styles from "../styles/MapView.module.css";
import { devices } from "../aaa_samples/devices";

function MapView() {
  const zoomDistance = 16;
  const mapWidth = "800px";
  const mapHeight = "800px";
  const mapCenter = {
    lat: 34.242245312686954,
    lng: -118.53043313617162,
  };
  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: true,
  };
  const libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    // libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.map_container}>
      <div>
        <GoogleMap
          options={mapOptions}
          zoom={zoomDistance}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: mapWidth, height: mapHeight }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          {devices.map((item) => {
            return (
              <>
                <MarkerF
                  key={item.id}
                  position={item}
                  onLoad={() => console.log("Marker Loaded")}
                />
                <InfoWindowF
                  position={item}
                  zIndex={1}
                  options={{
                    pixelOffset: {
                      width: 0,
                      height: -40,
                    },
                  }}
                >
                  <div>
                    <p>ID: {item.id}</p>
                    <p>Battery: {item.battery}%</p>
                    <p>Level: {item.level}%</p>
                  </div>
                </InfoWindowF>
              </>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapView;
