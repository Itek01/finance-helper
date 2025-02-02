import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <View style={tw`flex-row justify-between p-2`}>
      <Text style={tw`text-lg`}>{title}</Text>
      <Text style={tw`text-lg`}>{value}</Text>
    </View>
  );
}