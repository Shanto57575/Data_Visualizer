import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../api/axiosConfig.js";
import Loader from "./Loader.jsx";

const CustomerLifetimeValueChart = () => {
	const [chartOptions, setChartOptions] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"/order/customer-lifetime-value-cohorts"
				);
				const data = response.data;
				setLoading(false);
				const categories = data.map(
					(item) => `${item._id.year}-${item._id.month}`
				);
				const values = data.map((item) => item.cohortValue);

				setChartOptions({
					chart: {
						type: "column",
						backgroundColor: "#222222",
					},
					title: {
						text: "Customer Lifetime Value by Cohorts",
						style: {
							color: "#ecf0f1",
							fontSize: "24px",
						},
					},
					xAxis: {
						categories: categories,
						title: {
							text: "Cohort Time",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
						},
					},
					yAxis: {
						title: {
							text: "Value",
							style: { color: "#ecf0f1" },
						},
						labels: {
							style: { color: "#bdc3c7" },
							formatter: function () {
								return Highcharts.numberFormat(this.value, 2);
							},
						},
					},
					plotOptions: {
						column: {
							dataLabels: {
								enabled: true,
								color: "#ecf0f1",
								formatter: function () {
									return Highcharts.numberFormat(this.y, 2);
								},
							},
						},
					},
					series: [
						{
							name: "Cohort Value",
							data: values,
							color: "#3498db",
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
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.85)",
						style: { color: "#F0F0F0" },
					},
				});
			} catch (error) {
				console.error("Error fetching customer lifetime value data:", error);
			}
		};

		fetchData();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="w-full p-2 md:p-5 font-serif">
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

export default CustomerLifetimeValueChart;
