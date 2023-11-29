import React, { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import Devices from "../comps/Devices";
import Feedback from "../comps/Feedback";
import Button from "react-bootstrap/Button";
import { GiAerialSignal } from "react-icons/gi";
import { RiFeedbackFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { BsTrash3Fill } from "react-icons/bs";
const _LOGO_SIZE = "40px";

function EmployeeDashboard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("");

  const showScreen = () => {
    if (!currentScreen) return null;
    if (currentScreen == "devices") return <Devices />;
    if (currentScreen == "feedback") return <Feedback />;
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
          {/* <Button variant="primary" onClick={() => setCurrentScreen("feedback")}>
        <div className="icon_and_text">
            <RiFeedbackFill  />
            Feedback
          </div>
          
        </Button> */}
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

export default EmployeeDashboard;
