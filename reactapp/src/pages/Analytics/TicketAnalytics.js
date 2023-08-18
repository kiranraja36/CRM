import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);
const TicketAnalytics = () => {
  const [ticketAnalytics, setTicketAnalytics] = useState(null);

  useEffect(() => {
    fetchTicketAnalytics();
  }, []);

  const fetchTicketAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/analytics/ticketStatus');
      setTicketAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderChart = () => {
    if (ticketAnalytics) {
      const { totalTickets, openTickets, assignedTickets, resolvedTickets, reopenedTickets } = ticketAnalytics;

      const data = {
        labels: ['OPEN TICKETS', 'ASSIGNED TICKETS', 'RESOLVED TICKETS', 'REOPENED TICKETS'],
        datasets: [
          {
            data: [openTickets, assignedTickets, resolvedTickets, reopenedTickets],
            backgroundColor: ['#55c0eb','#65e965','#e5ed4a','#f05a5a'],
          },
        ],
        totalTickets: totalTickets,
      };

      const options = {
        plugins: {
          legend: {
            position: 'right',
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        width: 200, // Adjust the width of the chart
        height: 200,
      };

      return (
        <div className="ticket-container" style={{ display: 'flex' }}>
          <div className="chart-container">
            <p>Total Tickets: {data.totalTickets}</p>
            <Pie data={data} options={options} />
          </div>
        </div>
      );
    }
  };

  return <div className="ticket-analytics">{renderChart()}</div>;
};

export default TicketAnalytics;
