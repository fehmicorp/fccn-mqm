// src/app/(auth)/onboarding/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        
        {/* Progress Timeline Header */}
        <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Node Activation Wizard</h1>
            <p className="text-xs text-gray-400">Step {step} of 4</p>
          </div>
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-2 w-8 rounded-full transition-all ${step >= i ? 'bg-indigo-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="p-8">
          <Sequence>
            {/* Reason: Tracks exact current configuration states without breaking system hierarchy rules */}
            {step === 1 && (
              <Step title="Step 1: System Master Password Definition" subtitle="Secure access keys">
                <div className="space-y-4 mt-2">
                  <p className="text-xs text-gray-500">Define a strong administrative password to lock down configuration endpoints.</p>
                  <input type="password" placeholder="••••••••••••" className="w-full text-sm px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-indigo-500" />
                  <button onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white text-xs font-semibold py-2 rounded-md hover:bg-indigo-700">
                    Commit Access Password →
                  </button>
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title="Step 2: Initialize Relay Inbound SMTP Settings" subtitle="Verify connections">
                <div className="space-y-4 mt-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="smtp.relay.com" className="col-span-2 text-sm px-3 py-2 border rounded-md" />
                    <input type="number" placeholder="587" className="text-sm px-3 py-2 border rounded-md" />
                  </div>
                  <input type="email" placeholder="user@relay.com" className="w-full text-sm px-3 py-2 border rounded-md" />
                  <input type="password" placeholder="Password" className="w-full text-sm px-3 py-2 border rounded-md" />
                  <button onClick={() => setStep(3)} className="w-full bg-indigo-600 text-white text-xs font-semibold py-2 rounded-md hover:bg-indigo-700">
                    Verify & Mount Relay →
                  </button>
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step title="Step 3: Establish Core Email Layout Baseline" subtitle="Prepare payloads">
                <div className="space-y-4 mt-2">
                  <p className="text-xs text-gray-500">Drop your raw boilerplate template containing token hooks here.</p>
                  <textarea rows={4} defaultValue={`<h3>System Test Alert</h3>\n<p>Reference ID: \${{mobileNumber}}</p>`} className="w-full font-mono text-xs p-3 bg-gray-50 border rounded-md" />
                  <button onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white text-xs font-semibold py-2 rounded-md hover:bg-indigo-700">
                    Save Initial Payload Template →
                  </button>
                </div>
              </Step>
            )}

            {step === 4 && (
              <Step title="Step 4: Dispatch Initial Smoke Test Transmission" subtitle="Live testing">
                <div className="space-y-4 mt-2">
                  <p className="text-xs text-gray-500 font-medium text-amber-600">⚠️ This sends a live message through your configured server.</p>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Recipient Variable Target Address ($&#123;&#123;mobileNumber&#125;&#125;)</label>
                    <input type="text" placeholder="+919876543210" className="w-full text-sm px-3 py-2 border rounded-md" />
                  </div>
                  <button onClick={() => router.push('/')} className="w-full bg-green-600 text-white text-xs font-semibold py-2 rounded-md hover:bg-green-700 transition-all shadow-md">
                    🚀 Dispatch Production Test & Finish Setup
                  </button>
                </div>
              </Step>
            )}
          </Sequence>
        </div>
      </div>
    </div>
  );
}