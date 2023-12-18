import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import AxiosService from "../../utils/ApiService";

const UserDataChart = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get(`/user/getdata`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    //  <canvas id="myChart" width="400" height="200">
    <div style={{ width: "auto", height: "370px", alignContent: "center" }}>
      {userData && (
        <Doughnut
          data={{
            labels: ["Total Users", "Active Users", "Inactive Users"],
            datasets: [
              {
                data: [
                  userData.totalUsers,
                  userData.activeUsers,
                  userData.inactiveUsers,
                ],
                backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      )}
    </div>
    // </canvas>
  );
};

export default UserDataChart;
