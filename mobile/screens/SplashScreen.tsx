import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 3000);
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-500`}>
      <Text style={tw`text-white text-2xl font-bold`}>WealthApp</Text>
    </View>
  );
}