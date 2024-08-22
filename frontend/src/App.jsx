import { useState, useEffect } from "react";
import CustomerLifetimeValueChart from "./components/CustomerLifetimeValueChart";
import GeographicalDistributionChart from "./components/GeographicalDistributionChart";
import NewCustomersChart from "./components/NewCustomersChart";
import RepeatCustomersChart from "./components/RepeatCustomersChart";
import SalesGrowthRateChart from "./components/SalesGrowthRateChart";
import TotalSalesChart from "./components/TotalSalesChart";

const LoadingSpinner = () => (
	<div className="flex justify-center items-center h-screen">
		<div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-sky-600"></div>
	</div>
);

const App = () => {
	const [activeTab, setActiveTab] = useState("TotalSales");
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(true);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, [activeTab]);

	const renderChart = () => {
		if (loading) return <LoadingSpinner />;

		switch (activeTab) {
			case "TotalSales":
				return <TotalSalesChart />;
			case "SalesGrowthRate":
				return <SalesGrowthRateChart />;
			case "NewCustomers":
				return <NewCustomersChart />;
			case "RepeatCustomers":
				return <RepeatCustomersChart />;
			case "GeographicalDistribution":
				return <GeographicalDistributionChart />;
			case "CustomerLifetimeValue":
				return <CustomerLifetimeValueChart />;
			default:
				return <TotalSalesChart />;
		}
	};

	return (
		<div
			className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
		>
			<div className="font-serif p-4 min-h-screen">
				<div className="max-w-7xl mx-auto my-4 flex flex-col sm:flex-row sm:justify-between items-center mb-6">
					<h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-black text-sky-600 underline mb-4 sm:mb-0">
						Data Visualizer
					</h1>
					<button
						onClick={toggleTheme}
						className="bg-sky-600 hover:bg-sky-500 hover:shadow-2xl hover:shadow-cyan-400 duration-500 text-white px-4 py-2 rounded-lg font-bold"
					>
						{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
					</button>
				</div>
				<div className="flex flex-wrap justify-center mb-4 space-x-2 sm:space-x-4">
					{[
						"TotalSales",
						"SalesGrowthRate",
						"NewCustomers",
						"RepeatCustomers",
						"GeographicalDistribution",
						"CustomerLifetimeValue",
					].map((tab) => (
						<button
							key={tab}
							className={`px-2 sm:px-4 py-2 rounded-lg m-2 font-bold text-xs sm:text-base hover:bg-sky-300 hover:text-cyan-900 hover:shadow-2xl hover:shadow-cyan-400 duration-500 ${
								activeTab === tab
									? "bg-sky-600 text-white"
									: darkMode
									? "bg-gray-800 text-gray-400"
									: "bg-gray-200 text-gray-600"
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>
				<div className="rounded-lg max-w-full md:max-w-7xl mx-auto shadow-2xl shaodw-black">
					{renderChart()}
				</div>
			</div>
		</div>
	);
};

export default App;
