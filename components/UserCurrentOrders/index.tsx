'use client'

import React from 'react'

type Order = {
  id: number
  item: string
  address: string
  status: string
  date: string
}

const currentOrder: Order = {
  id: 21682,
  item: 'Robot Dog',
  address: 'Jadestraat 9, 2665 NS Bleiswijk',
  status: 'Shipped',
  date: '11-03-2025 13:21',
}

const UserCurrentOrders = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Current Order</h2>
      <div className="bg-purple-50 border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-start">
        <div>
          <p className="font-medium">Order #{currentOrder.id}</p>
          <p>{currentOrder.item} towards {currentOrder.address}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{currentOrder.status}</p>
          <p className="text-sm text-gray-600">{currentOrder.date}</p>
        </div>
      </div>
    </section>
  )
}

export default UserCurrentOrders
