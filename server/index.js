const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// API route for financial tips
app.get('/api/tips', (req, res) => {
  res.json({
    tip: "Set aside at least 10% of your monthly income for investments.",
  });
});

// API route for stock data (example using AAPL)
app.get('/api/stocks', async (req, res) => {
  try {
    const response = await axios.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY');
    res.json({
      symbol: 'AAPL',
      price: response.data.c,
    });
  } catch (error) {
    res.status(500).send('Error fetching stock data.');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));