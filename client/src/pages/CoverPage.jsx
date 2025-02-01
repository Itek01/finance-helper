import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function CoverPage() {
    const [error] = useState(null);
    const navigate = useNavigate();
      
    return (
        <div className="w-full m-0 p-0">
            <section className="w-full">
                <Navbar />
            </section>
            
            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center text-center">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/CookingScene.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline // Ensures compatibility with mobile devices
                    preload="auto" // Helps with faster loading
                    disablePictureInPicture // Prevents mobile browsers from showing the Picture-in-Picture option
                    controls={false} // Hides the video controls to make it non-interactive
                ></video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                {/* Content */}
                <div className="relative z-20 text-white max-w-2xl px-4">
                <h1 className="text-5xl font-bold">
                    <span className="block sm:inline">Welcome to </span>
                    <span className="block sm:inline">Let Him Cook</span>
                </h1>
                    <p className="text-lg mt-4">
                        Your ultimate smart meal planning and recipe generation platform. Maximize your ingredients, minimize waste, and cook like a pro!
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-orange-500 text-white font-semibold py-3 px-6 mt-6 rounded-lg shadow-lg hover:bg-orange-400 hover:scale-105 transition-transform duration-300"
                    >
                        Let&apos;s get started!
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full">
            {/* First Feature */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-orange-100">
                <div className="flex-1 sm:w-1/4">
                <img
                    src="/images/fridge.jpg"
                    alt="image of fridge"
                    className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                />
                </div>
                <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    VIEW & MANAGE INGREDIENTS
                </h3>
                <p className="text-gray-600 mt-4">
                    Easily view, add, and delete ingredients you have in your fridge. Avoid
                    wastage!
                </p>
                </div>
            </div>

            {/* Second Feature */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-cyan-50">
                <div className="flex-1 sm:w-1/4">
                <img
                    src="/images/robot.png"
                    alt="image of robot"
                    className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                />
                </div>
                <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    GENERATE RECIPES
                </h3>
                <p className="text-gray-600 mt-4">
                    Let Him Cook generates complete personalized recipes based on your
                    ingredients, skill level, mood, servings, and cuisine!
                </p>
                </div>
            </div>

            {/* Third Feature */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-orange-100">
                <div className="flex-1 sm:w-1/4">
                <img
                    src="/images/recipe-book.jpg"
                    alt="image of recipe book"
                    className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                />
                </div>
                <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    CUSTOMIZE YOUR RECIPE BOOK
                </h3>
                <p className="text-gray-600 mt-4">
                    Save your recipes, delete, or create new ones. Keep your cooking ideas
                    in one place!
                </p>
                </div>
            </div>
            </section>


            {/* Authentication Section */}
            <section className="bg-gray-50 py-12 px-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Get Cooking?</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Don&apos;t miss out on all the amazing features. Sign up today and transform the way you cook and plan your meals!
                </p>
                <button
                    onClick={() => navigate('/auth')}
                    className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
                >
                    Create Your Account
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default CoverPage;