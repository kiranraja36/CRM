import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, RadialLinearScale } from 'chart.js';

Chart.register(ArcElement, RadialLinearScale);

const OpportunityAnalytics = () => {
    const [opportunityAnalytics, setOpportunityAnalytics] = useState(null);

    useEffect(() => {
        fetchOpportunityAnalytics();
    }, []);

    const fetchOpportunityAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics/opportunityStatus');
            setOpportunityAnalytics(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const renderChart = () => {
        if (opportunityAnalytics) {
            const { totalOpportunity, open, needAnalysis, proposal, negotiation, upsell, closedWin, closedLoss } = opportunityAnalytics;

            const data = {
                labels: ['OPEN', 'NEED ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'UPSELL', 'CLOSED WIN', 'CLOSED LOSS'],
                datasets: [
                    {
                        data: [open, needAnalysis, proposal, negotiation, upsell, closedWin, closedLoss],
                        backgroundColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#805952', '#e377c2'],
                    },
                ],
                totalOpportunity: totalOpportunity,
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
                width: 230, // Adjust the width of the chart
                height: 200,
            };

            return (
                <div className="ticket-container" style={{ display: 'flex' }}>
                    <div className="chart-container">
                        <p>Total Opportunity: {data.totalOpportunity}</p>
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
            );
        }
    };
    return <div>{renderChart()}</div>;
}
export default OpportunityAnalytics;