import React, { useState, useEffect } from "react";
import {
  Pagination,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import AxiosService from "../../components/utils/ApiService";
import SearchIcon from "@mui/icons-material/Search";
import Table from "react-bootstrap/Table";

import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6); // Adjust the number of tasks per page as needed
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState("createdAt");
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    // Fetch submitted tasks from the server when the component mounts
    fetchSubmittedTasks();
  }, [sortOrder, sortBy]);

  const fetchSubmittedTasks = async () => {
    try {
      setLoading(true); // Set loading to true before the API call

      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for fetching tasks
      const response = await AxiosService.get("/task/user", {
        params: {
          sort: sortBy,
          order: sortOrder,
        },
      });
      // Filter tasks by status (assuming "Submitted" is the status you want)
      const submittedTasks = response.data.filter(
        (task) => task.status === "Submitted"
      );
      setTasks(submittedTasks);
      setFilteredTasks(submittedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search functionality
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
    );

    setFilteredTasks(filteredTasks);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Sorting functionality
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Pagination based on sorted tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="container">
      <div className={`card mb-4 ${styles.userTable}`}>
        <div className="card-body">
          <div className="mb-1 d-flex justify-content-around col-sm-12">
            <div className="mb-3  col-sm-6">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
                <span className="input-group-text">
                  <SearchIcon />
                </span>
              </div>
            </div>
            &nbsp; &nbsp;
            <div className=" d-flex justify-content-end col-sm-auto">
              <label className="me-2">Sort by Date:</label>
              <Button
                variant={
                  sortBy === "createdAt" && sortOrder === "asc"
                    ? "outline-primary"
                    : "light"
                }
                onClick={() => setSortOrder("asc")}
                className="mr-2"
              >
                OLd
              </Button>
              <Button
                variant={
                  sortBy === "createdAt" && sortOrder === "desc"
                    ? "outline-primary"
                    : "light"
                }
                onClick={() => setSortOrder("desc")}
              >
                New
              </Button>
            </div>
          </div>
          <div
            className="table-container"
            style={{ maxHeight: "440px", overflowY: "auto" }}
          >
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="row">
                {currentTasks.map((task) => (
                  <div key={task._id} className="col-md-4 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text">
                          <strong>Frontend URL:</strong> {task.frontendUrl}
                        </p>
                        <p className="card-text">
                          <strong>Backend URL:</strong> {task.backendUrl}
                        </p>
                      </div>
                      <div className="card-footer bg-transparent border-top">
                        <small className="text-muted">
                          Status: {task.status}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <nav>
            <Pagination>
              {Array.from({
                length: Math.ceil(sortedTasks.length / tasksPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
