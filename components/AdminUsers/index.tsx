"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  image: string;
  companyName?: string;
  addressId?: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    email: "",
    password: "",
    name: "",
    role: "user",
    image: "",
    companyName: "",
    addressId: undefined,
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add or Update a user
  const handleSaveUser = async () => {
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        await fetchUsers(); // Refresh the user list
        setNewUser({
          id: 0,
          email: "",
          password: "",
          name: "",
          role: "user",
          image: "",
        });
        setEditingUser(null);
      } else {
        console.error("Error saving user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchUsers(); // Refresh the user list
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit an existing user
  const handleEditUser = (user: User) => {
    setNewUser(user);
    setEditingUser(user);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>

      <div className="mt-4">
        <h2 className="text-xl text-gray-700">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>

        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({ ...newUser, role: e.target.value as "user" | "admin" })
          }
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          value={newUser.image}
          onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
          placeholder="Image URL"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          value={newUser.companyName || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, companyName: e.target.value })
          }
          placeholder="Company Name"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          value={newUser.addressId ?? ""}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              addressId: parseInt(e.target.value) || undefined,
            })
          }
          placeholder="Address ID"
          className="border border-gray-300 px-4 py-2 mb-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSaveUser}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl text-gray-700">User List</h2>
        <table className="w-full mt-4 border-collapse table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Company
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Address ID
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.companyName || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.addressId ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
