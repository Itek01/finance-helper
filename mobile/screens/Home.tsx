import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleBackToCover = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      {/* Show Cover Page content only if Login and Signup are not visible */}
      {!showLogin && !showSignup && (
        <>
          {/* Replace this Image component with your own image */}
          <Image
            source={require('../assets/splash-icon.png')} // Update the path to your image
            style={tw`w-36 h-36 mb-8`}
          />
          <Text style={tw`text-2xl font-bold text-blue-600 text-center mb-4`}>
            Take a Bite Out of Your Finances
          </Text>
          <Text style={tw`text-lg text-gray-600 text-center mb-8`}>
            Simple, Smart, and Shark-Approved
          </Text>
          <TouchableOpacity
            onPress={() => alert('Get Started clicked!')}
            style={tw`w-full bg-blue-600 py-3 rounded-lg mb-4`}
          >
            <Text style={tw`text-white text-center font-bold`}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLoginClick}
            style={tw`mb-2`}
          >
            <Text style={tw`text-gray-600`}>Already have an account? <Text style={tw`text-blue-600`}>Login</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignupClick}
          >
            <Text style={tw`text-gray-600`}>Don't have an account? <Text style={tw`text-blue-600`}>Signup</Text></Text>
          </TouchableOpacity>
        </>
      )}

      {/* Show Login component if showLogin is true */}
      {showLogin && <Login onBack={handleBackToCover} onSuccess={() => setShowLogin(false)} />}

      {/* Show Signup component if showSignup is true */}
      {showSignup && <Signup onBack={handleBackToCover} onSuccess={() => setShowSignup(false)} />}
    </View>
  );
};

export default Home;