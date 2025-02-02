import React, {useState} from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import HomeScreen from './screens/HomeScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <HomeScreen/>
      <QuestionnaireScreen/>
      {currentScreen === 'Splash' && <SplashScreen onFinish={() => setCurrentScreen('Home')} />}
      {currentScreen === 'Home' && <Home />}
    </View>
  );
}