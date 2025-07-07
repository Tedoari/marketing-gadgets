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
}

const UserAddresses = ({ userId }: UserAddressesProps) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);

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
        setLoadingAddress(false);
      }
    }
    fetchAddress();
  }, [userId]);

  useEffect(() => {
    async function fetchCompanyName() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch company name");
        const data = await res.json();
        setCompanyName(data.companyName || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCompany(false);
      }
    }
    fetchCompanyName();
  }, [userId]);

  if (loadingAddress || loadingCompany) return <p>Loading addresses...</p>;
  if (!address) return <p>No address found.</p>;

  return (
    <div className="space-y-8">
      {/* Company Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Company Address</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p className="font-bold">{companyName}</p>
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
          <p className="font-bold">{companyName}</p>
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
