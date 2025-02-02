import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';  // Import twrnc

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Home Screheyhyhhhhhhhhhhhhhhhhhhyyyen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}