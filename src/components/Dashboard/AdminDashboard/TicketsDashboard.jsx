import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import AxiosService from "../../utils/ApiService";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { toast } from "react-toastify";
import styles from "./Dashboard.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../Spiner/Spiner";
import { Status } from "../../utils/Status"; // Replace with the correct path

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [tickets, setTickets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const logout = useLogout();

  const getTickets = async () => {
    try {
      const url = userData.role === "admin" ? "/tickets/" : "/tickets/user";
      const res = await AxiosService.get(url);
      if (res.status === 200) {
        setTickets(res.data.tickets);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
    searchTickets(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const searchTickets = (input) => {
    const filteredTickets = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(input.toLowerCase()) ||
        ticket._id.includes(input)
    );
    setSearchResults(filteredTickets);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems =
    searchResults.length > 0
      ? searchResults.filter((item) =>
          filterStatus ? item.status === filterStatus : true
        )
      : tickets.filter((item) =>
          filterStatus ? item.status === filterStatus : true
        );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {loading ? (
        <Spinner /> // Show the spinner when loading
      ) : (
        <div className={`card mb-4 ${styles.userTable}`}>
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Tickets Data
          </div>

          <div className="card-body">
            <div className="mb-1 d-flex justify-content-around col-sm-12">
              <div className="mb-3  col-sm-6">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <SearchIcon />
                  </span>
                </div>
              </div>
              &nbsp; &nbsp;
              <div className="justify-content-end col-sm-2">
                <label className="me-2">Filter Status:</label>
                <select
                  value={filterStatus}
                  onChange={handleFilterStatusChange}
                  className="form-select me-2"
                >
                  <option value="">All</option>
                  <option value={Status.PENDING}>Pending</option>
                  <option value={Status.APPROVED}>Approved</option>
                  <option value={Status.RESOLVED}>Resolved</option>
                </select>
              </div>
            </div>
            <div
              className="table-container"
              style={{ maxHeight: "430px", overflowY: "auto" }}
            >
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Solution</th>
                    <th>Created Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((e, i) => {
                    const createdAt = new Date(e.createdAt);
                    const createdDate = createdAt.toLocaleDateString();

                    let solutionContent = e.solution; // Default to the solution from the ticket

                    // Customize the solution content based on the ticket status
                    if (e.status === Status.PENDING) {
                      solutionContent =
                        "Your ticket is in progress. We'll update you soon. Thanks for your patience!";
                    } else if (e.status === Status.APPROVED) {
                      solutionContent = ` You can join a Google Meet to discuss further:https://meet.google.com/nxj-bwwb-mwp`;
                    }
                    if (e.status === Status.RESOLVED) {
                      solutionContent = `${e.reason}`;
                    }
                    return (
                      <tr
                        key={e._id}
                        onClick={() => navigate(`/ticket/${e._id}`)}
                        className="cursor-pointer"
                      >
                        <td>{i + 1 + indexOfFirstItem}</td>
                        <td>{e.title}</td>
                        <td>
                          <img
                            src={e.imageUrl}
                            className="table-image img-thumbnail"
                            alt={e.title}
                          />
                        </td>
                        <td>{solutionContent}</td>
                        <td>{createdDate}</td>
                        <td>{e.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <nav>
              <ul className="pagination">
                {[
                  ...Array(
                    Math.ceil(filteredItems.length / itemsPerPage)
                  ).keys(),
                ].map((number) => (
                  <li
                    key={number + 1}
                    className={`page-item ${
                      currentPage === number + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(number + 1)}
                      className="page-link"
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
