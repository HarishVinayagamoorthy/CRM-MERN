import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Pagination,
  Form,
  Container,
  Row,
  Col,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";
import AxiosService from "../../components/utils/ApiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";

import SearchIcon from "@mui/icons-material/Search";
// import Spinner from '../Spiner/Spiner';

const Spinner = () => (
  <div className="d-flex justify-content-center mt-5">
    <BootstrapSpinner animation="border" variant="light" role="status">
      <span className="sr-only">Loading...</span>
    </BootstrapSpinner>
  </div>
);

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const tasksPerPage = 10;

  const fetchTasks = async () => {
    try {
      const response = await AxiosService.get("/task/user");
      setTasks(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmittedTask = async () => {
    toast.error("Task already submitted");
  };

  const handleStatusFilterChange = (e) => {
    setCurrentPage(1);
    setStatusFilter(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setCurrentPage(1);
    setSortOrder(e.target.value);
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => (statusFilter ? task.status === statusFilter : true));

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container ">
      {loading ? (
        <Spinner /> // Display the spinner while loading
      ) : (
        <div className={`card mb-4 ${styles.userTable}`}>
          <div className="card-header  ">
            <i className="fas fa-table me-1"></i>
            Task List
          </div>

          <div className="card-body">
            <Row className="mt-2">
              <Col sm={4} className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setCurrentPage(1); // Reset page when searching
                      setSearchTerm(e.target.value);
                    }}
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <SearchIcon />
                  </span>
                </div>
              </Col>

              <Col sm={4} className="justify-content-end">
                <select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  className="form-select"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </Col>

              <Col sm={4} className="justify-content-end">
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="form-select"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                </select>
              </Col>
            </Row>

            <div
              className="table-responsive"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <table
                id="datatablesSimple"
                className={`table ${styles.userTable}`}
              >
                <thead className="thead-dark">
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task, id) => (
                    <tr key={task._id}>
                      <td>{id + 1}</td>

                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                      <td>{task.status}</td>
                      <td>
                        {task.status === "Submitted" ? (
                          <Button
                            variant="danger"
                            onClick={handleSubmittedTask}
                          >
                            Submitted
                          </Button>
                        ) : (
                          <Link to={`/task/${task._id}`}>
                            <Button variant="primary"> To Submit </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
              <Pagination>
                {[
                  ...Array(Math.ceil(sortedTasks.length / tasksPerPage)).keys(),
                ].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
