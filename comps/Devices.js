import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import styles from "../styles/Devices.module.css";
import { devices } from "../aaa_samples/devices";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { IoIosAddCircle } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdReport } from "react-icons/md";

const battery_color_based_on_percentage = (batteryPercentage) => {
  if (batteryPercentage > 50) {
    return "white";
  }
  if (batteryPercentage >= 15 && batteryPercentage <= 50) {
    return "yellow";
  }
  if (batteryPercentage < 15) {
    return "red";
  }
};

const level_color_based_on_percentage = (levelPercentage) => {
  if (levelPercentage > 80) {
    return "red";
  } else {
    return "white";
  }
};

function Devices() {
  const [showMap, setshowMap] = useState(false);

  return (
    <div className={styles.page_container}>
      <div className={styles.table_container}>
        <div className={styles.table_container_top_side_buttons}>
          <Button
            variant="success"
            // onClick={() => setshowMap(true)}
          >
            <div className="icon_and_text">
              <IoIosAddCircle />
              Add Device
            </div>
          </Button>
          <Button variant="success" onClick={() => setshowMap(!showMap)}>
            <div className="icon_and_text">
              <FaMapMarkedAlt />
              Map
            </div>
          </Button>
        </div>
        <GetTableView />
      </div>
      {showMap && (
        <div>
          <GetMapView />
        </div>
      )}
    </div>
  );
}

export default Devices;

const GetTableView = () => {
  const [showReportModal, setshowReportModal] = useState(false);
  const [deviceIdToReportAbout, setdeviceIdToReportAbout] = useState(0);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Level</th>
            <th>Battery</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => {
            return (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td
                  style={{
                    backgroundColor: level_color_based_on_percentage(
                      device.level
                    ),
                  }}
                >
                  {device.level} %
                </td>
                <td
                  style={{
                    backgroundColor: battery_color_based_on_percentage(
                      device.battery
                    ),
                  }}
                >
                  {device.battery} %
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setdeviceIdToReportAbout(device.id);
                      setshowReportModal(true);
                    }}
                  >
                    <div className="icon_and_text">
                      <MdReport size="25px" />
                    </div>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        onHide={() => setshowReportModal(false)}
        show={showReportModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Body Here */}
          <h5>Selected Device: {deviceIdToReportAbout}</h5>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Title" />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setshowReportModal(false)}>
            Close
          </Button>
          <Button variant="primary">Submit Report</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const GetMapView = () => {
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
              <div className={styles.map_marker_info_container}>
                <p>ID: {device.id}</p>
                <p
                  style={{
                    backgroundColor: battery_color_based_on_percentage(
                      device.battery
                    ),
                  }}
                >
                  Battery: {device.battery}%
                </p>
                <p
                  style={{
                    backgroundColor: level_color_based_on_percentage(
                      device.level
                    ),
                  }}
                >
                  Level: {device.level}%
                </p>
              </div>
            </InfoWindowF>
          </>
        );
      })}
    </GoogleMap>
  );
};
