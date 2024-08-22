import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../api/axiosConfig.js";

const RepeatCustomersChart = () => {
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"/customer/repeat-customers?timeframe=monthly"
				);
				const data = response.data;

				const categories = data.map((item) => item._id);
				const series = [
					{
						name: "Repeat Customers",
						data: data.map((item) => item.repeatCustomers),
					},
				];

				setChartOptions({
					chart: {
						type: "line", // Using line chart
						backgroundColor: "#222222", // Dark background color
					},
					title: {
						text: "Repeat Customers by Month",
						style: {
							color: "#ecf0f1",
							fontSize: "24px",
						},
					},
					xAxis: {
						categories: categories,
						title: {
							text: "Month",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
						},
					},
					yAxis: {
						title: {
							text: "Number of Repeat Customers",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
							formatter: function () {
								return Highcharts.numberFormat(this.value, 0); // No decimal places needed
							},
						},
					},
					plotOptions: {
						line: {
							dataLabels: {
								enabled: true,
								color: "#ecf0f1",
							},
							enableMouseTracking: true,
						},
					},
					series: series,
					tooltip: {
						formatter: function () {
							return `<b>${
								this.x
							}</b><br><b>Repeat Customers:</b> ${Highcharts.numberFormat(
								this.y,
								0
							)}`;
						},
						backgroundColor: "rgba(0, 0, 0, 0.85)",
						style: {
							color: "#F0F0F0",
						},
					},
					legend: {
						itemStyle: {
							color: "#ecf0f1",
						},
						itemHoverStyle: {
							color: "#3498db",
						},
					},
				});
			} catch (error) {
				console.error("Error fetching repeat customers data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-full p-2 md:p-5 font-serif">
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

export default RepeatCustomersChart;
