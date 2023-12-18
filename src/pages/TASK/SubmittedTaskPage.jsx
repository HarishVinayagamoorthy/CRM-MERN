
import React, { useState, useEffect } from "react";
import AxiosService from "../../components/utils/ApiService";
import { Card, Form, Pagination, Container, Row, Col } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../components/Spiner/Spiner"; // Replace with the correct path to your Spinner component

const SubmittedTaskPage = () => {
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Submitted");
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [submittedTaskCount, setSubmittedTaskCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  const fetchSubmittedTasks = async () => {
    try {
      setLoading(true);

      const params = statusFilter ? { status: statusFilter } : {};
      const response = await AxiosService.get("/task/tasks/status", { params });

      setTotalTasks(response.data.length);
      setPendingTasks(response.data.filter((task) => task.status === "Pending").length);
      setSubmittedTaskCount(response.data.filter((task) => task.status === "Submitted").length);
      setSubmittedTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching submitted tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmittedTasks();
  }, [statusFilter]);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, statusFilter, submittedTasks]);

  const fetchIndividualUserEmail = async (userId) => {
    try {
      const response = await AxiosService.get(`/user/getuser/${userId}`);
      return response.data.email;
    } catch (error) {
      console.error("Error fetching individual user:", error);
      return ""; // Return an empty string or handle the error as needed
    }
  };
  const filterTasks = async () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    const filteredTasks = await Promise.all(
      submittedTasks.map(async (task) => {
        const email = await fetchIndividualUserEmail(task.assignedTo);
        return { ...task, email };
      })
    );
  
    const filteredAndSearchedTasks = filteredTasks.filter((task) => {
      const lowerCaseTaskId = task._id.toLowerCase();
      const taskIdIncludes = lowerCaseTaskId.includes(lowerCaseSearchTerm);
      const emailIncludes = task.email && task.email.toLowerCase().includes(lowerCaseSearchTerm);
      const titleIncludes = task.title.toLowerCase().includes(lowerCaseSearchTerm);
      const descriptionIncludes = task.description.toLowerCase().includes(lowerCaseSearchTerm);
  
      return taskIdIncludes || emailIncludes || titleIncludes || descriptionIncludes;
    });
  
    setFilteredTasks(filteredAndSearchedTasks);
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading && <Spinner />} {/* Show the spinner when loading */}
      <Container>
        <Card className={`mb-4`}>
          <Card.Header>
            <i className="fas fa-table me-1"></i>
            Submitted Tasks
          </Card.Header>

          <Card.Body>
            <Row className="mt-2">
              <Col sm={4}>
                <div className="text-center">
                  {statusFilter === "Pending" && (
                    <div className="mb-3">
                      <h4>Pending Tasks: {pendingTasks}</h4>
                    </div>
                  )}

                  {statusFilter === "Submitted" && (
                    <div>
                      <h4>Submitted Tasks: {submittedTaskCount}</h4>
                    </div>
                  )}
                </div>
              </Col>

              <Col sm={4} className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search by Title, or Description"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <SearchIcon />
                  </span>
                </div>
              </Col>

              <Col sm={4} className="justify-content-end">
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                </select>
              </Col>
            </Row>

            <div
              className="table-container"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {currentTasks.length === 0 ? (
                <p className="text-center">No submitted tasks found</p>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {currentTasks.map((task) => (
                    <Col key={task._id} className="mb-4">
                      <Card style={{ height: "100%" }}>
                        <Card.Body>
                          <Card.Title className="mb-3">
                            Title: {task.title}
                          </Card.Title>
                          <Card.Text className="mb-2">
                            Description: {task.description}
                          </Card.Text>
                          <Card.Text className="mb-2">
                            FrontendUrl: {task.frontendUrl}
                          </Card.Text>
                          <Card.Text className="mb-2">
                            BackendUrl: {task.backendUrl}
                          </Card.Text>
                          <Card.Text className="mb-2">
                            Submitted By: {task.assignedTo}
                          </Card.Text>
                          <Card.Text>Email: {task.email}</Card.Text>
                          <Card.Text>Status: {task.status}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[
                  ...Array(
                    Math.ceil(filteredTasks.length / tasksPerPage)
                  ).keys(),
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
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SubmittedTaskPage;



