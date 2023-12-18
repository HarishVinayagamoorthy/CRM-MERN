// TaskForm.js

import React, { useState } from "react";
import AxiosService from "../../components/utils/ApiService";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./task.module.css";

const TaskForm = ({ refreshTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setError(""); // Clear error when closing the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!title || !description || !assignedTo) {
            setError("All fields are required");
            return;
        }

        const response = await AxiosService.post("/task/create", {
            title,
            description,
            assignedTo,
        });
        toast.success(response.data.message);

        refreshTasks();

        setTitle("");
        setDescription("");
        setAssignedTo("");
        setError("");

        handleClose();
    } catch (error) {
        console.error("Error creating task:", error.message);

        // Display the backend error message using toast.error
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`Error creating task: ${error.response.data.message}`);
        } else {
            toast.error("An error occurred while creating the task.");
        }
    }
};



  
  return (
    <div className={styles.taskForm}>
      <Button variant="primary" onClick={handleShow}>
        Create Task
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="assignedTo" className="form-label">
                Assigned To (User ID) From User Profile
              </label>
              <input
                type="text"
                className="form-control"
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskForm;
