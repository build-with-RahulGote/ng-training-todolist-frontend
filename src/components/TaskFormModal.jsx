import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const initialFormState = {
  assignedTo: "",
  status: "Not Started",
  dueDate: "",
  priority: "Normal",
  description: "",
};

export default function TaskFormModal({ show, onClose, onSave, mode = "create", taskDataToEdit = null }) {
  const [taskData, setTaskData] = useState(initialFormState);

  useEffect(() => {
    if (mode === "edit" && taskDataToEdit) {
      setTaskData(taskDataToEdit);
    } else {
      setTaskData(initialFormState);
    }
  }, [mode, taskDataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(taskData);
    setTaskData(initialFormState);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "edit" ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label><span className="text-danger">*</span> Assigned To</Form.Label>
                <Form.Select name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>User 1</option>
                  <option>User 2</option>
                  <option>User 3</option>
                  <option>User 4</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label><span className="text-danger">*</span> Status</Form.Label>
                <Form.Select name="status" value={taskData.status} onChange={handleChange}>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Select name="priority" value={taskData.priority} onChange={handleChange}>
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={taskData.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="warning" onClick={onClose}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
