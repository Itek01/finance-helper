// CoverPage.tsx
import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

const CoverPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleBackToCover = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
      {/* Show Cover Page content only if Login and Register are not visible */}
      {!showLogin && !showRegister && (
        <>
          <img src="/shark.png" alt="Shark" className="w-36 h-36 mb-8" />
          <h1 className="text-2xl font-bold text-sharkBlue text-center mb-4">
            Take a Bite Out of Your Finances
          </h1>
          <p className="text-lg text-oceanGray text-center mb-8">
            Simple, Smart, and Shark-Approved
          </p>
          <button
            onClick={() => alert('Get Started clicked!')}
            className="w-full bg-accentBlue text-white font-bold py-3 rounded-lg mb-4 hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </button>
          <button
            onClick={handleLoginClick}
            className="text-oceanGray hover:text-sharkBlue transition duration-300"
          >
            Already have an account? Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="text-oceanGray hover:text-sharkBlue transition duration-300 mt-2"
          >
            Don't have an account? Register
          </button>
        </>
      )}

      {/* Show Login component if showLogin is true */}
      {showLogin && <Login onBack={handleBackToCover} />}

      {/* Show Register component if showRegister is true */}
      {showRegister && <Register onBack={handleBackToCover} />}
    </div>
  );
};

export default CoverPage;