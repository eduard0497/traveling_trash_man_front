import React, { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import MapView from "../comps/MapView";
import Feedback from "../comps/Feedback";

function EmployeeDashboard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("");

  const showScreen = () => {
    if (!currentScreen) return null;
    if (currentScreen == "mapView") return <MapView />;
    if (currentScreen == "feedback") return <Feedback />;
  };
  return (
    <div className={styles.dashboard_container}>
      <div className={styles.nav_container}>
        <button onClick={() => setCurrentScreen("mapView")}>Map</button>
        {/* <button onClick={() => setCurrentScreen("monitoring")}>
          Monitoring
        </button> */}
        <button onClick={() => setCurrentScreen("feedback")}>Feedback</button>
        <button onClick={() => router.push("/")}>LOG OUT</button>
      </div>
      {showScreen()}
    </div>
  );
}

export default EmployeeDashboard;
