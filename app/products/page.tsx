'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Products from "@/components/Products";

export default function Home() {
    const router = useRouter();

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (!user) {
  //     router.push('/');
  //   }
  // }, [router]);
  return (
    <>
    
      <Header/>
      <Products/>
      <Footer/>
      <main>
      </main>
    </>
  );
}
