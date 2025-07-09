import React, { useState, useEffect } from "react";

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
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{mode === "edit" ? "Edit Task" : "New Task"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    <span className="text-danger">*</span> Assigned To
                  </label>
                  <select
                    className="form-select"
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                    <option>User 4</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    <span className="text-danger">*</span> Status
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-warning" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
