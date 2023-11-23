import React from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import styles from "../styles/MapView.module.css";

// AIzaSyAoG3lbblgCvJmoYIstVm2pwE-E5iaVitE

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
    googleMapsApiKey: "AIzaSyAoG3lbblgCvJmoYIstVm2pwE-E5iaVitE",
    // libraries: libraries,
  });

  const markerPositions = [
    {
      id: 1,
      lat: 34.242245312686954,
      lng: -118.53043313617162,
      sensorInfo: `Sensor info for #${1}`,
    },
    {
      id: 2,
      lat: 34.24162486342446,
      lng: -118.53312379123766,
      sensorInfo: `Sensor info for #${2}`,
    },
    {
      id: 3,
      lat: 34.23864450968821,
      lng: -118.52814541323107,
      sensorInfo: `Sensor info for #${3}asdasd`,
    },
  ];

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
          {markerPositions.map((item) => {
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
                    <p>{item.sensorInfo}</p>
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
