'use client'

import React from 'react'
import { NavigationType } from './types';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/Allgon_BLUE.png"
import user_logo from "@/public/images/Middel 1.jpg"
import {useRouter} from 'next/navigation'

const navigation: NavigationType[] = [
    { name: "Products", href:"/products", id: 1},
    { name: "Information", href:"/information", id: 2},
    { name: "Contact", href:"/contact", id: 3},
    { name: "Account", href:"/account", id: 4}
];



const handleLogout = () => {
    console.log('logged out')
    localStorage.removeItem('user'); // Remove the user data from localStorage
  };

const Header = () => {
  return (
    <header className="border-b-2 border-gray-300">
        <nav className="flex items-center justify-between p-6 lg:p-8 w-full" aria-label="Global">
            
            {/* Logo */}
            <div className="flex flex-1 items-center">  
                <Link href="/">
                    <Image width={240} height={240} src={logo} alt="logo"/>
                </Link>
            </div>

            {/* Links and Account Section */}
            <div className="flex items-center gap-x-12 ml-auto">  

                {/* Links */}
                <div className="flex gap-x-6">
                    {navigation.map((item: NavigationType) => (
                        <Link key={item.id} href={item.href}>
                            <span className="text-xl font-thin cursor-pointer text-black hover:text-blue-500">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* User Logo */}
                <Link href="/" onClick={handleLogout}>
                    <Image className="rounded-full shadow" width={60} height={60} src={user_logo} alt="user_logo"/>
                </Link>

            </div>
        </nav>
    </header>
  )
}

export default Header;
