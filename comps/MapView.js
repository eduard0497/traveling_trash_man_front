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

  const pickStyle_battery = (batteryPercentage) => {
    if (batteryPercentage > 50) {
      return styles.batteryGOOD;
    }
    if (batteryPercentage >= 15 && batteryPercentage <= 50) {
      return styles.batteryOK;
    }
    if (batteryPercentage < 15) {
      return styles.batteryBAD;
    }
  };

  const pickStyle_level = (levelPercentage) => {
    if (levelPercentage > 80) {
      return styles.red_text;
    } else {
      return null;
    }
  };

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
          {devices.map((device) => {
            return (
              <>
                <MarkerF
                  key={device.id}
                  position={device}
                  onLoad={() => console.log("Marker Loaded")}
                />
                <InfoWindowF
                  position={device}
                  zIndex={1}
                  options={{
                    pixelOffset: {
                      width: 0,
                      height: -40,
                    },
                  }}
                >
                  <div>
                    <p>ID: {device.id}</p>
                    <p>Battery: {device.battery}%</p>
                    <p className={pickStyle_level(device.level)}>
                      Level: {device.level}%
                    </p>
                  </div>
                </InfoWindowF>
              </>
            );
          })}
        </GoogleMap>
      </div>
      <div className={styles.devices_container}>
        {devices.map((device) => {
          return (
            <div
              key={device.id}
              className={`${
                styles.devices_container_device
              } ${pickStyle_battery(device.battery)}`}
            >
              <h3>ID: {device.id}</h3>
              <h3>Battery: {device.battery}%</h3>
              <h3>Level: {device.level}%</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MapView;
