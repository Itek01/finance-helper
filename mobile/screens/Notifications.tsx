import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Notifications() {
  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-xl font-bold mb-4`}>Notifications</Text>
      <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
        <Text style={tw`text-lg`}>No new notifications</Text>
      </View>
    </View>
  );
}