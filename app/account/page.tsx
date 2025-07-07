"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserCurrentOrders from "@/components/UserCurrentOrders";
import UserRecentOrders from "@/components/UserRecentOrders";
import UserAddresses from "@/components/UserAdresses";
import UserDetails from "@/components/UserDetails";
import { Package, MapPin, User, LogOut } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    console.log("logged out");
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const renderContent = () => {
    if (status === "loading") return <p>Loading...</p>;

    if (!session?.user?.id) {
      return <p>Please login to see your data.</p>;
    }

    const userId = Number(session.user.id);

    switch (activeTab) {
      case "Orders":
        return (
          <>
            <UserCurrentOrders />
            <UserRecentOrders />
          </>
        );
      case "Addresses":
        return <UserAddresses userId={userId} />;
      case "Account Details":
        return <UserDetails />;
      default:
        return (
          <>
            <UserCurrentOrders />
            <UserRecentOrders />
          </>
        );
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
            <SideMenuItem icon={<LogOut />} label="Logout" onClick={handleLogout} />
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

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
}: SideMenuItemProps) => {
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
