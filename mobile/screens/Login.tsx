import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Ensure this path is correct

interface LoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

const Login = ({ onBack, onSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user.email); // Log the user's email
      onSuccess(); // Navigate to the Home screen on success
    } catch (error: any) {
      console.error('Login error:', error.message);

      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Invalid email or password.');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
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
};

export default Login;