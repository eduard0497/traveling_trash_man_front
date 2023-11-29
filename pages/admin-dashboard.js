import React, { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import MapView from "../comps/Devices";
import ManageEmployees from "../comps/ManageEmployees";
import Button from "react-bootstrap/Button";
import { BsPeopleFill, BsGraphUpArrow } from "react-icons/bs";
import { GiAerialSignal } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { BsTrash3Fill } from "react-icons/bs";

const _LOGO_SIZE = "40px"

function AdminDashboard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("");

  const showScreen = () => {
    if (!currentScreen) return null;
    if (currentScreen == "devices") return <MapView />;
    if (currentScreen == "employees") return <ManageEmployees />;
  };

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.nav_container}>
        <div className={styles.nav_container_left}>
          <BsTrash3Fill size={_LOGO_SIZE} />
          <h2>Waste Bin Management System</h2>
        </div>
        <div className={styles.nav_container_right}>
          <Button variant="primary" onClick={() => setCurrentScreen("devices")}>
            <div className="icon_and_text">
              <GiAerialSignal size="20px" />
              Devices
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={() => setCurrentScreen("employees")}
          >
            <div className="icon_and_text">
              <BsPeopleFill />
              Employees
            </div>
          </Button>
          <Button variant="primary" onClick={() => setCurrentScreen("HDA")}>
            <div className="icon_and_text">
              <BsGraphUpArrow />
              Hist Data Analysis
            </div>
          </Button>
          <Button variant="danger" onClick={() => router.push("/")}>
            <div className="icon_and_text">
              <LuLogOut />
              Log Out
            </div>
          </Button>
        </div>
      </div>
      {showScreen()}
    </div>
  );
}

export default AdminDashboard;
