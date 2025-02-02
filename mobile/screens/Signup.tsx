import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Button from '../components/Button';

export function Signup({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
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

      // Create a user profile in Firestore with firsttimeuser set to true
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        financialGoals: [],
        portfolioValue: 0,
        firsttimeuser: true,
      });

      Alert.alert('Success', `Welcome ${firstName}! Your account has been created.`);
      onSuccess();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold mb-6 text-blue-600`}>Create Your Account</Text>
      <TextInput
        style={tw`border border-gray-300 p-3 w-full mb-4 rounded-lg`}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={tw`border border-gray-300 p-3 w-full mb-4 rounded-lg`}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={tw`border border-gray-300 p-3 w-full mb-4 rounded-lg`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={tw`border border-gray-300 p-3 w-full mb-6 rounded-lg`}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={tw`mt-4`}>
        <Button title="Back" onPress={onBack} variant="secondary" />
      </View>
    </View>
  );
}