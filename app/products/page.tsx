'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import React from 'react';

import Products from "@/components/Products";

export default function Home() {

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
