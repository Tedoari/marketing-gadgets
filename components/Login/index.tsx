'use client'; // Mark as client to use useState

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import HouseBrand from "@/public/images/Logo_Vertical_Color_Logos.png";
import { useRouter } from 'next/navigation'; 

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>(''); // Manage email state
  const [password, setPassword] = useState<string>(''); // Manage password state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Manage error messages
  const [successMessage, setSuccessMessage] = useState(''); // Manage Success messages
  const [loading, setLoading] = useState<boolean>(false); // Manage loading state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Flag for tracking login state

  // Check if the user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user'); // Check if user exists
    if (user) {
      setIsLoggedIn(true); 
      router.push('/products');
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true); 
    setErrorMessage('');
    setSuccessMessage(''); 

    // Validate inputs
    if (!email || !password) {
      setErrorMessage('Both email and password are required');
      setLoading(false);
      return;
    }

    try {
      // Make api request 
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user)); // Save the user to localStorage
        setIsLoggedIn(true); 
        router.push('/products'); 
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  // If user is already logged in, redirect them away from login page
  if (isLoggedIn) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="relative mb-6 mt-6 w-[54rem] h-[15rem]">
          <Image
            src={HouseBrand}
            alt="Logo"
            layout="intrinsic"
            width={4917} // Scaled width to make it fit better, 1.5x
            height={1367} // Scaled height to make it fit better, 1.5x
            objectFit="contain" 
          />
        </div>

        {/* Form container */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[36rem] z-10">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Sets the email input
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-left text-lg font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Sets the password input
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p> // Display error message
            )}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p> // Display success message
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
              disabled={loading} // Disable button while loading so you can't send multiple requests
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
