import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import AxiosService from "../../utils/ApiService";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
} from "chart.js/auto";

Chart.register(LinearScale, CategoryScale, BarController, BarElement);

const TicketChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get("/tickets/user");
        const data = response.data;

        if (chartRef.current) {
          // Update the existing chart data
          chartRef.current.data.labels = [
            "Total Tickets",
            "Resolved Tickets",
            "Approved Tickets",
            "Pending Tickets",
          ];
          chartRef.current.data.datasets[0].data = [
            data.totalTickets,
            data.resolvedTickets,
            data.approvedTickets,

            data.pendingTickets,
          ];
          chartRef.current.update();
        } else {
          // Create a new chart
          const newChartData = new Chart("myChart", {
            type: "bar",
            data: {
              labels: [
                "Total Tickets",
                "Approved Tickets",
                "Resolved Tickets",
                "Pending Tickets",
              ],
              datasets: [
                {
                  label: "Number of Tickets",
                  backgroundColor: ["blue", "green", "orange", "red"],
                  data: [
                    data.totalTickets,
                    data.approvedTickets,
                    data.resolvedTickets,
                    data.pendingTickets,
                  ],
                },
              ],
            },
          });

          setChartData(newChartData);
          chartRef.current = newChartData;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <canvas id="myChart" width="auto" height="225x"></canvas>
    </div>
  );
};

export default TicketChart;
