import React, {useState} from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import QuestionnaireSlideshow from './screens/QuestionnaireScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <QuestionnaireSlideshow />
    </View>
  );
}