import React, { useState } from "react";
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

  <div className="d-flex justify-content-between align-items-start mb-2">
    <div>
      <h5 className="mb-0">
        <i className="bi bi-list-task text-danger me-2"></i> Tasks
      </h5>
      <small className="text-muted">All Tasks</small>
      <div className="text-muted">{tasks.length} records</div>
    </div>

    <div className="d-flex align-items-center gap-2">
      <button
        className="btn btn-warning"
        onClick={() => {
          setModalMode("create");
          setTaskToEdit(null);
          setShowModal(true);
        }}
      >
        New Task
      </button>
      <button className="btn btn-warning">Refresh</button>
    </div>
  </div>


  <div className="mb-3 d-flex justify-content-end">
    <div className="input-group w-25">
      <input type="text" className="form-control" placeholder="Search" />
      <button className="btn btn-outline-secondary">
        <i className="bi bi-search"></i>
      </button>
    </div>
  </div>

      <table className="table table-bordered table-hover table-responsive">
        <thead className="table-light">
          <tr>
            <th><input type="checkbox" /></th>
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
              <td><input type="checkbox" /></td>
              <td><a href="#">{task.assignedTo}</a></td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">
                    ▾
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleEdit(task)}>Edit</button></li>
                    <li><button className="dropdown-item text-danger" onClick={() => handleDeleteClick(task)}>Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <select className="form-select w-auto">
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>

        <nav>
          <ul className="pagination mb-0">
            <li className="page-item"><a className="page-link" href="#">«</a></li>
            <li className="page-item"><a className="page-link" href="#">‹</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">›</a></li>
            <li className="page-item"><a className="page-link" href="#">»</a></li>
          </ul>
        </nav>
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
