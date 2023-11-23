import React from "react";
import styles from "../styles/Feedback.module.css";
import { devices } from "../aaa_samples/devices";

function Feedback() {
  console.log(devices);
  return (
    <div className={styles.feedback_container}>
      <h1>Feedback Form</h1>
      <select>
        <option value="">Select the device to report</option>
        {devices.map((device) => {
          return (
            <option key={device.id} value={device.id}>
              ID: {device.id}, Battery: {device.battery}%, Level: {device.level}
              %
            </option>
          );
        })}
      </select>
      <input type="text" placeholder="Issue Title..." />
      <textarea
        rows="5"
        placeholder="Describe the issue in detail..."
      ></textarea>
      <button>Submit Feedback</button>
    </div>
  );
}

export default Feedback;
