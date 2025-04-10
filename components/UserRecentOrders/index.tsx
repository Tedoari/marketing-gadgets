'use client'

import React from 'react'

type Order = {
  id: number
  item: string
  address: string
  status: string
  date: string
}

const recentOrders: Order[] = [
  {
    id: 18447,
    item: 'Exter Game',
    address: 'Jadestraat 9, 2665 NS Bleiswijk',
    status: 'Shipped Back',
    date: '20-02-2025 16:49',
  },
  {
    id: 16719,
    item: 'Exter Game',
    address: 'Jadestraat 9, 2665 NS Bleiswijk',
    status: 'Completed',
    date: '08-01-2025 15:15',
  },
  {
    id: 14908,
    item: 'Robot Dog',
    address: 'Jadestraat 9, 2665 NS Bleiswijk',
    status: 'Completed',
    date: '17-12-2025 09:33',
  },
]

const UserRecentOrders = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Recent Orders</h2>
      <div className="space-y-2">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-purple-50 border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p>{order.item} towards {order.address}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{order.status}</p>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UserRecentOrders
