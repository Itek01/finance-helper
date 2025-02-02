import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Button from '../components/Button';

export default function Signup({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        financialGoals: [],
        portfolioValue: 0,
      });

      Alert.alert('Success', `Welcome ${firstName}! Your account has been created.`);
      onSuccess(); // Redirect to Login screen
    } catch (error: any) {
      Alert.alert('Error', error.message);
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