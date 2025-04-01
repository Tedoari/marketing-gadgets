'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (!user) {
  //     // If no user is found in localStorage, redirect to login page
  //     router.push('/');
  //   }
  // }, [router]);
  return (
    <>
    
      <Header/>
      <Footer/>
      <main>
      </main>
    </>
  );
}
