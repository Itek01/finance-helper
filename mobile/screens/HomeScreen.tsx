import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebaseConfig';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const getAuth =  db

  const handleSignUp = () => {
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Alert.alert('User signed up successfully!', `Welcome ${userCredential.user.email}`);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Sign Up</Text>
      <TextInput
        style={tw`border border-gray-400 p-2 w-64 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tw`border border-gray-400 p-2 w-64 mb-4`}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}