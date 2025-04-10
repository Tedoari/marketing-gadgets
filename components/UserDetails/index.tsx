'use client';

export default function UserDetails() {
  // Local static test data
  const user = {
    id: 'test-001',
    name: 'John Tester',
    email: 'john.tester@example.com',
    phone: '+31 6 98765432',
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <div className="space-y-2">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
      </div>
    </div>
  );
}
