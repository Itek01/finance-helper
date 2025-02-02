import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("CoverPage");
    }, 2000);
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;