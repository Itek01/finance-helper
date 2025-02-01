import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar component

export default function Home() {
  const [tip, setTip] = useState("Loading...");
  const [stockPrice, setStockPrice] = useState("Loading stock price...");

  useEffect(() => {
    fetchFinancialTip();
    fetchStockData();
  }, []);

  const fetchFinancialTip = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tips");
      setTip(response.data.tip);
    } catch (error) {
      console.error("Error fetching financial tip:", error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stocks");
      setStockPrice(`AAPL: $${response.data.price}`);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Simplify Your Financial Wellness
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Manage your expenses, track your savings, and achieve your financial
          goals with ease.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200">
          Get Started
        </button>
      </header>

      {/* Financial Info Section */}
      <main className="container mx-auto mt-8 px-4">
        <div className="bg-white p-6 shadow rounded-lg">
          <p className="text-lg text-gray-700">
            <strong>Tip of the Day:</strong> {tip}
          </p>
          <p className="mt-4 text-lg text-gray-700">
            <strong>Current Stock Price:</strong> {stockPrice}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 p-6 text-center">
        <p>&copy; 2025 FinLite. All rights reserved.</p>
      </footer>
    </div>
  );
}
