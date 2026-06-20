import React, { useState, useEffect } from 'react';
import { Database, CloudLightning, Loader } from 'lucide-react';

export default function SkeletonLoader({ activeTab = 'dashboard' }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Show detailed loading status only if the loading time is long (e.g., > 700ms)
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cyber-bg text-gray-400 select-none animate-pulse-slow">
      {/* 1. Header Skeleton */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 flex flex-col lg:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse-short" />
          <div className="space-y-1.5 flex-1 md:flex-initial">
            <div className="w-32 h-4 bg-zinc-800 rounded animate-pulse-short" />
            <div className="w-48 h-3 bg-zinc-900 rounded animate-pulse-short" />
          </div>
        </div>

        {/* Navigation Tabs Skeleton */}
        <div className="flex justify-start lg:justify-center w-full lg:flex-1 lg:-ml-24 overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg min-w-max">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-28 h-7 bg-zinc-800/50 rounded-md animate-pulse-short" />
            ))}
          </div>
        </div>

        <div className="w-32 h-8 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse-short hidden lg:block" />
      </header>

      {/* 2. Main Content Skeleton (adapted by Active Tab) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Dynamic Skeleton Content based on Tab */}
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gauge Column */}
            <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-6 h-[380px] flex flex-col items-center justify-between">
              <div className="w-40 h-4 bg-zinc-900 rounded" />
              <div className="w-48 h-48 rounded-full border-8 border-zinc-900 flex items-center justify-center">
                <div className="w-24 h-6 bg-zinc-900 rounded" />
              </div>
              <div className="w-32 h-3 bg-zinc-900 rounded" />
            </div>

            {/* Middle Stats Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl h-24 space-y-3">
                    <div className="w-8 h-8 rounded bg-zinc-900" />
                    <div className="w-12 h-3 bg-zinc-900 rounded" />
                  </div>
                ))}
              </div>
              
              <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-xl h-[240px] space-y-4">
                <div className="w-48 h-4 bg-zinc-900 rounded" />
                <div className="space-y-2">
                  <div className="w-full h-8 bg-zinc-900/60 rounded" />
                  <div className="w-full h-8 bg-zinc-900/60 rounded" />
                  <div className="w-full h-8 bg-zinc-900/60 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'daily' ? (
          <div className="space-y-6">
            {/* Week Select Header */}
            <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl">
              <div className="w-36 h-5 bg-zinc-900 rounded" />
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-zinc-900" />
                <div className="w-12 h-8 rounded bg-zinc-900" />
                <div className="w-8 h-8 rounded bg-zinc-900" />
              </div>
            </div>

            {/* 6 Day Grid Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl space-y-4 min-h-[180px]">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <div className="w-16 h-4 bg-zinc-900 rounded" />
                    <div className="w-4 h-4 rounded bg-zinc-900" />
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-3 bg-zinc-900/70 rounded" />
                    <div className="w-5/6 h-3 bg-zinc-900/70 rounded" />
                    <div className="w-4/5 h-3 bg-zinc-900/70 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* General fallback structure */
          <div className="space-y-6">
            <div className="w-64 h-6 bg-zinc-900 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-xl h-64 animate-pulse-short" />
              <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-xl h-64 animate-pulse-short" />
            </div>
            <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-xl h-48 animate-pulse-short" />
          </div>
        )}
      </main>

      {/* 3. Progressive Loading Detail Modal (Visible ONLY if loading time is long) */}
      {showDetails && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 border border-brass-light/30 text-zinc-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in max-w-sm">
          <div className="relative">
            <Loader className="w-5 h-5 text-brass-light animate-spin" />
            <Database className="w-2.5 h-2.5 text-zinc-400 absolute inset-0 m-auto" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-white uppercase tracking-wider font-display">Synchronizing Dashboard</p>
            <p className="text-[10px] text-zinc-400">Performing secure telemetry handshake with cloud databases...</p>
          </div>
        </div>
      )}
    </div>
  );
}
