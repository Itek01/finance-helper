import React from 'react';
import { TextInput, View } from 'react-native';
import tw from 'twrnc';

export default function Input({ placeholder, value, onChangeText, secureTextEntry = false }: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      style={tw`border border-gray-400 p-2 mb-4 rounded-lg`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}