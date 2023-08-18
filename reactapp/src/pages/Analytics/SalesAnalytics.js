import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, Filler, CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip, ArcElement } from 'chart.js';

Chart.register(Filler, LineElement, LinearScale, CategoryScale, PointElement, Legend, Tooltip, ArcElement);

const SalesAnalytics = () => {
    const [salesData, setSalesData] = useState([]);
    const [salesThisMonth, setSalesThisMonth] = useState(0);

    useEffect(() => {
        fetchSalesAnalytics();
        fetchSalesThisMonth();
    }, []);

    const fetchSalesAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics/totalSalesPerMonth');
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching sales analytics:', error);
        }
    };

    const fetchSalesThisMonth = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics/salesThisMonth');
            setSalesThisMonth(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const processData = () => {
        const labels = [];
        const data = [];
        let totalSalesAmount = 0;

        salesData.forEach((item) => {
            const month = item[0];
            const year = item[1];
            const totalAmount = item[2];
            const label = `${month}/${year}`;
            labels.push(label);
            data.push(totalAmount);
            totalSalesAmount += totalAmount;
        });

        const formattedTotalSalesAmount = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(totalSalesAmount);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Sales per Month',
                    data: data,
                    backgroundColor: 'aqua',
                    borderColor: 'aqua',
                    pointBorderColor: 'rgb(9, 112, 186)',
                    pointBackgroundColor:'rgb(9, 112, 186)',
                    fill: true,
                    tension: 0.5,
                },
            ],
            formattedTotalSalesAmount: formattedTotalSalesAmount,
        };
    };

    const chartData = processData();

    const lineChartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Sales Performance',
                color: 'black',
            },
            legend: true,
        },
        scales: {
            x: {
                grid: {
                    display: true, // Hide x-axis grid lines
                },
            },
            y: {
                grid: {
                    display: true, // Hide y-axis grid lines
                },
                min: 0,
                max: 500000,
            },
        },
    };

    return (
        <div className="sales-analytics">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: '475px', width: '840px' }}>
                    <p>Total Sales Amount: {chartData.formattedTotalSalesAmount}
                        <span style={{ float: 'right' }}>No of Sales This Month: {salesThisMonth}</span></p>
                    <Line data={chartData} options={lineChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;