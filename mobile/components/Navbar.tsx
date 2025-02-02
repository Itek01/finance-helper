import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

export default function Navbar({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <View style={tw`flex-row justify-around bg-white py-3 border-t border-gray-200`}>
      <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')}>
        <Text style={tw`text-blue-600`}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Portfolio')}>
        <Text style={tw`text-gray-600`}>Portfolio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Trade')}>
        <Text style={tw`text-gray-600`}>Trade</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Account')}>
        <Text style={tw`text-gray-600`}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}