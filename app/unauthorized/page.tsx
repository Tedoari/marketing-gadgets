// app/unauthorized/page.tsx
"use client";

import { signOut } from "next-auth/react";

export default function Unauthorized() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // redirect to login page
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Unauthorized Login</h1>
        <p className="mb-6 text-gray-700">
          Please login with an authorized and registered account.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
