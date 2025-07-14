// --- AccountPage.tsx ---
import React from 'react';

const AccountPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Account</h2>
      <form className="space-y-4 max-w-md">
        <input className="w-full border p-2" placeholder="Full Name" />
        <input className="w-full border p-2" placeholder="Email" />
        <input className="w-full border p-2" placeholder="Mobile Number" />
        <input className="w-full border p-2" placeholder="Password" type="password" />
        <label className="block">Company Logo</label>
        <input className="w-full border p-2" type="file" />
        <button className="bg-blue-600 text-white px-4 py-2">Save</button>
      </form>
    </div>
  );
};

export default AccountPage;