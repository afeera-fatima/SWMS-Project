// --- AdminPanel.tsx ---
import React from 'react';

const AdminPanel = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold">All Contacts</h3>
          <input className="w-full border p-2 mt-2" placeholder="Search by name, email, or company" />
        </section>

        <section>
          <h3 className="text-lg font-semibold">User Controls</h3>
          <ul className="list-disc ml-6">
            <li>View/Edit SWMS Documents</li>
            <li>Manually Credit Accounts</li>
            <li>Activate/Deactivate Accounts</li>
            <li>Reset Passwords</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold">Billing & Analytics</h3>
          <p>Restricted section for usage statistics, billing history, and admin-only data.</p>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;