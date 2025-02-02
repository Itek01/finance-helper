import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../components/Navbar';

export default function Account({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-blue-600`}>Account</Text>
        <View style={tw`bg-white p-4 rounded-lg mt-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold`}>Email</Text>
          <Text style={tw`text-gray-600 mt-2`}>user@example.com</Text>
        </View>
        <View style={tw`bg-white p-4 rounded-lg mt-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold`}>Member Since</Text>
          <Text style={tw`text-gray-600 mt-2`}>January 2023</Text>
        </View>
      </View>
      <Navbar setCurrentScreen={setCurrentScreen} />
    </View>
  );
}