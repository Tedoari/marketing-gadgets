"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

type Address = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  image?: string;
  companyName?: string;
  address?: Address;
};

export default function Confirmation() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [differentAddress, setDifferentAddress] = useState<Address>({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Admin-specific
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const productId = searchParams.get("productId");

  const dbAddress = user?.address
    ? `${user.address.street}, ${user.address.postalCode} ${user.address.city}, ${user.address.country}`
    : "No address on file";

  const isAdmin = session?.user?.role === "admin";

  // Fetch current user
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

  // Fetch all users for admin
  useEffect(() => {
    if (isAdmin) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data: User[]) => setAllUsers(data))
        .catch(() => setError("Failed to load users list"));
    }
  }, [isAdmin]);

  // When admin selects a user, set selectedUser
  useEffect(() => {
    if (selectedUserId) {
      const u = allUsers.find((u) => u.id === selectedUserId) || null;
      setSelectedUser(u);
    } else {
      setSelectedUser(null);
    }
  }, [selectedUserId, allUsers]);

  const isDifferentAddressIncomplete =
    !differentAddress.street.trim() ||
    !differentAddress.city.trim() ||
    !differentAddress.postalCode.trim() ||
    !differentAddress.country.trim();

  const isConfirmDisabled =
    !start || !end || (useDifferentAddress && isDifferentAddressIncomplete);

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  async function handleConfirm(forcedUserId?: number) {
    let addressString = dbAddress;

    // If admin booking for someone else
    if (forcedUserId) {
      addressString = selectedUser?.address
        ? `${selectedUser.address.street}, ${selectedUser.address.postalCode} ${selectedUser.address.city}, ${selectedUser.address.country}`
        : "No address on file";
    }

    // If overriding with "Different Address"
    if (useDifferentAddress) {
      addressString = `${differentAddress.street}, ${differentAddress.postalCode} ${differentAddress.city}, ${differentAddress.country}`;
    }

    const bookingData = {
      productId: Number(productId),
      startDate: new Date(start),
      endDate: new Date(end),
      address: addressString,
      userId: forcedUserId || session?.user?.id,
    };

    const formData = {
      user: forcedUserId
        ? selectedUser?.name || "Unknown User"
        : session?.user?.name || "No User Found",
      address: addressString,
      startDate: start.toString(),
      endDate: end.toString(),
    };

    try {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!bookingRes.ok) throw new Error("Failed to save booking");

      const emailRes = await fetch("/api/send_email/confirmation_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!emailRes.ok) throw new Error("Failed to send confirmation email.");

      alert("Booking successfully saved!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("There was a problem saving the booking.");
    }
  }

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to confirm your booking.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="p-8 max-w-4xl mx-auto text-gray-800 space-y-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>
        {error && <p className="text-red-600">{error}</p>}

        {/* Normal Booking Section */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <p>
            <span className="font-semibold">User:</span>{" "}
            {user ? user.name : "Loading..."}
          </p>

          <div>
            <p className="font-semibold mb-2">Address:</p>
            <p className="mb-2">
              {useDifferentAddress ? (
                <span className="italic text-gray-400">
                  (please enter your address)
                </span>
              ) : (
                dbAddress
              )}
            </p>

            <label className="flex items-center gap-3 text-gray-700 mb-3">
              <input
                type="checkbox"
                checked={useDifferentAddress}
                onChange={() => setUseDifferentAddress(!useDifferentAddress)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              Different Address
            </label>

            {useDifferentAddress && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Street", "City", "Postal Code", "Country"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    value={differentAddress[
                      field.toLowerCase().replace(" ", "") as keyof Address
                    ]}
                    onChange={(e) =>
                      setDifferentAddress({
                        ...differentAddress,
                        [field.toLowerCase().replace(" ", "")]: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="font-semibold">Booking Dates:</p>
            <p>
              <span className="font-semibold">Start:</span> {formatDate(start)}
            </p>
            <p>
              <span className="font-semibold">End:</span> {formatDate(end)}
            </p>
          </div>

          {/* PDF Link */}
          <p className="text-sm text-gray-600">
            By confirming, you agree to our{" "}
            <a
              href="/terms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Terms & Conditions
            </a>
            .
          </p>

          <button
            onClick={() => handleConfirm()}
            disabled={isConfirmDisabled}
            className={`mt-6 w-full py-3 text-white font-semibold rounded-md
              ${
                isConfirmDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            Confirm Booking
          </button>
        </section>

        {/* Admin Force Booking */}
        {isAdmin && (
          <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">Admin Force Booking</h2>
            <p className="text-sm text-gray-600">
              Book on behalf of another user.
            </p>

            <select
              value={selectedUserId ?? ""}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">-- Select User --</option>
              {allUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            {selectedUser && (
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <p className="font-semibold">Selected User Address:</p>
                <p>
                  {selectedUser.address
                    ? `${selectedUser.address.street}, ${selectedUser.address.postalCode} ${selectedUser.address.city}, ${selectedUser.address.country}`
                    : "No address on file"}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                if (!selectedUserId) {
                  alert("Please select a user.");
                  return;
                }
                handleConfirm(selectedUserId);
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
            >
              Force Book
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
