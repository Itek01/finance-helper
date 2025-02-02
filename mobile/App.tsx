import React, {useState} from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import PieChartComponent from './components/PieChart';
import InterestGraphComponent from './components/InterestGraphComponent';

const chartData = [
  { name: 'Stocks', population: 40 },
  { name: 'Bonds', population: 20 },
  { name: 'Crypto', population: 15 },
  { name: 'Real Estate', population: 25 },
  { name: 'bee Estate', population: 10 },
  { name: 'cool Estate', population: 5 },

];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        return <AppNavigator />;

    </View>
  );
}
