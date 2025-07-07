"use client";

import React, { useEffect, useState } from "react";

type Address = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type UserData = {
  id: number;
  name: string;
  companyName?: string;
  address: Address | null;
  deliveryAddress: Address | null;
};

const UserAddresses = ({ userId }: { userId: number }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: UserData = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading addresses...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="space-y-8">
      {/* Company Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Company Address</h2>
        {userData.address ? (
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
            <p>{userData.address.street}</p>
            <p>
              {userData.address.postalCode} {userData.address.city}
            </p>
            <p>{userData.address.country}</p>
          </div>
        ) : (
          <p>No company address available.</p>
        )}
      </section>

      {/* Delivery Address (same as company for now) */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Delivery Address</h2>
        {userData.deliveryAddress ? (
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
            <p>{userData.deliveryAddress.street}</p>
            <p>
              {userData.deliveryAddress.postalCode} {userData.deliveryAddress.city}
            </p>
            <p>{userData.deliveryAddress.country}</p>
          </div>
        ) : (
          <p>No delivery address available.</p>
        )}
      </section>
    </div>
  );
};

export default UserAddresses;
