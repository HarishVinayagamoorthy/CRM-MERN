// AllTickets.js
import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
 

const AllTickets = () => {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = userData.role === "admin" ? "/tickets/" : "/tickets/user";

        const response = await AxiosService.get(url);
        const { tickets } = response.data;

        // Filter only resolved tickets
        const resolvedTickets = tickets.filter(
          (ticket) => ticket.status === "resolved"
        );
        if (response.status === 200) {
          setResolvedTickets(resolvedTickets);
          setLoading(false);
        }
        // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "resolved":
        return "badge bg-success"; // Green color for resolved status
      case "approved":
        return "badge bg-warning text-dark"; // Yellow color for approved status
      case "pending":
        return "badge bg-danger"; // Red color for pending status
      default:
        return "badge bg-secondary"; // Use a default color for other statuses
    }
  };
  const  handelBackbutton =()=>{
    navigate(-1)
  }

  return (
    <div className="container bg-light p-4 overflow-auto">
      {/* The 'overflow-auto' class adds both horizontal and vertical scrolling if needed */}
      <IoArrowBack onClick={handelBackbutton} style={{height:"auto",width:"30px"}} />
      <h2 className="text-primary">Resolved Tickets</h2>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <p className="font-weight-bold">
            Total Resolved Tickets: {resolvedTickets.length}
          </p>
          <div
            className="table-responsive"
            style={{ maxHeight: "450px", overflowY: "auto" }}
          >
            <ul className="list-group">
              {resolvedTickets.map((ticket) => (
                <li key={ticket._id} className="list-group-item">
                  <p className="mb-1 text-dark font-weight-bold">
                    Title: {ticket.title}
                  </p>
                  <p className="mb-1">
                    Status:{" "}
                    <span className={getStatusBadgeColor(ticket.status)}>
                      {ticket.status}
                    </span>
                  </p>
                  {/* Add other ticket details you want to display */}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTickets;
