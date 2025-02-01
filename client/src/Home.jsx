import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tip, setTip] = useState('Loading...');
  const [stockPrice, setStockPrice] = useState('Loading stock price...');

  useEffect(() => {
    fetchFinancialTip();
    fetchStockData();
  }, []);

  const fetchFinancialTip = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tips');
      setTip(response.data.tip);
    } catch (error) {
      console.error("Error fetching financial tip:", error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stocks');
      setStockPrice(`AAPL: $${response.data.price}`);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Finance Companion</h1>

      <div className="bg-white p-6 shadow rounded-lg">
        <p className="text-lg text-gray-700">
          <strong>Tip of the Day:</strong> {tip}
        </p>
        <p className="mt-4 text-lg text-gray-700">
          <strong>Current Stock Price! :</strong> {stockPrice}
        </p>
      </div>
    </div>
  );
}