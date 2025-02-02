import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Chart() {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
      <Text style={tw`text-lg`}>Chart Placeholder</Text>
    </View>
  );
}