import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import UserTaskDashoard from "./UserTaskDashboard";
import UserTicketsDashboard from "./UserTicketsDashoard";
import UserAreachart from "./UserAreachart";
import Spinner from "../../Spiner/Spiner"; // Adjust the path to the Spinner component
import { Link } from "react-router-dom";
import styles from "../AdminDashboard/Dashboard.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState({
    totalTickets: 0,
    resolvedTickets: 0,
    approvedTickets: 0,
    pendingTickets: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get("/tickets/user");
        const data = response.data;
        setTicketData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  if (loading) {
    // Display a loading spinner while data is being fetched
    return <Spinner />;
  }
  return (
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh )" }}
    >
      <div className="row">
        {/* Card for Total Tickets */}
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-primary text-white mb-4`}>
            <div className="card-body">
              Total Tickets: {ticketData.totalTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/all">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Card for Resolved Tickets */}
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-success text-white mb-4`}>
            <div className="card-body">
              Resolved Tickets: {ticketData.resolvedTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/resolved">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Card for Approved Tickets */}
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-warning text-white mb-4`}>
            <div className="card-body">
              Approved Tickets: {ticketData.approvedTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/approved">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Card for Pending Tickets */}
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-danger text-white mb-4`}>
            <div className="card-body">
              Pending Tickets: {ticketData.pendingTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/pending">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div
            className={`card mb-4 bg-transparent text-white ${styles.chartCard}`}
          >
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Task Progress Bar
            </div>
            <div className="card-body ">
              {/* Add your chart component here with the corresponding data */}
              <UserTaskDashoard />
            </div>
          </div>
        </div>

        <div className="col-xl-6 ">
          <div className={`card mb-4  ${styles.Donuts}`}>
            <div className="card-header text-dark">
              <i className="fas fa-chart-bar me-1"></i>
              Tickets Bar Chart
            </div>
            <div className={`card-body ${styles.Donuts}`}>
              <UserTicketsDashboard />
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className={`card mb-4 bg-transparent ${styles.Donuts}`}>
            <div className={`card-body ${styles.Donuts}`}>
              <UserAreachart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
