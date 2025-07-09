import React from "react";

export default function DeleteConfirmModal({ show, taskName, onClose, onConfirm }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Delete</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>Do you want to delete task <strong>{taskName}</strong>?</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={onClose}>No</button>
            <button type="button" className="btn btn-warning" onClick={onConfirm}>Yes</button>
          </div>

        </div>
      </div>
    </div>
  );
}
