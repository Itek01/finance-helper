import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {currentScreen === 'Splash' && <SplashScreen onFinish={() => setCurrentScreen('Home')} />}
      {currentScreen === 'Home' && <Home />}
    </View>
  );
}