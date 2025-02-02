import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionnaireSlideshow from '../mobile/screens/QuestionnaireScreen';
import FinancialAdviceScreen from '../mobile/screens/FinancialAdviceScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuestionnaireSlideshow">
        <Stack.Screen
          name="QuestionnaireSlideshow"
          component={QuestionnaireSlideshow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FinancialAdviceScreen"
          component={FinancialAdviceScreen}
          options={{ title: 'Financial Advice' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}