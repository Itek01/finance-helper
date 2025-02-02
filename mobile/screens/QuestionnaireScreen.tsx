import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import tw from 'twrnc';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import waves2 from '../assets/waves2.jpg';

export default function QuestionnaireSlideshow({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    investmentGoal: '',
    withdrawalTime: '',
    flexibility: '',
  });

  const slides = [
    {
      question: 'What is your Main Investment goal?',
      options: [
        { label: 'Buy a home', value: 'buy_home' },
        { label: 'Emergency fund', value: 'emergency_fund' },
        { label: 'Pay for education', value: 'pay_education' },
        { label: 'General saving', value: 'general_saving' },
        { label: 'Big expense', value: 'big_expense' },
      ],
      stateKey: 'investmentGoal',
    },
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
    {
      question: 'How flexible are you?',
      options: [
        { label: 'High level', value: 'high_level' },
        { label: 'Medium risk level', value: 'medium_risk' },
        { label: 'Low risk level', value: 'low_risk' },
      ],
      stateKey: 'flexibility',
    },
  ];

  const nextSlide = async () => {
    if (!answers[slides[currentSlide].stateKey]) {
      Alert.alert('Error', 'Please select an answer before proceeding.');
      return;
    }

    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, {
            firsttimeuser: false,
            questionnaireAnswers: answers,
          });

          Alert.alert('Success', 'Thank you for completing the questionnaire!');
          onComplete();
        }
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswerChange = (value: string, stateKey: string) => {
    setAnswers({ ...answers, [stateKey]: value });
  };

  const renderDots = () => {
    return (
      <View style={tw`flex-row justify-center mt-4`}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              tw`w-2 h-2 rounded-full mx-1`,
              { backgroundColor: currentSlide === index ? 'blue' : 'gray' },
            ]}
          />
        ))}
      </View>
    );
  };

  const slideData = slides[currentSlide];

  return (
    <ImageBackground source={waves2} style={tw`flex-1 justify-center items-center bg-cover`}>
      <Text style={[tw`text-white text-3xl font-bold mb-8`, { marginTop: 60 }]}>
        Let's get to know you...
      </Text>

      <View style={[tw`w-4/5 p-6 rounded-xl bg-white`, { minHeight: 300 }]}>
        <Text style={tw`text-xl font-bold mb-4`}>{slideData.question}</Text>
        <RadioButton.Group
          onValueChange={(value) => handleAnswerChange(value, slideData.stateKey)}
          value={answers[slideData.stateKey]}
        >
          {slideData.options.map((option, index) => (
            <RadioButton.Item key={index} label={option.label} value={option.value} />
          ))}
        </RadioButton.Group>

        <View style={tw`flex-row justify-between mt-4`}>
          {currentSlide > 0 && (
            <TouchableOpacity
              style={tw`bg-gray-500 p-3 rounded-lg`}
              onPress={previousSlide}
            >
              <Text style={tw`text-white font-bold`}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={tw`bg-blue-500 p-3 rounded-lg`}
            onPress={nextSlide}
          >
            <Text style={tw`text-white font-bold`}>
              {currentSlide < slides.length - 1 ? 'Next' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderDots()}
    </ImageBackground>
  );
}
