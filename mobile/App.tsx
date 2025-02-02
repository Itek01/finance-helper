import React, {useState} from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';  // Import twrnc
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import PieChartComponent from './components/PieChart';

const chartData = [
  { name: 'Stocks', population: 40, color: '#4CAF50', legendFontColor: '#000', legendFontSize: 12 },
  { name: 'Bonds', population: 20, color: '#FF9800', legendFontColor: '#000', legendFontSize: 12 },
  { name: 'Crypto', population: 15, color: '#F44336', legendFontColor: '#000', legendFontSize: 12 },
  { name: 'Real Estate', population: 25, color: '#2196F3', legendFontColor: '#000', legendFontSize: 12 },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Home'>('Splash');

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      {/* {currentScreen === 'Splash' && <SplashScreen onFinish={() => setCurrentScreen('Home')} />}
      {currentScreen === 'Home' && <Home />} */}
      <PieChartComponent
          data={[
            { name: 'Savings', population: 60, color: '#4CAF50', legendFontColor: '#000', legendFontSize: 12 },
            { name: 'Expenses', population: 40, color: '#F44336', legendFontColor: '#000', legendFontSize: 12 },
          ]}
          title="Monthly Spending"
        />
    </View>
  );
}