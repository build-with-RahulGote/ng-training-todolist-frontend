import React, { useState } from "react";
import { Button, Table, Dropdown, Form, InputGroup, Pagination } from "react-bootstrap";
import TaskFormModal from "./TaskFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const tasks = [
    { id: 1, assignedTo: "User 1", status: "Completed", dueDate: "2024-10-12", priority: "Low", description: "This task is good" },
    { id: 2, assignedTo: "User 2", status: "In Progress", dueDate: "2024-09-14", priority: "High", description: "This" },
    { id: 3, assignedTo: "User 3", status: "Not Started", dueDate: "2024-08-18", priority: "Low", description: "This" },
    { id: 4, assignedTo: "User 4", status: "In Progress", dueDate: "2024-06-12", priority: "Normal", description: "This task is good" }
  ];

  const handleEdit = (task) => {
    setModalMode("edit");
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleted:", taskToDelete);
    setShowDeleteModal(false);
  };

  const handleSaveTask = (task) => {
    console.log(modalMode === "edit" ? "Updated:" : "Created:", task);
  };

  return (
  <div className="container-fluid mt-4 border p-3 rounded shadow-sm bg-white">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-0">
            <i className="bi bi-list-task text-danger me-2"></i> Tasks
          </h5>
          <small className="text-muted">All Tasks</small>
          <div className="text-muted">{tasks.length} records</div>
        </div>

        <div className="d-flex gap-2">
          <Button variant="warning" onClick={() => { setModalMode("create"); setTaskToEdit(null); setShowModal(true); }}>New Task</Button>
          <Button variant="warning">Refresh</Button>
        </div>
      </div>

      <InputGroup className="mb-3 w-25">
        <Form.Control placeholder="Search" />
        <Button variant="outline-secondary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th><Form.Check type="checkbox" /></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><Form.Check type="checkbox" /></td>
              <td><a href="#">{task.assignedTo}</a></td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">▾</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(task)}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDeleteClick(task)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Form.Select style={{ width: "80px" }}>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </Form.Select>

        <Pagination className="mb-0">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>

      <TaskFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
        mode={modalMode}
        taskDataToEdit={taskToEdit}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        taskName={taskToDelete?.assignedTo || "this task"}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
