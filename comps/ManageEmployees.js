import React from "react";
import styles from "../styles/ManageEmployees.module.css";
import { employees } from "../aaa_samples/employees";

function ManageEmployees() {
  return (
    <div className={styles.manage_employees_container}>
      <h1>Manage Employees</h1>
      {employees.map((employee) => {
        return (
          <div className={styles.employee}>
            <h3>ID: {employee.id}</h3>
            <h3>Name: {employee.fname} {employee.lname}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Employee Since: {employee.timestamp}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default ManageEmployees;
