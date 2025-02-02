import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import tw from 'twrnc';
import waves2 from '../assets/waves2.jpg';

import { ReactNode } from 'react';
import FinancialAdviceScreen from './FinancialAdviceScreen';

const Container = ({ children }: { children: ReactNode }) => (
  <View style={tw`flex-1 justify-center items-center w-full`}>
    <View style={tw`w-4/5 p-6 rounded-xl bg-white bg-opacity-80 items-left`}>
      {children}
    </View>
  </View>
);

export default function QuestionnaireSlideshow({ navigation }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    investmentGoal: '',
    withdrawalTime: '',
    flexibility: '',
    age: '',
    passiveIncome: '',
    monthlySpendings: '',
    savings: '',
  });

  const slides = [
    {
      question: 'What is your main investment goal?',
      options: [
        { label: 'Buy a home', value: 'buy_home' },
        { label: 'Emergency fund', value: 'emergency_fund' },
        { label: 'Pay for education', value: 'pay_education' },
        { label: 'General saving', value: 'general_saving' },
      ],
    },
    { question: 'How old are you?', input: 'age' },
    { question: 'What is your monthly passive income?', input: 'passiveIncome' },
    { question: 'What are your monthly spendings?', input: 'monthlySpendings' },
    { question: 'How much do you have in savings?', input: 'savings' },
    {
      question: 'In how long would you like to withdraw your money?',
      options: [
        { label: '0-3 years', value: '0_3_years' },
        { label: '4-7 years', value: '4_7_years' },
        { label: '7-10 years', value: '7_10_years' },
        { label: '10+ years', value: '10_plus_years' },
      ],
      stateKey: 'withdrawalTime',
    },
    { question: 'What is your risk tolerance?' ,
    options: [
      { label: 'High risk', value: 'high_risk' },
      { label: 'Average risk', value: 'average_risk' },
      { label: 'Minimum risk', value: 'minimum_risk' },
     
    ],
    stateKey: 'riskLevel',
  },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswerChange = (value: string, stateKey: string) => {
    setAnswers({ ...answers, [stateKey]: value });
  };

  const handleInputChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.11.119:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Financial Advice:', data.advice);
  
        // Save JSON locally if needed
        const filePath = `${FileSystem.documentDirectory}data.json`;
        // await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data.advice));
  
        // Navigate and pass the advice to the new screen
        navigation.navigate('FinancialAdviceScreen', { advice: data.advice });
      } else {
        console.error('Error:', data.error);
        Alert.alert('Error', 'Failed to get financial advice.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    }
  };

  const renderDots = () => (
    <View style={tw`flex-row justify-center mt-4`}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            tw`w-2 h-2 rounded-full mx-1`,
            { backgroundColor: currentSlide === index ? 'black' : 'gray' },
          ]}
        />
      ))}
    </View>
  );

  const slideData = slides[currentSlide];

  return (
    <ImageBackground source={waves2} style={tw`flex-1 w-full h-full`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <Container>
          <Text style={[tw`text-black text-3xl font-bold mb-8`, { marginTop: 60 }]}>
            Let's get to know you...
          </Text>
          <Text style={tw`text-lg mb-10`}>{slideData.question}</Text>
          {slideData.options &&
            slideData.options.map((option, index) => (
              <RadioButton.Item
                key={index}
                label={option.label}
                value={option.value}
                status={answers[slideData.stateKey || 'investmentGoal'] === option.value ? 'checked' : 'unchecked'}
                onPress={() => setAnswers({ ...answers, [slideData.stateKey || 'investmentGoal']: option.value })}
              />
            ))}
          {slideData.input && (
            <TextInput
              style={tw`h-10 border border-gray-400 mt-5 px-3 w-full`}
              value={answers[slideData.input]}
              onChangeText={(text) => handleInputChange(slideData.input, text)}
              keyboardType="numeric"
            />
          )}

          <View style={tw`flex-row justify-between w-full mt-5`}>
            <TouchableOpacity onPress={handlePrevious} style={tw`mt-5 p-3 bg-cyan-900 rounded w-3/10`}>
              <Text style={tw`text-white font-bold`}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-3 bg-cyan-900 rounded w-3/10 self-end`}
              onPress={nextSlide}
            >
              <Text style={tw`text-white font-bold`}>
                {currentSlide < slides.length - 1 ? 'Next' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
          {renderDots()}
        </Container>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
