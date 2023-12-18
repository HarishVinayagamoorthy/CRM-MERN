// EditTaskForm.js
import React, { useState } from "react";

const EditTaskForm = ({ task, onUpdate, onHide }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update using onUpdate callback
    onUpdate(formData);
    onHide(); // Close the modal
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="assignedTo" className="form-label">
          Assigned To
        </label>
        <input
          type="text"
          className="form-control"
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Task
      </button>
    </form>
  );
};

export default EditTaskForm;
