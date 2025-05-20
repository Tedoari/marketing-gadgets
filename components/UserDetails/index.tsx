'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function UserDetails() {
  const { data: session, status } = useSession();  // Added status to check if session is loading
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      console.log('Session User ID:', session.user.id);  // Log the session ID
      fetchUserData(Number(session.user.id)); // Ensure we are passing the correct user ID
    }
  }, [session]);

  const fetchUserData = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      
      console.log('API Response Status:', response.status);  // Log API response status
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched User Data:', data);  // Log the fetched data
        setUser(data);
      } else {
        console.error('Error fetching user data: Non-OK response');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <div className="space-y-2">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Image:</strong> {user.image ? <img src={user.image} alt="User Image" className="w-16 h-16 rounded-full" /> : 'No image'}</div>
      </div>
    </div>
  );
}
