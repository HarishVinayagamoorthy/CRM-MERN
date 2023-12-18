import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import { Card } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import { Line } from "react-chartjs-2";
import styles from "../AdminDashboard/TaskDashboard.module.css";

const TaskDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    submittedTasks: 0,
  });

  const animatedTotalTasks = useSpring({
    value: dashboardData.totalTasks,
    from: { value: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get("/task/user");
        const taskData = response.data;

        // Calculate total, pending, and submitted tasks based on the fetched data
        const totalTasks = taskData.length;
        const pendingTasks = taskData.filter(
          (task) => task.status === "Pending"
        ).length;
        const submittedTasks = taskData.filter(
          (task) => task.status === "Submitted"
        ).length;

        setDashboardData({
          totalTasks,
          pendingTasks,
          submittedTasks,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Total Tasks", "Pending Tasks", "Submitted Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [
          dashboardData.totalTasks,
          dashboardData.pendingTasks,
          dashboardData.submittedTasks,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "auto", height: "auto", alignItems: "center" }}>
     

      {/* Chart for Tasks */}
      <Card className={`${styles.card} ${styles.chartCard}`}>
        <Card.Body>
          <Card.Title>Tasks Chart</Card.Title>
          <Line data={chartData} options={chartOptions} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskDashboard;
