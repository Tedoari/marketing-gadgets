"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserDashboard from "@/components/UserDashboard";
import UserOrders from "@/components/UserOrders";
import UserAdresses from "@/components/UserAdresses";
import UserDetails from "@/components/UserDetails";
import { Home as HomeIcon, Package, MapPin, User, LogOut } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to login page if no user is found
      router.push("/");
    }
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <UserDashboard />;
      case "Orders":
        return <UserOrders />;
      case "Addresses":
        return <UserAdresses />;
      case "Account Details":
        return <UserDetails />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-white shadow-md p-4">
          <nav className="space-y-2">
            <SideMenuItem
              icon={<Home />}
              label="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => setActiveTab("Dashboard")}
            />
            <SideMenuItem
              icon={<Package />}
              label="Orders"
              active={activeTab === "Orders"}
              onClick={() => setActiveTab("Orders")}
            />
            <SideMenuItem
              icon={<MapPin />}
              label="Addresses"
              active={activeTab === "Addresses"}
              onClick={() => setActiveTab("Addresses")}
            />
            <SideMenuItem
              icon={<User />}
              label="Account Details"
              active={activeTab === "Account Details"}
              onClick={() => setActiveTab("Account Details")}
            />
            <SideMenuItem icon={<LogOut />} label="Logout" onClick={() => console.log("Logging out...")} />
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
      <Footer />
    </>
  );
}

interface SideMenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SideMenuItem = ({ icon, label, active = false, onClick }: SideMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full space-x-2 p-3 rounded-lg text-left ${
        active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
