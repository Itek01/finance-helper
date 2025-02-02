import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const CoverPage = () => {
  const navigation = useNavigation(); // Use navigation for navigation actions

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      {/* Replace this Image component with your own image */}
      <Image
        source={require('../assets/splash-icon.png')} // Update the path to your image
        style={tw`w-36 h-36 mb-8`}
      />
      <Text style={tw`text-2xl font-bold text-blue-600 text-center mb-4`}>
        Take a Bite Out of Your Finances
      </Text>
      <Text style={tw`text-lg text-gray-600 text-center mb-8`}>
        Simple, Smart, and Shark-Approved
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('QuestionnaireScreen')} // Navigate to QuestionnaireScreen
        style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
      >
        <Text style={tw`text-white text-center font-bold`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CoverPage;
