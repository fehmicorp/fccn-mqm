"use client";

import React, { useState } from 'react';

// Deep Analytical Mock Data
const brokerMetrics = {
  totalInFlight: 4329,
  globalThroughput: "1,240 msg/sec",
  avgLatency: "142ms",
  activeWorkers: 48,
  backpressureStatus: "Normal", // Normal, Warning, High
};

const analyticsChannels = {
  email: {
    title: "Email Queue (SMTP/SES Cluster)",
    successRate: 98.42,
    ingressRate: "340 m/s",
    egressRate: "338 m/s",
    lag: 142,
    dlqCount: 14,
    p95Latency: "420ms",
    p99Latency: "1.2s",
    memoryUsage: "1.2 GB",
    status: "optimal",
  },
  whatsapp: {
    title: "WhatsApp Business API Gateway",
    successRate: 99.89,
    ingressRate: "720 m/s",
    egressRate: "719 m/s",
    lag: 12,
    dlqCount: 2,
    p95Latency: "85ms",
    p99Latency: "210ms",
    memoryUsage: "2.4 GB",
    status: "optimal",
  },
  sms: {
    title: "SMS Aggregator Node (Twilio/Infobip)",
    successRate: 94.12,
    ingressRate: "180 m/s",
    egressRate: "145 m/s",
    lag: 1890, // High lag indicates bottleneck
    dlqCount: 142,
    p95Latency: "850ms",
    p99Latency: "4.6s", // Spike
    memoryUsage: "850 MB",
    status: "degraded",
  }
};

const historicalTimeline = [
  { time: "23:15", email: 310, whatsapp: 680, sms: 140 },
  { time: "23:10", email: 340, whatsapp: 710, sms: 155 },
  { time: "23:05", email: 410, whatsapp: 750, sms: 210 },
  { time: "23:00", email: 290, whatsapp: 640, sms: 245 }, // SMS bottleneck started here
  { time: "22:55", email: 300, whatsapp: 620, sms: 130 },
];

export default function Dash() {
  const [activeTab, setActiveTab] = useState<'all' | 'sending' | 'receiving'>('all');

  return (
    <section className="scroll-mt-16 space-y-6 max-w-[1600px] mx-auto text-slate-900 dark:text-slate-100 font-sans antialiased">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight">System Telemetry</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 animate-pulse">
              Live
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Cluster-wide data pipelines for transactional and event-driven messaging tasks.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:items-start gap-3 sm:gap-6 bg-stone-100 dark:bg-stone-900 p-3 rounded-xl border border-stone-300 dark:border-stone-700">
          <div className="px-2">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">Total In-Flight</span>
            <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">{brokerMetrics.totalInFlight}</span>
          </div>
          <div className="px-2 border-l border-stone-200 dark:border-stone-800 hidden sm:block">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">Global Velocity</span>
            <span className="text-base font-bold font-mono">{brokerMetrics.globalThroughput}</span>
          </div>
          <div className="px-2 border-l border-stone-200 dark:border-stone-800">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">Avg Processing Latency</span>
            <span className="text-base font-bold font-mono">{brokerMetrics.avgLatency}</span>
          </div>
          <div className="px-2 border-l border-stone-200 dark:border-stone-800 hidden sm:block">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">Backpressure</span>
            <span className="text-base font-bold text-emerald-500">{brokerMetrics.backpressureStatus}</span>
          </div>
        </div>
      </div>

      {/* 2. CHANNELS DETAILED ANALYTICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="analytics-channels">
        {Object.entries(analyticsChannels).map(([key, data]) => (
          <div 
            key={key}
            className={`rounded-xl border p-5 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 flex flex-col justify-between ${
              data.status === 'degraded' 
                ? 'border-amber-300 dark:border-amber-900/60 ring-2 ring-amber-500/10' 
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Component Header */}
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-base tracking-tight">{data.title}</h3>
                  <span className="text-xs font-mono text-slate-400">{data.memoryUsage} Broker Heap</span>
                </div>
                <span className={`px-2 py-1 text-xs font-mono rounded font-semibold ${
                  data.successRate >= 98 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                    : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                }`}>
                  {data.successRate}% Acc
                </span>
              </div>

              {/* Ingress vs Egress Node Comparison */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850 my-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Ingress (Produce)</span>
                  <span className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400">{data.ingressRate}</span>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-3">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Egress (Consume)</span>
                  <span className="text-lg font-bold font-mono text-violet-600 dark:text-violet-400">{data.egressRate}</span>
                </div>
              </div>

              {/* Latency Quantiles & Structural Insights */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>p95 / p99 Latency Profile</span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{data.p95Latency} / {data.p99Latency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Current Consumer Lag</span>
                  <span className={`font-mono font-bold ${data.lag > 500 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {data.lag === 0 ? 'Synced' : `${data.lag} tasks`}
                  </span>
                </div>
              </div>
            </div>

            {/* Critical Alerting Footers for Degraded Pipelines */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${data.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
                <span className="text-xs font-medium text-slate-400">DLQ Volatility</span>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                data.dlqCount > 50 
                  ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {data.dlqCount} drops
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Throughput Density Matrix</h2>
                <p className="text-xs text-slate-400">Time-correlated comparative data profiles across active consumers.</p>
              </div>
              <div className="flex gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 shadow-sm font-semibold">60m</button>
                <button className="px-2.5 py-1 rounded text-slate-400 hover:text-slate-600">24h</button>
              </div>
            </div>
          </div>

          <div className="h-56 my-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850 flex items-end justify-between p-6 relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-150">
              <span className="text-xs font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                [Mount Chart Library: Multi-line LineChart or AreaChart configured here]
              </span>
            </div>

            {historicalTimeline.map((snap, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end px-2 sm:px-4">
                <div className="w-full flex items-end justify-center gap-1 h-3/4">
                  <div style={{ height: `${snap.whatsapp / 8}%` }} className="w-3 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm" title={`WhatsApp: ${snap.whatsapp}`} />
                  <div style={{ height: `${snap.email / 8}%` }} className="w-3 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-sm" title={`Email: ${snap.email}`} />
                  <div style={{ height: `${snap.sms / 8}%` }} className="w-3 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-sm" title={`SMS: ${snap.sms}`} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1">{snap.time}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs font-mono border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full" />
              <span>WhatsApp Core</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-sky-500 rounded-full" />
              <span>Email Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-amber-500 rounded-full" />
              <span>SMS Transports</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold">Node Diagnostics</h2>
            <p className="text-xs text-slate-400">Automated structural cluster evaluations.</p>
          </div>
          
          <div className="space-y-3 my-auto">
            <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/40">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-rose-700 dark:text-rose-400">SMS Broker Consumer Lag</span>
                <span className="font-mono bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded text-[10px]">High Friction</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Consumer group <code className="font-mono px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">sms-core-workers</code> matches lag limits. Outbound aggregators are returning a sustained <code className="font-mono text-amber-600">HTTP 429 Too Many Requests</code>. Backpressure routines running.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">Cluster Worker Pool Allocations</span>
                <span className="font-mono text-slate-400">48 / 64 Cores</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[75%]" />
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-lg text-xs font-semibold tracking-wide transition-all">
            Scale Out Worker Subscriptions (+8 Nodes)
          </button>
        </div>
      </div> */}

      {/* <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Active Partition Workers</h2>
            <p className="text-xs text-slate-400">Real-time breakdown of internal thread executions by state.</p>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium">
            {(['all', 'sending', 'receiving'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md transition-all uppercase text-[10px] tracking-wider ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-slate-900 shadow-sm font-bold text-slate-900 dark:text-white' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Partition / Job Key</th>
                <th className="p-4">Channel Origin</th>
                <th className="p-4">Pipeline Execution</th>
                <th className="p-4">Payload Context Descriptor</th>
                <th className="p-4 text-right">Throughput Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-mono">
              <tr className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                <td className="p-4 font-bold text-indigo-500">job_node_8a2d</td>
                <td className="p-4"><span className="font-sans px-2.5 py-0.5 text-xs rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 font-medium border border-emerald-100 dark:border-emerald-900">WhatsApp</span></td>
                <td className="p-4"><span className="text-xs text-sky-500 font-medium">Outbound Egress</span></td>
                <td className="p-4 font-sans text-slate-500 dark:text-slate-400 text-xs">Auth OTP MFA Notification Broker Cluster</td>
                <td className="p-4 text-right font-bold text-slate-700 dark:text-slate-300">1,420 m/s</td>
              </tr>
              <tr className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors bg-amber-50/10 dark:bg-amber-950/5">
                <td className="p-4 font-bold text-indigo-500">job_node_4f9a</td>
                <td className="p-4"><span className="font-sans px-2.5 py-0.5 text-xs rounded bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 font-medium border border-amber-100 dark:border-amber-900">SMS Transport</span></td>
                <td className="p-4"><span className="text-xs text-sky-500 font-medium">Outbound Egress</span></td>
                <td className="p-4 font-sans text-slate-400 text-xs flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span>Bulk Marketing Campaign Pipeline (Throttled by rate limiter)</span>
                </td>
                <td className="p-4 text-right font-bold text-amber-500">85 m/s</td>
              </tr>
              <tr className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                <td className="p-4 font-bold text-indigo-500">job_node_c102</td>
                <td className="p-4"><span className="font-sans px-2.5 py-0.5 text-xs rounded bg-sky-50 text-sky-800 dark:bg-sky-950/30 dark:text-sky-400 font-medium border border-sky-100 dark:border-sky-900">Email Engine</span></td>
                <td className="p-4"><span className="text-xs text-violet-500 font-medium">Inbound Ingress</span></td>
                <td className="p-4 font-sans text-slate-500 dark:text-slate-400 text-xs">SES Outbound Bounce Hooks Parser Handler</td>
                <td className="p-4 text-right font-bold text-slate-700 dark:text-slate-300">612 m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

    </section>
  );
}