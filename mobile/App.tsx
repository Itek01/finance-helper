import React, {useState} from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1`}>
        <AppNavigator />;
    </View>
  );
}
