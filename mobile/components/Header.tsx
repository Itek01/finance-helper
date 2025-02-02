import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Header({ title }: { title: string }) {
  return (
    <View style={tw`bg-blue-500 p-4`}>
      <Text style={tw`text-white text-xl font-bold text-center`}>{title}</Text>
    </View>
  );
}