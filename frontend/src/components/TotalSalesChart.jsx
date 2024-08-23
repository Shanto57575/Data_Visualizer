import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../api/axiosConfig.js";
import Loader from "./Loader.jsx";

const TotalSalesChart = () => {
	const [chartOptions, setChartOptions] = useState({});
	const [startDate, setStartDate] = useState("2020-01-01");
	const [endDate, setEndDate] = useState("2023-12-31");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get("/order/sales-over-time", {
				params: { startDate, endDate },
			});
			const data = response.data;

			setChartOptions({
				chart: {
					type: "area",
					backgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
						stops: [
							[0, "#2a2a2b"],
							[1, "#3e3e40"],
						],
					},
				},
				title: {
					text: "Total Sales Over Time",
					style: {
						color: "#E0E0E3",
						fontWeight: "bold",
					},
				},
				xAxis: {
					categories: data.map((item) => `${item._id.year}-${item._id.month}`),
					labels: {
						style: { color: "#E0E0E3" },
					},
					title: {
						text: "Time",
						style: { color: "#E0E0E3" },
					},
					gridLineColor: "#707073",
				},
				yAxis: {
					title: {
						text: "Total Sales",
						style: { color: "#E0E0E3" },
					},
					labels: {
						style: { color: "#E0E0E3" },
					},
					gridLineColor: "#707073",
				},
				tooltip: {
					backgroundColor: "rgba(0, 0, 0, 0.85)",
					style: { color: "#F0F0F0" },
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1,
							},
							stops: [
								[
									0,
									Highcharts.color(Highcharts.getOptions().colors[0])
										.setOpacity(0.3)
										.get("rgba"),
								],
								[
									1,
									Highcharts.color(Highcharts.getOptions().colors[0])
										.setOpacity(0)
										.get("rgba"),
								],
							],
						},
					},
				},
				series: [
					{
						name: "Total Sales",
						data: data.map((item) => item.totalSales),
						color: "#73a7eb",
					},
				],
				legend: {
					itemStyle: {
						color: "#ecf0f1",
					},
					itemHoverStyle: {
						color: "#3498db",
					},
				},
				credits: {
					style: { color: "#666" },
				},
			});
		} catch (error) {
			console.error("Error fetching total sales data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [startDate, endDate]);

	const handleDateChange = (e) => {
		const { name, value } = e.target;
		if (name === "startDate") {
			setStartDate(value);
		} else if (name === "endDate") {
			setEndDate(value);
		}
	};

	if (loading) return <Loader />;

	return (
		<div className="w-full p-2 md:p-5 font-serif">
			<div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-4">
				<div>
					<label htmlFor="startDate" className="mr-2">
						Start Date:
					</label>
					<input
						type="date"
						id="startDate"
						name="startDate"
						value={startDate}
						onChange={handleDateChange}
						style={{
							background: "#3e3e40",
							color: "#E0E0E3",
							border: "none",
							padding: "5px",
							borderRadius: "5px",
						}}
					/>
				</div>
				<div>
					<label htmlFor="endDate" className="mr-2">
						End Date:
					</label>
					<input
						type="date"
						id="endDate"
						name="endDate"
						value={endDate}
						onChange={handleDateChange}
						style={{
							background: "#3e3e40",
							color: "#E0E0E3",
							border: "none",
							padding: "5px",
							borderRadius: "5px",
						}}
					/>
				</div>
			</div>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

export default TotalSalesChart;
