import React, { useState, useEffect } from "react";
import TaskFormModal from "./TaskFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import TaskService from "../TaskService";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

useEffect(() => {
  fetchTasks();
}, [page, pageSize]); 

  const fetchTasks = () => {
    if (searchKeyword.trim()) {
      TaskService.searchTasks(searchKeyword)
        .then((res) => {
          setTasks(res.data);
          setTotalPages(1); // assume no pagination in search
        })
        .catch((err) => console.error("Search failed:", err));
    } else {
      TaskService.getPaginatedTasks(page, pageSize)
        .then((res) => {
          setTasks(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchTasks();
  };

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
    TaskService.deleteTask(taskToDelete.id)
      .then(() => {
        fetchTasks();
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleSaveTask = (task) => {
    const action = modalMode === "edit"
      ? TaskService.updateTask(task.id, task)
      : TaskService.createTask(task);
    action
      .then(() => fetchTasks())
      .catch((err) => console.error(`${modalMode} failed:`, err));
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage);
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
          <button className="btn btn-warning" onClick={() => {
            setModalMode("create");
            setTaskToEdit(null);
            setShowModal(true);
          }}>New Task</button>
          <button className="btn btn-warning" onClick={fetchTasks}>Refresh</button>
        </div>
      </div>

      <div className="mb-3 d-flex justify-content-end">
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn btn-outline-secondary" onClick={handleSearch}>
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
              <td>{task.assignTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-sm btn-light dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ▾
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleEdit(task)}>
                      <i className="bi bi-pencil me-2"></i>Edit</button></li>
                    <li><button className="dropdown-item text-danger" onClick={() => handleDeleteClick(task)}>
                      <i className="bi bi-trash3 me-2"></i>Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
    <div className="d-flex justify-content-between align-items-center mt-3">
  {/* Page size selector */}
  <div className="d-flex align-items-center">
    <select
      className="form-select form-select-sm w-auto"
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
        setPage(0);
      }}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>

  {/* Pagination controls */}
  <nav>
    <ul className="pagination pagination-sm mb-0">
      <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(0)}>« First</button>
      </li>
      <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(page - 1)}>‹ Prev</button>
      </li>
      <li className="page-item active">
        <span className="page-link">{page + 1}</span>
      </li>
      <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next ›</button>
      </li>
      <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>Last »</button>
      </li>
    </ul>
  </nav>
</div>

      <TaskFormModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSaveTask}
        mode={modalMode} taskDataToEdit={taskToEdit} />

      <DeleteConfirmModal show={showDeleteModal}
        taskName={taskToDelete?.assignedTo || "this task"}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
