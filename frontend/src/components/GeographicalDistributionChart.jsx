import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3d from "highcharts/highcharts-3d";
import axios from "../api/axiosConfig.js";

Highcharts3d(Highcharts);

const GeographicalDistributionChart = () => {
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"/customer/customer-geographical-distribution"
				);
				const data = response.data;

				const series = [
					{
						name: "Customers",
						data: data.map((item) => ({
							name: item._id,
							y: item.count,
						})),
					},
				];

				setChartOptions({
					chart: {
						type: "pie",
						options3d: {
							enabled: true,
							alpha: 45,
							beta: 0,
						},
						backgroundColor: "#222222",
						style: {
							fontFamily: "'Unica One', sans-serif",
						},
					},
					title: {
						text: "Geographical Distribution of Customers",
						style: {
							color: "#E0E0E3",
							fontSize: "20px",
							fontWeight: "bold",
						},
					},
					plotOptions: {
						pie: {
							innerSize: "50%",
							depth: 45,
							dataLabels: {
								enabled: true,
								format: "<b>{point.name}</b>: {point.percentage:.1f}%",
								style: {
									color: "#E0E0E3",
									textOutline: "none",
								},
								connectorColor: "#E0E0E3",
							},
						},
					},
					series: series,
					colors: [
						"#2b908f",
						"#90ee7e",
						"#f45b5b",
						"#7798BF",
						"#aaeeee",
						"#ff0066",
						"#eeaaee",
						"#55BF3B",
						"#DF5353",
						"#7798BF",
						"#aaeeee",
					],
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.85)",
						style: {
							color: "#F0F0F0",
						},
					},
					credits: {
						style: {
							color: "#666",
						},
					},
					labels: {
						style: {
							color: "#707073",
						},
					},
					drilldown: {
						activeAxisLabelStyle: {
							color: "#F0F0F3",
						},
						activeDataLabelStyle: {
							color: "#F0F0F3",
						},
					},
				});
			} catch (error) {
				console.error("Error fetching geographical distribution data:", error);
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

export default GeographicalDistributionChart;
