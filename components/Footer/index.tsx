import React from "react";
import Image from "next/image";
import Logo from "@/public/images/Allgon_BLUE.png";

const Footer = () => {
  return (
    <footer className="!bg-white border-t-2 border-gray-300 w-full py-6">
      
      {/* Logo */}
      <div className="fflex flex-col items-start pl-26 mb-2">
        <Image 
        src={Logo} 
        alt="Allgon Logo" 
        width={150} 
        height={50} />
      </div>

      {/* Thin Separator Line */}
      <div className="w-[85%] mx-auto border-t border-gray-300 mb-4"></div>

      {/* Footer Content */}
      <div className="w-[85%] mx-auto flex justify-between text-sm">
        {/* Left Text */}
        <p style={{ color: "#004a7d" }}>
          © {new Date().getFullYear()} Allgon - All rights reserved. -{" "}
          <a href="https://allgon.com/privacy-policy/" className="hover:underline" style={{ color: "#004a7d" }}>
            Privacy Policy
          </a>
        </p>

        {/* Right Text */}
        <p style={{ color: "#004a7d" }} className="text-right">
          Jadestraat 9 - 2665 NS Bleiswijk -{" "}
          <a href="tel:+31704194127" className="hover:underline" style={{ color: "#004a7d" }}>
            +31 (0)70-41 94 127
          </a>{" "}
          -{" "}
          <a href="mailto:marketing@allgon.com" className="hover:underline" style={{ color: "#004a7d" }}>
            marketing@allgon.com
          </a>
        </p>
      </div>

    </footer>
  );
};

export default Footer;
