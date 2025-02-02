import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface FinancialQuestionsProps {
  navigation: any; // You can replace `any` with a more specific type if needed
}

const FinancialQuestions = ({ navigation }: FinancialQuestionsProps) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Text style={tw`text-2xl font-bold text-blue-600 mb-8`}>Financial Questions</Text>
      <Text style={tw`text-lg text-gray-600 text-center mb-8`}>
        Answer a few questions to help us understand your financial situation.
      </Text>
      <TouchableOpacity
        style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={tw`text-white text-center font-bold`}>Continue to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinancialQuestions;