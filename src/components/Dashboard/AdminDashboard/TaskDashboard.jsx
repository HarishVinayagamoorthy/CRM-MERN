// TaskDashboard.js
import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import { ProgressBar, Card } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import styles from "./TaskDashboard.module.css"; // Import your custom styles
const TaskDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    submittedTasks: 0,
    tasks: [],
  });

  const animatedTotalTasks = useSpring({
    value: dashboardData.totalTasks,
    from: { value: 0 },
  });
  const animatedPendingTasks = useSpring({
    value: dashboardData.pendingTasks,
    from: { value: 0 },
  });
  const animatedSubmittedTasks = useSpring({
    value: dashboardData.submittedTasks,
    from: { value: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get("/task/tasks");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate the percentage of pending and submitted tasks
  const pendingPercentage =
    Math.round((dashboardData.pendingTasks / dashboardData.totalTasks) * 100) ||
    0;
  const submittedPercentage =
    Math.round(
      (dashboardData.submittedTasks / dashboardData.totalTasks) * 100
    ) || 0;

  return (
    <div style={{ width: "auto", height: "auto", alignItems: "center" }}>

      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Total Tasks</Card.Title>
          <animated.span className={styles.propertyValue}>
            {animatedTotalTasks.value.interpolate((val) => val.toFixed(0))}
          </animated.span>
        </Card.Body>
      </Card>

      {/* Progress bar for Pending Tasks */}
      <Card className={`${styles.card} ${styles.warningCard}`}>
        <Card.Body>
          <Card.Title>Pending Tasks</Card.Title>
          <animated.span className={styles.propertyValue}>
            {animatedPendingTasks.value.interpolate((val) => val.toFixed(0))}
          </animated.span>
          <ProgressBar
            now={pendingPercentage}
            label={`${pendingPercentage}%`}
            variant="warning"
          />
        </Card.Body>
      </Card>

      {/* Progress bar for Submitted Tasks */}
      <Card className={`${styles.card} ${styles.successCard}`}>
        <Card.Body>
          <Card.Title>Submitted Tasks</Card.Title>
          <animated.span className={styles.propertyValue}>
            {animatedSubmittedTasks.value.interpolate((val) => val.toFixed(0))}
          </animated.span>
          <ProgressBar
            now={submittedPercentage}
            label={`${submittedPercentage}%`}
            variant="success"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskDashboard;
