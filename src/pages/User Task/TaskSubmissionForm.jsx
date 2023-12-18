// TaskSubmittingPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosService from "../../components/utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/utils/Sipnners";

const TaskSubmittingPage = () => {
  const navigate = useNavigate();
  let { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [frontendUrl, setFrontendUrl] = useState("");
  const [backendUrl, setBackendUrl] = useState("");
  const [frontendUrlError, setFrontendUrlError] = useState("");
  const [backendUrlError, setBackendUrlError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    try {
      const response = await AxiosService.get(`/task/taskID/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!frontendUrl) {
      setFrontendUrlError("Frontend URL is required");
      isValid = false;
    } else {
      setFrontendUrlError("");
    }

    if (!backendUrl) {
      setBackendUrlError("Backend URL is required");
      isValid = false;
    } else {
      setBackendUrlError("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true); // Set loading to true when submitting

      const response = await AxiosService.put(`/task/submit/${taskId}`, {
        frontendUrl,
        backendUrl,
      });

      if (response && response.data) {
        toast.success(response.data.message);
        navigate("/userTask");
        fetchTask();
        console.log("Task submitted successfully");
      } else {
        console.error("Invalid response:", response);
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error submitting task:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="bg-light p-4 rounded">
            <h1 className="mb-5 text-center">Submit Task</h1>
            <div className="mb-5">
              <strong>Task Title: {task.title}</strong>
            </div>
            <div className="mb-5">
              <strong>Description: {task.description}</strong>
            </div>
            {/* Task Submission Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="needs-validation"
            >
              <div className="mb-5">
                <label htmlFor="frontendUrl" className="form-label">
                  Frontend URL
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    frontendUrlError ? "is-invalid" : ""
                  }`}
                  id="frontendUrl"
                  value={frontendUrl}
                  onChange={(e) => setFrontendUrl(e.target.value)}
                  required
                />
                {frontendUrlError && (
                  <div className="invalid-feedback">{frontendUrlError}</div>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="backendUrl" className="form-label">
                  Backend URL
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    backendUrlError ? "is-invalid" : ""
                  }`}
                  id="backendUrl"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  required
                />
                {backendUrlError && (
                  <div className="invalid-feedback">{backendUrlError}</div>
                )}
              </div>

              <div className="text-center">
                {" "}
                {/* Center the button */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Submit Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSubmittingPage;
