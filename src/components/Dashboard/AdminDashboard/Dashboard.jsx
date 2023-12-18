import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css"; // Import the CSS module
import AxiosService from "../../utils/ApiService";
import TicketAreaChart from "./TicketAreaChart";
import UserDataChart from "../UserDashbooard/UserDataChart";
import CircleProgressBar from "./CircleProgressBar";
import TaskDashboard from "./TaskDashboard";
import Spinner from "../../Spiner/Spiner";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [ticketData, setTicketData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket data
        const ticketResponse = await AxiosService.get("/tickets/");
        //
        setTicketData(ticketResponse.data);
        // Fetch user data
        const userResponse = await AxiosService.get("/user/getdata");
        setUserData(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh )" }}
    >
      {/* Cards */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-primary text-white mb-4 ${styles.card}`}>
            <div className="card-body">
              Total Tickets: {ticketData.totalTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/all">
                <a className="small text-white stretched-link">View Details</a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className={`card bg-success text-white mb-4 ${styles.card}`}>
            <div className="card-body">
              Resolved Tickets:{ticketData.resolvedTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/resolved">
                <a className="small text-white stretched-link">View Details</a>
              </Link>
              <p className="card-text"></p>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className={`card bg-warning text-white mb-4 ${styles.card}`}>
            <div className="card-body">
              Approved Tickets:{ticketData.approvedTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/approved">
                <a className="small text-white stretched-link">View Details</a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Add similar updates for other cards */}
        <div className="col-xl-3 col-md-6">
          <div className={`card bg-danger text-white mb-4 ${styles.card}`}>
            <div className="card-body">
              {" "}
              Pending Tickets:{ticketData.pendingTickets}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link to="/dashboard/pending">
                <a className="small text-white stretched-link">View Details</a>
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-xl-6">
          <div className={`card mb-4  ${styles.chartCard}`}>
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Task Pogress Bar
            </div>
            <div className="card-body ">
              {/* Add your chart component here with the corresponding data */}

              <TaskDashboard />
            </div>
          </div>
        </div>

        <div className="col-xl-6 ">
          <div className={`card mb-4 bg-transparent ${styles.Donuts}`}>
            <div className="card-header">
             
            </div>
            <div className={`card-body ${styles.Donuts}`}>
              <UserDataChart />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className={`card mb-4 ${styles.chartCard} `}>
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Ticket Bar
            </div>
            <div className="card-body">
              {/* Add your chart component here with the corresponding data */}

              <TicketAreaChart />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className={`card mb-4 ${styles.chartCard} `}>
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              User Line chart
            </div>
            <div className="card-body">
              {/* Add your chart component here with the corresponding data */}
              <CircleProgressBar />
            </div>
          </div>
        </div>
      </div>

      {/* DataTable */}
    </div>
  );
};

export default Dashboard;
