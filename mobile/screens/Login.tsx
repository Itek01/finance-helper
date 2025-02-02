import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Button from '../components/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function Login({ onBack, onQuestionnaire, onDashboard }: { onBack: () => void; onQuestionnaire: () => void; onDashboard: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if it's the first time logging in
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.firsttimeuser) {
          onQuestionnaire();
        } else {
          onDashboard();
        }
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold mb-6 text-blue-600`}>Welcome Back</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <View style={tw`mt-4`}>
        <Button title="Back" onPress={onBack} variant="secondary" />
      </View>
    </View>
  );
}
