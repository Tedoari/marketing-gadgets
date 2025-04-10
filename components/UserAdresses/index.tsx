'use client'

import React from 'react'

type Address = {
  id: number
  name: string
  street: string
  zip: string
  city: string
  country: string
}

const companyAddress: Address = {
  id: 1,
  name: 'Tele Radio Benelux',
  street: 'Jadestraat 9',
  zip: '2665 NS',
  city: 'Bleiswijk',
  country: 'Netherlands',
}

const deliveryAddresses: Address[] = [
  {
    id: 2,
    name: 'Warehouse Rotterdam',
    street: 'Havenstraat 45',
    zip: '3011 AB',
    city: 'Rotterdam',
    country: 'Netherlands',
  },
  {
    id: 3,
    name: 'Service Center Eindhoven',
    street: 'Industrieweg 77',
    zip: '5612 AP',
    city: 'Eindhoven',
    country: 'Netherlands',
  },
]

const UserAdresses = () => {
  return (
    <div className="space-y-8">
      {/* Company Address */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Company Address</h2>
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <p className="font-semibold">{companyAddress.name}</p>
          <p>{companyAddress.street}</p>
          <p>{companyAddress.zip} {companyAddress.city}</p>
          <p>{companyAddress.country}</p>
        </div>
      </section>

      {/* Delivery Addresses */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Delivery Addresses</h2>
        <div className="space-y-4">
          {deliveryAddresses.map((address) => (
            <div
              key={address.id}
              className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <p className="font-semibold">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.zip} {address.city}</p>
              <p>{address.country}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UserAdresses
