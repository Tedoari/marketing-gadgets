'use client'

import React from 'react'
import { NavigationType } from './types';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/Allgon_BLUE.png"
import user_logo from "@/public/images/Middel 1.jpg"
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navigation: NavigationType[] = [
    { name: "Products", href: "/products", id: 1 },
    { name: "Information", href: "/information", id: 2 },
    { name: "Contact", href: "/contact", id: 3 },
    { name: "Account", href: "/account", id: 4 }
];

const handleLogout = async () => {
    console.log('logged out')
    await signOut({ redirect: true, callbackUrl: '/' });
};

const Header = () => {
    const pathname = usePathname(); // Get the current path

    return (
        <header className="border-b-2 border-gray-300">
            <nav className="flex items-center justify-between py-3 lg:py-4 px-6 w-full" aria-label="Global">

                {/* Logo */}
                <div className="flex flex-1 items-center">
                    <Link href="/">
                        <Image src={logo} alt="logo" width={240} height={240} />
                    </Link>
                </div>

                {/* Links and Account Section */}
                <div className="flex items-center gap-x-10 ml-auto">

                    {/* Links */}
                    <div className="flex gap-x-5">
                        {navigation.map((item: NavigationType) => (
                            <Link key={item.id} href={item.href}>
                                <span className={`text-lg font-thin cursor-pointer hover:text-[#496ba8] 
                                    ${pathname === item.href ? "text-blue-500 font-medium border-b-2 border-blue-500 pb-1" : "text-black"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* User Logo */}
                    <Link href="/" onClick={handleLogout}>
                        <Image className="rounded-full shadow" width={60} height={60} src={user_logo} alt="user_logo" />
                    </Link>

                </div>
            </nav>
        </header>
    )
}

export default Header;
