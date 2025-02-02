import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

export default function Trade({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  const [amount, setAmount] = useState('');

  const handleBuy = () => {
    if (amount) {
      Alert.alert('Buy', `Buying $${amount}`);
    } else {
      Alert.alert('Error', 'Please enter an amount');
    }
  };

  const handleSell = () => {
    if (amount) {
      Alert.alert('Sell', `Selling $${amount}`);
    } else {
      Alert.alert('Error', 'Please enter an amount');
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-blue-600`}>Trade</Text>
        <TextInput
          style={tw`border border-gray-300 p-3 w-full mb-4 rounded-lg`}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button title="Buy" onPress={handleBuy} />
        <View style={tw`mt-4`}>
          <Button title="Sell" onPress={handleSell} variant="secondary" />
        </View>
      </View>
      <Navbar setCurrentScreen={setCurrentScreen} />
    </View>
  );
}