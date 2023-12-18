import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import AxiosService from "../../utils/ApiService";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosService.get("/user/getdata"); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div style={{ width: "auto", height: "270px", alignContent: "center" }}>
      
        {userData && (
          <Line
            data={{
              labels: ["Total Users", "Active Users", "Inactive Users"],
              datasets: [
                {
                  label: "Number of Users",
                  data: [
                    userData.totalUsers,
                    userData.activeUsers,
                    userData.inactiveUsers,
                  ],
                  backgroundColor: "rgba(52, 152, 219, 0.2)",
                  borderColor: "rgba(52, 152, 219, 1)",
                  borderWidth: 2,
                },
              ],
            }}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
