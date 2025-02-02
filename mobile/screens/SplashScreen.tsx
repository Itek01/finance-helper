import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("CoverPage");
    }, 2000);
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-cyan-800`}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={tw`text-white text-lg mt-4`}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;