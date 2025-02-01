import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [financialTip, setFinancialTip] = useState('Loading tip...');
  const [stockPrice, setStockPrice] = useState('Loading stock price...');

  useEffect(() => {
    fetchFinancialTip();
    fetchStockData();
  }, []);

  const fetchFinancialTip = async () => {
    const response = await axios.get('http://localhost:5000/api/tips');
    setFinancialTip(response.data.tip);
  };

  const fetchStockData = async () => {
    const response = await axios.get('http://localhost:5000/api/stocks');
    setStockPrice(`AAPL: $${response.data.price}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Finance Companion</Text>
      <Text style={styles.tip}>Tip of the Day: {financialTip}</Text>
      <Text style={styles.stock}>Current Stock: {stockPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 18,
    marginBottom: 10,
  },
  stock: {
    fontSize: 18,
  },
});