import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../api/axiosConfig.js";

const SalesGrowthRateChart = () => {
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/order/sales-growth-rate", {
					params: { interval: "monthly" },
				});
				const data = response.data;

				setChartOptions({
					chart: {
						backgroundColor: "#222222",
					},
					title: {
						text: "Sales Growth Rate Over Time",
						style: {
							color: "#ecf0f1",
							fontSize: "24px",
						},
					},
					xAxis: {
						categories: data.map(
							(item) => `${item._id.year}-${item._id.month}`
						),
						title: {
							text: "Time",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
						},
					},
					yAxis: {
						title: {
							text: "Growth Rate (%)",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
							formatter: function () {
								return Highcharts.numberFormat(this.value, 2); // Fixed point (2) after the point
							},
						},
					},
					series: [
						{
							name: "Growth Rate",
							type: "column",
							data: data.map((item) => parseFloat(item.growthRate)),
							color: "#3498db",
						},
					],
					plotOptions: {
						column: {
							dataLabels: {
								enabled: true,
								color: "#ecf0f1",
								formatter: function () {
									return Highcharts.numberFormat(this.y, 2); // Fixed point (2) after the point
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
				});
			} catch (error) {
				console.error("Error fetching sales growth rate data:", error);
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

export default SalesGrowthRateChart;
