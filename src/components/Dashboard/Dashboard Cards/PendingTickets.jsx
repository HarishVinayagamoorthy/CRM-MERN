// AllTickets.js
import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AllTickets = () => {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let navigate = useNavigate()




  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = userData.role === "admin" ? "/tickets/" : "/tickets/user";

        const response = await AxiosService.get(url);
        const { tickets } = response.data;

        // Filter only pending tickets
        const pendingTickets = tickets.filter(
          (ticket) => ticket.status === "pending"
        );
        if (response.status === 200) {
          setPendingTickets(pendingTickets);
          setLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const  handelBackbutton =()=>{
    navigate(-1)
  }

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

  return (
    <div className="container bg-light p-4 overflow-auto">
      {/* The 'overflow-auto' class adds both horizontal and vertical scrolling if needed */}
      <IoArrowBack onClick={handelBackbutton} style={{height:"auto",width:"30px"}} />

      <h2 className="text-primary">Pending Tickets</h2>
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
            Total Pending Tickets: {pendingTickets.length}
          </p>
          <div
            className="table-responsive"
            style={{ maxHeight: "450px", overflowY: "auto" }}
          >
            <ul className="list-group">
              {pendingTickets.map((ticket) => (
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
