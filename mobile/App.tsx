import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <HomeScreen/>
    </View>
  );
}