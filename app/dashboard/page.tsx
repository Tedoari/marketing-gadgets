"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import AdminOrders from "@/components/AdminOrders";
import AdminUsers from "@/components/AdminUsers";
import AdminProducts from "@/components/AdminProducts";
import AdminCalendar from "@/components/AdminCalendar";
import { Activity, Package, User, LogOut } from "lucide-react";

export default function Home() {
  
  const [activeTab, setActiveTab] = useState("Dashboard");

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     // Redirect to login page if no user is found
  //     router.push("/");
  //   }
  // }, [router]);

  const handleLogout = async () => {
    console.log("logged out");
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">My Calendar</h1>
            <AdminCalendar />
          </div>
        );
      case "Orders":
        return <AdminOrders />;
      case "Users":
        return <AdminUsers />;
      case "Products":
        return <AdminProducts />;
      default:
        return <AdminDashboard />;
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
              icon={<Activity />}
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
              icon={<User />}
              label="Users"
              active={activeTab === "Users"}
              onClick={() => setActiveTab("Users")}
            />
            <SideMenuItem
              icon={<User />}
              label="Products"
              active={activeTab === "Products"}
              onClick={() => setActiveTab("Products")}
            />
            <SideMenuItem
              icon={<LogOut />}
              label="Logout"
              onClick={handleLogout}
            />
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
