// src/app/(auth)/signup/page.tsx
"use client";
import { useState } from 'react';

export default function SignupPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-3xl">✉️</span>
          <h2 className="text-2xl font-bold mt-2">Create Mailer Node</h2>
          <p className="text-xs text-gray-400 mt-1">Register to start managing high-throughput delivery nodes</p>
        </div>

        {!sent ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">System Account Email</label>
              <input type="email" required placeholder="sysops@fehmicorp.com" className="w-full text-sm px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-indigo-700 transition-all shadow-md">
              Send Provisioning Magic Link
            </button>
          </form>
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <h3 className="text-green-800 font-bold text-sm">Provisioning Verification Transmitted!</h3>
            <p className="text-xs text-green-700 mt-1">Check your inbox for the active pipeline activation configuration bridge.</p>
            <a href="/onboarding" className="mt-4 inline-block text-xs bg-green-800 text-white px-3 py-1.5 rounded font-medium">
              Simulate Clicking Link Instead
            </a>
          </div>
        )}
      </div>
    </div>
  );
}