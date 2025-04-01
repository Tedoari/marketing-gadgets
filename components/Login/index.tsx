'use client'; // Mark as client to use useState

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import HouseBrand from "@/public/images/Logo_Vertical_Color_Logos.png";
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react'; // Use NextAuth's signIn method for login

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setLoading] = useState<boolean>(false); 
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const user = localStorage.getItem('user'); // Check if user exists
  //   if (user) {
  //     setIsLoggedIn(true); 
  //     router.push('/products');
  //   }
  // }, [router]);

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
      // Make api request using NextAuth's signIn function
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      
      console.log('SignIn response:', response);
      if (response?.error) {
        setErrorMessage(response.error || 'Login failed');
      } else {
        setSuccessMessage('Login successful!');
        // setIsLoggedIn(true); 
        router.push('/products'); 
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

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
                onChange={(e) => setPassword(e.target.value)} // Password input which should eventually be hashed
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
              disabled={isLoading} // Disable button while loading so you can't send multiple requests
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
