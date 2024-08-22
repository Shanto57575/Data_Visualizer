import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../api/axiosConfig.js";

const NewCustomersChart = () => {
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"/customer/new-customers-over-time?interval=monthly"
				);
				const data = response.data;

				const categories = data.map(
					(item) => `${item._id.year}-${item._id.month}`
				);

				const series = [
					{
						name: "New Customers",
						data: data.map((item) => item.newCustomers),
					},
				];

				setChartOptions({
					chart: {
						type: "column",
						backgroundColor: "#222222",
						style: {
							fontFamily: "'Unica One', sans-serif",
						},
					},
					title: {
						text: "New Customers Over Time",
						style: {
							color: "#ecf0f1",
							fontSize: "24px",
							fontWeight: "bold",
						},
					},
					xAxis: {
						categories: categories,
						labels: {
							style: {
								color: "#bdc3c7",
								fontSize: "14px",
							},
						},
						title: {
							text: "Month",
							style: {
								color: "#ecf0f1",
								fontSize: "16px",
							},
						},
						lineColor: "#7f8c8d",
						tickColor: "#7f8c8d",
					},
					yAxis: {
						title: {
							text: "Number of New Customers",
							style: {
								color: "#ecf0f1",
								fontSize: "16px",
							},
						},
						labels: {
							style: {
								color: "#bdc3c7",
								fontSize: "14px",
							},
						},
						gridLineColor: "rgba(255,255,255,0.1)",
					},
					series: [
						{
							name: "New Customers",
							data: series[0].data,
							color: {
								linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
								stops: [
									[0, "#3498db"],
									[1, "#2980b9"],
								],
							},
						},
					],
					plotOptions: {
						column: {
							borderRadius: 5,
							dataLabels: {
								enabled: true,
								color: "#ecf0f1",
								style: {
									fontSize: "13px",
									fontWeight: "bold",
									textOutline: "1px contrast",
								},
							},
							states: {
								hover: {
									color: "#226ef2",
								},
							},
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
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.85)",
						style: { color: "#F0F0F0" },
					},
					credits: {
						style: {
							color: "#7f8c8d",
						},
					},
				});
			} catch (error) {
				console.error("Error fetching new customers data:", error);
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

export default NewCustomersChart;
