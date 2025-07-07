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
  companyName: string;
};

interface UserAddressesProps {
  userId: string | number;
}

export default function UserAddresses({ userId }: UserAddressesProps) {
  const [companyName, setCompanyName] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

        const userRes = await fetch(`/api/user/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const userData: UserData = await userRes.json();
        setCompanyName(userData.companyName || "");

        const addressRes = await fetch(`/api/address/${userId}`);
        if (!addressRes.ok) throw new Error("Failed to fetch address data");
        const addressData: Address = await addressRes.json();
        setAddress(addressData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!address) return <p>No address found.</p>;

  return (
    <div className="space-y-8">
      {/* Company Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">{companyName}</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
        </div>
      </section>

      {/* Delivery Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">{companyName}</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
        </div>
      </section>
    </div>
  );
}
