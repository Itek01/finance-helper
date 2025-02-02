import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import CoverPage from '../screens/CoverPage';
import Home from '../screens/Home';
import QuestionnaireSlideshow from '../screens/QuestionnaireScreen';
import FinancialAdviceScreen from '../screens/FinancialAdviceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="CoverPage" component={CoverPage} />
        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireSlideshow} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="FinancialAdviceScreen"
          component={FinancialAdviceScreen}
          options={{ title: 'Financial Advice' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;