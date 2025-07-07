'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Address = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type UserData = {
  companyName: string;
  address: Address | null;
};

export default function UserAddresses() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [deliveryAddresses, setDeliveryAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(res => res.json())
        .then(data => setUserData(data));
    }

    fetch("/api/delivery-addresses")
      .then(res => res.json())
      .then(data => setDeliveryAddresses(data));
  }, [session?.user?.id]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      {/* Company Address */}
      {userData?.address && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Company Address</h2>
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
            <p className="font-semibold">{userData.companyName}</p>
            <p>{userData.address.street}</p>
            <p>{userData.address.postalCode} {userData.address.city}</p>
            <p>{userData.address.country}</p>
          </div>
        </section>
      )}

      {/* Delivery Addresses */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Delivery Addresses</h2>
        <div className="space-y-4">
          {deliveryAddresses.map(addr => (
            <div
              key={addr.id}
              className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <p>{addr.street}</p>
              <p>{addr.postalCode} {addr.city}</p>
              <p>{addr.country}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
