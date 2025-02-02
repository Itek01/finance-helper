import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Footer() {
  return (
    <View style={tw`bg-gray-800 p-4`}>
      <Text style={tw`text-white text-center`}>© 2023 WealthApp</Text>
    </View>
  );
}