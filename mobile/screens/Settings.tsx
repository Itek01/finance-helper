import React from 'react';
import { View, Text, Switch } from 'react-native';
import tw from 'twrnc';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-xl font-bold mb-4`}>Settings</Text>
      <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg`}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
      </View>
    </View>
  );
}