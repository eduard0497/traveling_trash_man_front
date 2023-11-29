import React, { useState } from "react";
import styles from "../styles/ManageEmployees.module.css";
import { employees } from "../aaa_samples/employees";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsPersonAdd } from "react-icons/bs";
import { IoPersonRemove } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ManageEmployees() {
  const [showAddEmployeeModal, setshowAddEmployeeModal] = useState(false);
  return (
    <>
      <div className={styles.manage_employees_container}>
        <div>
          <Button
            variant="success"
            onClick={() => setshowAddEmployeeModal(true)}
          >
            <div className="icon_and_text">
              <BsPersonAdd />
              Add Employee
            </div>
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Since</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.fname + " " + employee.lname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.timestamp}</td>
                  <td>
                    <Button variant="danger">
                      <div className="icon_and_text">
                        <IoPersonRemove />
                        Deactivate
                      </div>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/*  */}

      <Modal
        onHide={() => setshowAddEmployeeModal(false)}
        show={showAddEmployeeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="First Name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Last Name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Email Address" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setshowAddEmployeeModal(false)}
          >
            Close
          </Button>
          <Button variant="primary">ADD</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageEmployees;
