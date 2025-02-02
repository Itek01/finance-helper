import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../components/Navbar';

export default function Dashboard({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-blue-600`}>Dashboard</Text>
        <View style={tw`bg-white p-4 rounded-lg mt-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold`}>Total Portfolio Value</Text>
          <Text style={tw`text-3xl font-bold mt-2`}>$10,000</Text>
          <Text style={tw`text-green-600 mt-2`}>+$200 (2%) Today</Text>
        </View>
      </View>
      <Navbar setCurrentScreen={setCurrentScreen} />
    </View>
  );
}