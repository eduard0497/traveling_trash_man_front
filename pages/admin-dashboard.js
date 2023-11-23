import React, { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import MapView from "../comps/MapView";
import ManageEmployees from "../comps/ManageEmployees";

function AdminDashboard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("");

  const showScreen = () => {
    if (!currentScreen) return null;
    if (currentScreen == "mapView") return <MapView />;
    if (currentScreen == "employees") return <ManageEmployees />;
  };

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.nav_container}>
        <button onClick={() => setCurrentScreen("HDA")}>
          Hist Data Analysis
        </button>
        {/* <button onClick={() => setCurrentScreen("monitoring")}>
          Monitoring
        </button> */}
        <button onClick={() => setCurrentScreen("employees")}>Employees</button>
        <button onClick={() => setCurrentScreen("mapView")}>Map View</button>
        <button onClick={() => router.push("/")}>LOG OUT</button>
      </div>
      {showScreen()}
    </div>
  );
}

export default AdminDashboard;
