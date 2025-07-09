import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmModal({ show, taskName, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ backgroundColor: '#dc3545', color: 'white' }} closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Do you want to delete task <strong>{taskName}</strong>?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onClose}>No</Button>
        <Button variant="warning" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}
