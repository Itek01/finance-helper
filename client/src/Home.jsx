import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Recharts for the pie chart

const Home = () => {
  // Example data structure
  const [data, setData] = useState({
    expenses: 1500,
    spendings: 800,
    debts: 500,
  });
  
  const [viewMode, setViewMode] = useState("table"); // Default view is table

  // Sample data for chart (This can be dynamic from your backend or Firebase)
  const chartData = [
    { name: "Expenses", value: data.expenses },
    { name: "Spendings", value: data.spendings },
    { name: "Debts", value: data.debts },
  ];

  // Toggle between table and chart view
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Chart color palette
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Financial Overview</h1>

      {/* Toggle View Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${viewMode === "table" ? "bg-blue-700" : ""}`}
          onClick={() => toggleViewMode("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 bg-green-500 text-white rounded-lg ${viewMode === "pie" ? "bg-green-700" : ""}`}
          onClick={() => toggleViewMode("pie")}
        >
          Pie Chart View
        </button>
        {/* Add more toggles as needed */}
      </div>

      {/* Display Data in Selected View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Expenses</td>
                <td className="px-4 py-2">${data.expenses}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Spendings</td>
                <td className="px-4 py-2">${data.spendings}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Debts</td>
                <td className="px-4 py-2">${data.debts}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "pie" && (
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
      
      {/* You can add more charts or other visualizations like bar charts or line charts */}
      {/* For example, a bar chart for expense trends over time */}
    </div>
  );
};

export default Home;
