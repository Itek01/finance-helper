import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../components/Navbar';

export default function Portfolio({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-blue-600`}>Portfolio</Text>
        <View style={tw`bg-white p-4 rounded-lg mt-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold`}>Stocks</Text>
          <Text style={tw`text-xl font-bold mt-2`}>$5,000</Text>
          <Text style={tw`text-green-600 mt-2`}>+$100 (2%) Today</Text>
        </View>
        <View style={tw`bg-white p-4 rounded-lg mt-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold`}>Crypto</Text>
          <Text style={tw`text-xl font-bold mt-2`}>$3,000</Text>
          <Text style={tw`text-red-600 mt-2`}>-$50 (1.6%) Today</Text>
        </View>
      </View>
      <Navbar setCurrentScreen={setCurrentScreen} />
    </View>
  );
}