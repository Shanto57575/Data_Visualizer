import { useState } from "react";
import CustomerLifetimeValueChart from "./components/CustomerLifetimeValueChart";
import GeographicalDistributionChart from "./components/GeographicalDistributionChart";
import NewCustomersChart from "./components/NewCustomersChart";
import RepeatCustomersChart from "./components/RepeatCustomersChart";
import SalesGrowthRateChart from "./components/SalesGrowthRateChart";
import TotalSalesChart from "./components/TotalSalesChart";
import {
	Sun,
	Moon,
	BarChart2,
	TrendingUp,
	UserPlus,
	Users,
	Globe,
	DollarSign,
} from "lucide-react";

const App = () => {
	const [activeTab, setActiveTab] = useState("TotalSales");
	const [darkMode, setDarkMode] = useState(true);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	const renderChart = () => {
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

	const tabs = [
		{ key: "TotalSales", label: "Total Sales", icon: <DollarSign size={20} /> },
		{
			key: "SalesGrowthRate",
			label: "Sales Growth Rate",
			icon: <TrendingUp size={20} />,
		},
		{
			key: "NewCustomers",
			label: "New Customers",
			icon: <UserPlus size={20} />,
		},
		{
			key: "RepeatCustomers",
			label: "Repeat Customers",
			icon: <Users size={20} />,
		},
		{
			key: "GeographicalDistribution",
			label: "Geographical Distribution",
			icon: <Globe size={20} />,
		},
		{
			key: "CustomerLifetimeValue",
			label: "Customer Lifetime Value",
			icon: <BarChart2 size={20} />,
		},
	];

	return (
		<div
			className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
		>
			<div className="font-serif p-4 min-h-screen">
				<div className="max-w-7xl mx-auto my-4 flex flex-col sm:flex-row sm:justify-between items-center mb-6">
					<h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-black text-sky-600 underline mb-4 sm:mb-0">
						Data Visualizer
					</h1>
					<button onClick={toggleTheme} className="p-2">
						{darkMode ? (
							<Sun color="#2979FF" size={24} />
						) : (
							<Moon color="blue" size={24} />
						)}
					</button>
				</div>
				<div className="max-w-7xl mx-auto flex fex-col md:flex-row flex-wrap items-center justify-center gap-4">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							className={`flex flex-wrap items-center justify-between rounded-lg px-3 py-3 mb-5 font-bold text-xs sm:text-base hover:bg-sky-300 hover:text-cyan-900 hover:shadow-2xl hover:shadow-cyan-400 duration-500 ${
								activeTab === tab.key
									? "bg-sky-600 text-white"
									: darkMode
									? "bg-gray-800 text-gray-400"
									: "bg-gray-200 text-gray-600"
							}`}
							onClick={() => setActiveTab(tab.key)}
						>
							{tab.icon}
							<span>{tab.label}</span>
						</button>
					))}
				</div>
				<div className="rounded-lg max-w-full md:max-w-7xl mx-auto shadow-2xl shadow-black">
					{renderChart()}
				</div>
			</div>
		</div>
	);
};

export default App;
