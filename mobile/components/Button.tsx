import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

export default function Button({
  title,
  onPress,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <TouchableOpacity
      style={tw`${variant === 'primary' ? 'bg-blue-600' : 'bg-gray-300'} p-3 rounded-lg w-full`}
      onPress={onPress}
    >
      <Text style={tw`text-white text-center font-bold`}>{title}</Text>
    </TouchableOpacity>
  );
}