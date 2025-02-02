import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';


interface SignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

const Signup = ({ onBack, onSuccess }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Simulate signup
    if (email && password) {
      onSuccess();
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Text style={tw`text-2xl font-bold text-blue-600 mb-8`}>Signup</Text>
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
        onPress={handleSignup}
      >
        <Text style={tw`text-white text-center font-bold`}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={tw`text-gray-600`}>Back to Cover Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;