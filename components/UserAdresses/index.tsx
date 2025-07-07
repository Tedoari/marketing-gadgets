"use client";

import React, { useEffect, useState } from "react";

type Address = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

interface UserAddressesProps {
  userId: number;
  companyName: string;
}

const UserAddresses = ({ userId, companyName }: UserAddressesProps) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAddress() {
      try {
        const res = await fetch(`/api/address/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch address");
        const data: Address = await res.json();
        setAddress(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAddress();
  }, [userId]);

  if (loading) return <p>Loading addresses...</p>;
  if (!address) return <p>No address found.</p>;

  return (
    <div className="space-y-8">
      {/* Company Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Company Address</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p className="font-bold">{companyName}</p> {/* Company Name in bold */}
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
        </div>
      </section>

      {/* Delivery Address (same as company for now) */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Delivery Address</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p className="font-bold">{companyName}</p> {/* Company Name in bold */}
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
        </div>
      </section>
    </div>
  );
};

export default UserAddresses;
