import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const CoverPage = () => {
  const navigation = useNavigation(); // Use navigation for navigation actions

  return (
    <ImageBackground
      source={require('../assets/waves.jpg')} // Update the path to your background image
      style={tw`flex-1 justify-center items-center`}
    >
      {/* Replace this Image component with your own image */}
      <Image
        source={require('../assets/adaptive-icon.png')} // Update the path to your image
        style={tw`w-70 h-70 mb-1`}
      />
      <Text style={tw`text-2xl font-bold text-white text-center mb-4`}>
        Dive into the Market's Waves.
      </Text>
      <Text style={tw`text-lg text-white text-center mb-30`}>
        Simple, Smart, and Shark-Approved
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('QuestionnaireScreen')} // Navigate to QuestionnaireScreen
        style={tw`bg-gray-800 p-4 rounded-full`}
      >
        <Text style={tw`text-white text-center text-lg`}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default CoverPage;
