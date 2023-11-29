import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MdLogin } from "react-icons/md";


const defaultCredsForAdmins = {
  username: "123",
  password: "123",
};
const defaultCredsForEmployees = {
  username: "qwe",
  password: "qwe",
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
    } else {
      seterrorMessage("Wrong Credentials...");
      return;
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
      <FloatingLabel
        controlId="floatingInput"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </FloatingLabel>

      {errorMessage && <p>{errorMessage}</p>}
      <div className={styles.buttons_in_row}>
        <Button variant="warning" onClick={clearInputs}>
          CLEAR
        </Button>

        <Button variant="success" onClick={login}>
          <div className="icon_and_text">
            <MdLogin size="20px" /> Log In
          </div>
        </Button>
      </div>
    </div>
  );
}

export default Login;
