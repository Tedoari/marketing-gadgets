"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  image?: string;
};

export default function Confirmation() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [differentAddress, setDifferentAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Assuming start and end come from URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  const staticAddress = "123 Main Street, Springfield";

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then((data: User) => setUser(data))
        .catch(() => setError("Failed to load user info"));
    }
  }, [status, session]);

  const isConfirmDisabled =
    !start || !end || (useDifferentAddress && !differentAddress.trim());

  function onConfirm() {
    alert(
      `Booking confirmed for ${user?.name} from ${start} to ${end}\nAddress: ${
        useDifferentAddress ? differentAddress : staticAddress
      }`
    );
  }

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to confirm your booking.</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="p-8 max-w-4xl mx-auto text-gray-800 space-y-8 flex-grow">
          <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>

          {error && <p className="text-red-600">{error}</p>}

          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
            <p>
              <span className="font-semibold">User:</span>{" "}
              {user ? user.name : "Loading..."}
            </p>

            <div>
              <p className="font-semibold mb-2">Address:</p>
              <p className="mb-2">
                {useDifferentAddress
                  ? differentAddress || (
                      <span className="italic text-gray-400">
                        (please enter your address)
                      </span>
                    )
                  : staticAddress}
              </p>

              <label className="flex items-center gap-3 text-gray-700">
                <input
                  type="checkbox"
                  checked={useDifferentAddress}
                  onChange={() => setUseDifferentAddress(!useDifferentAddress)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                Different Address
              </label>

              {useDifferentAddress && (
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={differentAddress}
                  onChange={(e) => setDifferentAddress(e.target.value)}
                  className="mt-3 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div className="mt-4">
              <p className="font-semibold">Booking Dates:</p>
              <p>
                <span className="font-semibold">Start:</span> {start}
              </p>
              <p>
                <span className="font-semibold">End:</span> {end}
              </p>
            </div>

            <button
              onClick={onConfirm}
              disabled={isConfirmDisabled}
              className={`mt-6 w-full py-3 text-white font-semibold rounded-md
                ${isConfirmDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                `}
            >
              Confirm Booking
            </button>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
