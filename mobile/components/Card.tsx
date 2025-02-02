import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
      {children}
    </View>
  );
}