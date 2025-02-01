// SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import CoverPage from './CoverPage.tsx';

const SplashScreen = () => {
  const [showCoverPage, setShowCoverPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoverPage(true); // Navigate to CoverPage after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sharkBlue">
      {!showCoverPage ? (
        <>
          <img src="/splash-icon.png" alt="FinLite Logo" className="w-24 h-24 mb-6" />
          <h1 className="text-3xl font-bold text-white">FinLite</h1>
        </>
      ) : (
        <CoverPage />
      )}
    </div>
  );
};

export default SplashScreen;