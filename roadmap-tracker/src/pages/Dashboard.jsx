import React from 'react';
import { 
  Zap, 
  Award, 
  ChevronRight,
  TrendingDown,
  Activity,
  Award as Trophy
} from 'lucide-react';

export default function Dashboard({
  overallProgressPercent,
  needleRotation,
  dsaLogs,
  completedTasksCount,
  totalTasksCount,
  selectedWeek,
  setSelectedWeek,
  getWeekProgress,
  patternStats,
  phases,
  weeks,
  triggerSteamEffect,
  steamParticles,
  steamContainerRef,
  setActiveTab,
  profileSettings
}) {
  const userName = profileSettings?.name || "Guest";
  const userRole = profileSettings?.targetRole || "Software Engineer";
  const weeksCount = parseInt(profileSettings?.weeksCount) || 16;

  // Find current week milestone text
  const currentWeekData = weeks.find(w => w.weekNumber === selectedWeek);
  const currentMilestoneText = currentWeekData 
    ? currentWeekData.milestone.split('.')[0]
    : "Track weekly objectives.";

  const currentThemeText = currentWeekData 
    ? currentWeekData.theme 
    : "Review study materials.";

  // Calculate overall unaided rate
  const solvedUnaidedCount = dsaLogs.filter(l => l.solvedUnaided === 'Y').length;
  const overallUnaidedRate = dsaLogs.length > 0
    ? Math.round((solvedUnaidedCount / dsaLogs.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* ANTIMATERIAL METALLIC STEAM GAUGE */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="glass-reflection absolute inset-0 rounded-xl" />
        
        <div className="w-full text-center space-y-1 mb-4 z-10">
          <h3 className="font-display font-medium text-brass-light text-sm tracking-wider uppercase">Aetheric Steam Gauge</h3>
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest">{userName.toUpperCase()}'S BOILER CONVERSION RATE</p>
        </div>

        {/* ANALOG GAUGE GRAPHICS */}
        <div className="relative w-64 h-64 flex items-center justify-center z-10">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Gauge brass rim */}
            <circle cx="100" cy="100" r="92" fill="none" stroke="#2a1f11" strokeWidth="8" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="#683f12" strokeWidth="2" />
            <circle cx="100" cy="100" r="82" fill="#0c0c0f" />
            
            {/* Gears representation */}
            <g className="gear-cw opacity-20" style={{ transformOrigin: '100px 100px' }}>
              <path d="M96 20h8l2 15h-12z M96 180h8l2-15h-12z M20 96v8l15 2v-12z M180 96v8l-15 2v-12z" fill="#78350f" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#78350f" strokeWidth="4" />
            </g>
            
            <g className="gear-ccw opacity-15" style={{ transformOrigin: '140px 130px' }}>
              <path d="M136 70h8l2 12h-12z M136 190h8l2-12h-12z M70 126v8l12 2v-12z M190 126v8l-12 2v-12z" fill="#f59e0b" />
              <circle cx="140" cy="130" r="20" fill="none" stroke="#f59e0b" strokeWidth="3" />
            </g>

            {/* Calibration ticks */}
            {Array.from({ length: 11 }).map((_, i) => {
              const angle = -120 + i * 24; 
              const cos = Math.cos((angle - 90) * Math.PI / 180);
              const sin = Math.sin((angle - 90) * Math.PI / 180);
              const startX = 100 + cos * 74;
              const startY = 100 + sin * 74;
              const endX = 100 + cos * 82;
              const endY = 100 + sin * 82;
              return (
                <line 
                  key={i} 
                  x1={startX} 
                  y1={startY} 
                  x2={endX} 
                  y2={endY} 
                  stroke={i * 10 <= overallProgressPercent ? '#d97706' : '#27272a'} 
                  strokeWidth={i % 5 === 0 ? "3" : "1.5"} 
                />
              );
            })}

            {/* Colored Arc for current completion */}
            {overallProgressPercent > 0 && (
              <path
                d={`M ${100 + Math.cos((-210) * Math.PI / 180) * 78} ${100 + Math.sin((-210) * Math.PI / 180) * 78} 
                   A 78 78 0 ${overallProgressPercent > 75 ? 1 : 0} 1 
                   ${100 + Math.cos((-210 + (overallProgressPercent / 100) * 240 - 90) * Math.PI / 180) * 78} 
                   ${100 + Math.sin((-210 + (overallProgressPercent / 100) * 240 - 90) * Math.PI / 180) * 78}`}
                fill="none"
                stroke="#d97706"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.8"
              />
            )}

            {/* Indicator needle */}
            <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '100px 100px', transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <polygon points="100,28 95,95 105,95" fill="#f59e0b" />
              <line x1="100" y1="28" x2="100" y2="105" stroke="#f59e0b" strokeWidth="2" />
              <polygon points="100,28 98,40 102,40" fill="#ffffff" />
            </g>
            
            {/* Center pin cap */}
            <circle cx="100" cy="100" r="14" fill="#18181b" stroke="#78350f" strokeWidth="2" />
            <circle cx="100" cy="100" r="8" fill="#d97706" />
            <circle cx="100" cy="100" r="4" fill="#f59e0b" />
          </svg>

          {/* Steam emitter particle container */}
          <div ref={steamContainerRef} className="absolute inset-0 z-0">
            {steamParticles.map(p => (
              <span 
                key={p.id} 
                className="steam-particle"
                style={{ 
                  left: p.left, 
                  width: p.size, 
                  height: p.size, 
                  top: '40%',
                  animationDelay: p.delay 
                }} 
              />
            ))}
          </div>
        </div>

        {/* NIXIE TUBE DIGITAL READOUT */}
        <div className="mt-4 flex gap-1 z-10">
          {String(overallProgressPercent).padStart(3, '0').split('').map((char, i) => (
            <div key={i} className="nixie-tube w-10 h-14 flex items-center justify-center text-2xl font-bold font-mono rounded border">
              {char}
            </div>
          ))}
          <div className="nixie-tube w-10 h-14 flex items-center justify-center text-xl font-bold font-mono rounded border">
            %
          </div>
        </div>

        {/* PRESSURE RELEASE BUTTON */}
        <button 
          onClick={triggerSteamEffect} 
          className="mt-6 flex items-center gap-1.5 px-4 py-2 rounded-full border border-brass-light/40 bg-zinc-950 text-[10px] uppercase font-bold tracking-widest text-brass-light hover:bg-brass-glow/10 active:scale-95 transition-all shadow-[0_0_10px_rgba(217,119,6,0.1)] cursor-pointer font-mono"
        >
          <Zap className="w-3.5 h-3.5 text-brass-light animate-pulse-short" /> VENT STEAM VALVE
        </button>
      </div>

      {/* QUICK STATS & TARGET SUMMARY */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative flex flex-col justify-between backdrop-blur-md">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase">DSA LOGS</span>
              <span className="text-3xl font-display font-semibold text-white block mt-2">
                {dsaLogs.length}
              </span>
              <p className="text-xs text-zinc-400 mt-1">Logged Problems</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Unaided Rate</span>
              <span className="text-xs font-mono text-brass-light font-bold">
                {overallUnaidedRate}%
              </span>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative flex flex-col justify-between backdrop-blur-md">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase">COMPLETED TASKS</span>
              <span className="text-3xl font-display font-semibold text-white block mt-2">
                {completedTasksCount}<span className="text-sm text-zinc-500 font-sans"> / {totalTasksCount}</span>
              </span>
              <p className="text-xs text-zinc-400 mt-1">Checklist progress</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Remaining</span>
              <span className="text-xs font-mono text-zinc-300">
                {totalTasksCount - completedTasksCount} Tasks
              </span>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative flex flex-col justify-between backdrop-blur-md">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase">CURRENT MILESTONE</span>
              <span className="text-sm font-display font-semibold text-white block mt-2 leading-snug">
                Week {selectedWeek}: {currentMilestoneText}
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Week Progress</span>
              <span className="text-xs font-mono text-brass-light font-bold">{getWeekProgress(selectedWeek)}%</span>
            </div>
          </div>
        </div>

        {/* COGNITIVE GAP ANALYSIS & ROADMAP TARGETS */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
          <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brass-light" /> ROADMAP SEGMENTS & STAGES
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-xs leading-relaxed text-zinc-300">
              <strong className="text-brass-light block text-sm mb-1 font-display">⚡ Welcome Back, {userName}! (Target: {userRole})</strong>
              "You build fast and explain slow. Touching a tool isn't the same as understanding what it's doing for you. This roadmap forces you to explain concepts out loud to build depth over breadth."
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phases.map((p, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">{p.name.split(':')[1] || p.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono font-semibold">{p.weeks}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-medium line-clamp-2">{p.focus}</p>
                  <div className="pt-2 border-t border-zinc-800/60">
                    <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wide">Exit Standard</span>
                    <p className="text-[10px] text-zinc-400 line-clamp-3">{p.exitCriteria}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WEAK PATTERNS LOG DETECTOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold font-display text-white mb-3 tracking-wider uppercase flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                Weak Patterns Log (Low Unaided %)
              </h3>
              {patternStats.length > 0 ? (
                <div className="space-y-3">
                  {patternStats.slice(0, 3).map((pat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-300">{pat.name}</span>
                        <span className="text-red-400">{pat.unaidedRate}% unaided ({pat.total} solved)</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full animate-pulse-short" 
                          style={{ width: `${pat.unaidedRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500 font-mono">
                  No logs recorded yet. Attempt & log problems in the DSA Log to identify weak patterns.
                </div>
              )}
            </div>
            <button 
              onClick={() => setActiveTab('dsa-log')}
              className="mt-4 w-full flex items-center justify-center gap-1 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-brass-light transition-all cursor-pointer font-mono"
            >
              Open Logbook <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold font-display text-white mb-2 tracking-wider uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brass-light" />
                Study Blueprint Tracker
              </h3>
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Week Select</span>
                  <select 
                    value={selectedWeek} 
                    onChange={(e) => setSelectedWeek(Number(e.target.value))}
                    className="bg-zinc-950 border border-zinc-800 rounded px-2 py-0.5 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono font-semibold"
                  >
                    {Array.from({ length: weeksCount }).map((_, i) => (
                      <option key={i} value={i + 1}>Week {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Weekly Theme</span>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                    {currentThemeText}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('daily')}
              className="mt-4 w-full flex items-center justify-center gap-1 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-brass-light transition-all cursor-pointer font-mono"
            >
              Go to Week {selectedWeek} Checklist <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
