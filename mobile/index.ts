import { registerRootComponent } from 'expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import App from './App';  // Make sure App has a default export

registerRootComponent(App);