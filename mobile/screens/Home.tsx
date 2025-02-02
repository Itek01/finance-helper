import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface HomeProps {
  navigation: any; // You can replace `any` with a more specific type if needed
}

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Text style={tw`text-2xl font-bold text-blue-600 mb-8`}>Welcome to the Home Screen</Text>
      <Text style={tw`text-lg text-gray-600 text-center mb-8`}>
        You are now logged in and can start managing your finances.
      </Text>
      <TouchableOpacity
        style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
        onPress={() => navigation.navigate('FinancialQuestions')}
      >
        <Text style={tw`text-white text-center font-bold`}>Go to Financial Questions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;