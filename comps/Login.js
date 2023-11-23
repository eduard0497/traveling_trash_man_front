import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

const defaultCredsForAdmins = {
  username: "1234",
  password: "1234",
};
const defaultCredsForEmployees = {
  username: "qwerty",
  password: "qwerty",
};

function Login() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [errorMessage, seterrorMessage] = useState("");

  const login = () => {
    if (!username || !password) {
      seterrorMessage("Fields are empty...");
      return;
    } else if (
      username == defaultCredsForAdmins.username &&
      password == defaultCredsForAdmins.password
    ) {
      router.push("/admin-dashboard");
    } else if (
      username == defaultCredsForEmployees.username &&
      password == defaultCredsForEmployees.password
    ) {
      router.push("/employee-dashboard");
    }
  };

  const clearInputs = () => {
    setusername("");
    setpassword("");
    seterrorMessage("");
  };

  return (
    <div className={styles.login_container}>
      <h1>Waste Bin Level Management</h1>
      <input
        type="text"
        placeholder="Email..."
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <div className={styles.buttons_in_row}>
        <button className={styles.clear_button} onClick={clearInputs}>
          CLEAR
        </button>
        <button className={styles.login_button} onClick={login}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
