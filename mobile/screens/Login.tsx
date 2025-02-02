import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Button from '../components/Button';

export default function Login({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      onSuccess(); // Redirect to the Home screen
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Text style={tw`text-2xl font-bold text-blue-600 mb-8`}>Login</Text>
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
        onPress={handleLogin}
        disabled={loading} // Disable the button when loading
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={tw`text-gray-600`}>Back to Cover Page</Text>
      </TouchableOpacity>
    </View>
  );
}