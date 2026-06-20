import React, { useState } from 'react';
import { 
  Award, 
  RefreshCw, 
  LogOut, 
  CloudLightning, 
  Info, 
  Target, 
  Sparkles,
  Edit3
} from 'lucide-react';

export default function LeetcodeHub({
  leetcodeUsername,
  leetcodeStats,
  isLeetcodeLoading,
  leetcodeError,
  leetcodeGoal,
  handleUpdateGoal,
  triggerLeetcodeSync,
  handleDisconnectLeetcode,
  getWeeklyDsaCount,
  selectedWeek,
  saveLeetcodeProfile,
  weeks
}) {
  const [isManualMode, setIsManualMode] = useState(leetcodeStats?.isManual || false);
  const [manualEasy, setManualEasy] = useState(leetcodeStats?.easySolved || 0);
  const [manualMedium, setManualMedium] = useState(leetcodeStats?.mediumSolved || 0);
  const [manualHard, setManualHard] = useState(leetcodeStats?.hardSolved || 0);
  const [manualRank, setManualRank] = useState(leetcodeStats?.ranking || 999999);

  // Helper to trigger manual stats save
  const handleSaveManualStats = (e) => {
    e.preventDefault();
    const easy = parseInt(manualEasy) || 0;
    const medium = parseInt(manualMedium) || 0;
    const hard = parseInt(manualHard) || 0;
    const totalSolved = easy + medium + hard;
    const ranking = parseInt(manualRank) || 999999;
    
    const manualStats = {
      username: leetcodeUsername || 'Manual User',
      ranking,
      totalSolved,
      totalQuestions: 3300,
      easySolved: easy,
      totalEasy: 820,
      mediumSolved: medium,
      totalMedium: 1620,
      hardSolved: hard,
      totalHard: 860,
      acceptanceRate: parseFloat(((easy * 0.4 + medium * 0.5 + hard * 0.6) / (totalSolved || 1) * 100).toFixed(1)),
      contributionPoints: 0,
      reputation: 0,
      submissionCalendar: leetcodeStats?.submissionCalendar || {},
      isSimulated: false,
      isManual: true
    };
    saveLeetcodeProfile(leetcodeUsername || 'Manual User', manualStats, leetcodeGoal);
  };

  const handleToggleManualMode = (checked) => {
    setIsManualMode(checked);
    if (checked) {
      // Initialize manual values with current stats if they exist
      setManualEasy(leetcodeStats?.easySolved || 0);
      setManualMedium(leetcodeStats?.mediumSolved || 0);
      setManualHard(leetcodeStats?.hardSolved || 0);
      setManualRank(leetcodeStats?.ranking || 999999);
      
      const manualStats = {
        username: leetcodeUsername || 'Manual User',
        ranking: leetcodeStats?.ranking || 999999,
        totalSolved: (leetcodeStats?.easySolved || 0) + (leetcodeStats?.mediumSolved || 0) + (leetcodeStats?.hardSolved || 0),
        totalQuestions: 3300,
        easySolved: leetcodeStats?.easySolved || 0,
        totalEasy: 820,
        mediumSolved: leetcodeStats?.mediumSolved || 0,
        totalMedium: 1620,
        hardSolved: leetcodeStats?.hardSolved || 0,
        totalHard: 860,
        acceptanceRate: leetcodeStats?.acceptanceRate || 40,
        contributionPoints: 0,
        reputation: 0,
        submissionCalendar: leetcodeStats?.submissionCalendar || {},
        isSimulated: false,
        isManual: true
      };
      saveLeetcodeProfile(leetcodeUsername || 'Manual User', manualStats, leetcodeGoal);
    } else {
      if (leetcodeUsername && leetcodeUsername !== 'Manual User') {
        triggerLeetcodeSync(leetcodeUsername, true);
      }
    }
  };

  // Helper to compile grid dates for contribution map
  const getContributionGridData = () => {
    const dataList = [];
    const now = new Date();
    const calendar = leetcodeStats?.submissionCalendar || {};
    
    // We want exactly 180 cells (7 rows x 26 columns = 182 cells)
    const totalDays = 182;
    
    for (let i = totalDays - 1; i >= 0; i--) {
      const dayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayStartSecs = Math.floor(dayDate.setHours(0,0,0,0) / 1000);
      
      let count = 0;
      // LeetCode calendar data timestamps are in seconds
      if (calendar[String(dayStartSecs)]) {
        count = calendar[String(dayStartSecs)];
      } else {
        // Fallback search within +/- 12 hrs
        const matchingKey = Object.keys(calendar).find(k => {
          const diff = Math.abs(parseInt(k) - dayStartSecs);
          return diff < 43200; // 12 hrs in seconds
        });
        if (matchingKey) count = calendar[matchingKey];
      }
      
      dataList.push({
        date: dayDate,
        count: count
      });
    }
    return dataList;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HUB HEADER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
            LeetCode Grind Telemetry Hub
            {leetcodeStats && (
              <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase font-mono tracking-wider font-semibold ${
                leetcodeStats.isManual 
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-400' 
                  : leetcodeStats.isSimulated
                    ? 'bg-blue-950/40 border-blue-500/40 text-blue-400'
                    : 'bg-green-950/40 border-green-500/40 text-green-400'
              }`}>
                {leetcodeStats.isManual ? 'Manual Entry active' : leetcodeStats.isSimulated ? 'Simulated Link' : 'Live Sync Active'}
              </span>
            )}
          </h2>
          <p className="text-xs text-zinc-400">Establish a live telemetry feed with LeetCode API to monitor solve counts and grind activity.</p>
        </div>
        
        {leetcodeUsername && (
          <div className="flex items-center gap-2">
            {!isManualMode && (
              <button
                onClick={() => triggerLeetcodeSync(leetcodeUsername, true)}
                disabled={isLeetcodeLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer font-mono"
                title="Sync Stats"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLeetcodeLoading ? 'animate-spin' : ''}`} />
                Sync
              </button>
            )}
            <button
              onClick={handleDisconnectLeetcode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 border border-red-900/40 hover:bg-red-900/40 text-red-400 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono"
              title="Disconnect Profile"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* UNCONNECTED STATE */}
      {!leetcodeUsername ? (
        <div className="max-w-md mx-auto bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-2xl space-y-6 backdrop-blur-md relative overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-24 h-24 bg-brass-glow/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-brass-glow/10 border border-brass-light/20 text-brass-light shadow-[0_0_15px_rgba(217,119,6,0.1)]">
              <Award className="w-6 h-6 animate-pulse-short" />
            </div>
            <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
              Engage LeetCode Link
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs mx-auto">
              Enter your LeetCode handle below to load stats and track weekly problem solving goals.
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.username.value.trim();
              if (input) triggerLeetcodeSync(input, true);
            }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 font-mono uppercase block">LeetCode Username</label>
              <input 
                name="username"
                type="text" 
                required 
                placeholder="e.g. himanshu_codes"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brass-light rounded-lg px-3 py-2 text-white text-xs transition-all font-mono"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLeetcodeLoading}
              className="w-full py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)] disabled:opacity-50 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-display tracking-wider"
            >
              {isLeetcodeLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Synchronizing Telemetry...
                </>
              ) : (
                <>
                  <CloudLightning className="w-3.5 h-3.5" />
                  Ignite Link
                </>
              )}
            </button>
          </form>

          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg text-[10px] text-zinc-500 leading-normal flex gap-2">
            <Info className="w-3.5 h-3.5 text-brass-light shrink-0 mt-0.5" />
            <span>
              Note: Ensure your username matches the exact casing of your LeetCode profile URL. Type <strong className="text-zinc-400">demo</strong> or <strong className="text-zinc-400">debug_user</strong> to test with mock stats if you don't have an account.
            </span>
          </div>
        </div>
      ) : (
        /* CONNECTED STATUS CONTENT */
        <div className="space-y-6">
          
          {/* TROUBLESHOOT WARNING */}
          <div className="p-4 bg-zinc-950/80 border border-zinc-800/80 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-3 items-start">
              <Info className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white block">Troubleshooting Sync Issues</span>
                <span className="text-[10px] text-zinc-400 block leading-normal">
                  Verify your username matches the exact case (e.g. Himanshu vs himanshu). If network/CORS issues persist, enable Manual Entry on the right to input solved counts directly.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 select-none">
              <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Enable Manual Entry</label>
              <input 
                type="checkbox"
                checked={isManualMode}
                onChange={(e) => handleToggleManualMode(e.target.checked)}
                className="w-4 h-4 accent-brass-light cursor-pointer"
              />
            </div>
          </div>

          {/* LOADING LOADER */}
          {isLeetcodeLoading && !leetcodeStats && (
            <div className="py-24 flex flex-col items-center justify-center gap-4 bg-zinc-950/40 border border-zinc-900 rounded-xl">
              <div className="relative">
                <RefreshCw className="w-8 h-8 text-brass-light animate-spin" />
                <div className="absolute inset-0 w-8 h-8 rounded-full border border-brass-light/20 border-t-transparent animate-ping" />
              </div>
              <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">Receiving Telemetry Packets...</p>
            </div>
          )}

          {/* ERROR PANEL */}
          {leetcodeError && !isManualMode && (
            <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 rounded-lg text-xs leading-relaxed text-center space-y-2 max-w-md mx-auto">
              <p>⚠️ Sync failed: {leetcodeError}</p>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => triggerLeetcodeSync(leetcodeUsername, true)}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] uppercase font-bold text-red-400 rounded transition-all cursor-pointer font-mono"
                >
                  Retry Connection
                </button>
                <button 
                  onClick={() => handleToggleManualMode(true)}
                  className="px-3 py-1 bg-brass-glow/20 border border-brass-light/30 text-[10px] uppercase font-bold text-brass-light rounded transition-all cursor-pointer font-mono"
                >
                  Use Manual Entry
                </button>
              </div>
            </div>
          )}

          {/* STATS CONTENT */}
          {leetcodeStats && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT COLUMN: TOTAL SOLVED & DIFFICULTY GAUGES */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Nixie Readouts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="nixie-tube rounded-xl p-4 flex flex-col justify-between min-h-[100px] relative">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Global Ranking</span>
                    <span className="text-xl font-bold tracking-widest text-orange-400 font-mono mt-2 block select-none">
                      {leetcodeStats.ranking && leetcodeStats.ranking < 999999 ? Number(leetcodeStats.ranking).toLocaleString() : 'N/A'}
                    </span>
                    <div className="glass-reflection absolute inset-0 rounded-xl" />
                  </div>

                  <div className="nixie-tube rounded-xl p-4 flex flex-col justify-between min-h-[100px] relative">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Total Solved</span>
                    <span className="text-xl font-bold tracking-widest text-orange-400 font-mono mt-2 block select-none">
                      {leetcodeStats.totalSolved} <span className="text-[10px] text-zinc-500">/ {leetcodeStats.totalQuestions}</span>
                    </span>
                    <div className="glass-reflection absolute inset-0 rounded-xl" />
                  </div>
                </div>

                {/* Acceptance Rate and Reputation */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative overflow-hidden flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Acceptance Rate</span>
                    <div className="text-base font-bold text-white font-mono">{leetcodeStats.acceptanceRate}%</div>
                  </div>
                  <div className="h-10 w-px bg-zinc-900" />
                  <div className="space-y-1 text-right">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Reputation Points</span>
                    <div className="text-base font-bold text-brass-light font-mono">{leetcodeStats.reputation || 0}</div>
                  </div>
                </div>

                {/* Difficulty Breakdown (Read-Only when not in Manual Mode) */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg space-y-4">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono border-b border-zinc-900 pb-2 flex items-center justify-between">
                    <span>Solved Breakdown</span>
                    {isManualMode && <span className="text-[9px] text-amber-500 lowercase font-semibold font-sans italic flex items-center gap-1"><Edit3 className="w-3 h-3" /> editing manual counts</span>}
                  </h4>

                  {isManualMode ? (
                    <form onSubmit={handleSaveManualStats} className="space-y-4">
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center gap-2">
                          <label className="font-bold text-green-400 uppercase text-[9px] font-mono">Easy Solved</label>
                          <input 
                            type="number"
                            value={manualEasy}
                            onChange={(e) => setManualEasy(e.target.value)}
                            className="w-20 bg-zinc-900 border border-zinc-800 text-white font-mono rounded text-right px-2 py-0.5 text-xs focus:outline-none focus:border-brass-light font-semibold"
                          />
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <label className="font-bold text-yellow-500 uppercase text-[9px] font-mono">Medium Solved</label>
                          <input 
                            type="number"
                            value={manualMedium}
                            onChange={(e) => setManualMedium(e.target.value)}
                            className="w-20 bg-zinc-900 border border-zinc-800 text-white font-mono rounded text-right px-2 py-0.5 text-xs focus:outline-none focus:border-brass-light font-semibold"
                          />
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <label className="font-bold text-red-500 uppercase text-[9px] font-mono">Hard Solved</label>
                          <input 
                            type="number"
                            value={manualHard}
                            onChange={(e) => setManualHard(e.target.value)}
                            className="w-20 bg-zinc-900 border border-zinc-800 text-white font-mono rounded text-right px-2 py-0.5 text-xs focus:outline-none focus:border-brass-light font-semibold"
                          />
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <label className="font-bold text-zinc-500 uppercase text-[9px] font-mono">Global Rank</label>
                          <input 
                            type="number"
                            value={manualRank}
                            onChange={(e) => setManualRank(e.target.value)}
                            className="w-24 bg-zinc-900 border border-zinc-800 text-white font-mono rounded text-right px-2 py-0.5 text-xs focus:outline-none focus:border-brass-light font-semibold"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-1.5 bg-brass-glow text-white font-bold rounded-lg text-xs hover:bg-brass-glow/90 active:scale-95 transition-all shadow-[0_0_10px_rgba(217,119,6,0.1)] cursor-pointer"
                      >
                        Apply Solve Counts
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {/* Easy */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-green-400 font-bold uppercase text-[9px]">Easy</span>
                          <span className="text-zinc-400">{leetcodeStats.easySolved || 0} <span className="text-zinc-600">/ {leetcodeStats.totalEasy || 820}</span></span>
                        </div>
                        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                          <div 
                            className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                            style={{ width: `${leetcodeStats.totalEasy > 0 ? (leetcodeStats.easySolved / leetcodeStats.totalEasy) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Medium */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-yellow-500 font-bold uppercase text-[9px]">Medium</span>
                          <span className="text-zinc-400">{leetcodeStats.mediumSolved || 0} <span className="text-zinc-600">/ {leetcodeStats.totalMedium || 1620}</span></span>
                        </div>
                        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                          <div 
                            className="h-full bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                            style={{ width: `${leetcodeStats.totalMedium > 0 ? (leetcodeStats.mediumSolved / leetcodeStats.totalMedium) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Hard */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-red-500 font-bold uppercase text-[9px]">Hard</span>
                          <span className="text-zinc-400">{leetcodeStats.hardSolved || 0} <span className="text-zinc-600">/ {leetcodeStats.totalHard || 860}</span></span>
                        </div>
                        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                          <div 
                            className="h-full bg-red-650 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                            style={{ width: `${leetcodeStats.totalHard > 0 ? (leetcodeStats.hardSolved / leetcodeStats.totalHard) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: WEEKLY GOALS & CONTRIBUTION GRID */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Weekly Goal Card */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div>
                      <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-brass-light" />
                        Week {selectedWeek} Grind Targets
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-sans">Track your solves from the DSA Logbook against your goals.</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-brass-glow/10 border border-brass-light/20 text-brass-light rounded font-semibold">
                      DSA Log Linked
                    </span>
                  </div>

                  {/* Targets Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Easy */}
                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-green-400 uppercase font-mono">Easy Goal</span>
                        <div className="flex items-center gap-1 select-none">
                          <button 
                            onClick={() => handleUpdateGoal('easy', 'decrement')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white font-mono">{leetcodeGoal.easy}</span>
                          <button 
                            onClick={() => handleUpdateGoal('easy', 'increment')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold font-mono text-zinc-200">
                          {getWeeklyDsaCount('Easy')}
                          <span className="text-xs text-zinc-500 font-normal"> / {leetcodeGoal.easy}</span>
                        </span>
                        <span className="text-[10px] text-green-400 font-mono font-bold">
                          {leetcodeGoal.easy > 0 ? Math.min(100, Math.round((getWeeklyDsaCount('Easy') / leetcodeGoal.easy) * 100)) : 100}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all animate-pulse-short"
                          style={{ width: `${leetcodeGoal.easy > 0 ? Math.min(100, (getWeeklyDsaCount('Easy') / leetcodeGoal.easy) * 100) : 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-yellow-500 uppercase font-mono">Medium Goal</span>
                        <div className="flex items-center gap-1 select-none">
                          <button 
                            onClick={() => handleUpdateGoal('medium', 'decrement')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white font-mono">{leetcodeGoal.medium}</span>
                          <button 
                            onClick={() => handleUpdateGoal('medium', 'increment')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold font-mono text-zinc-200">
                          {getWeeklyDsaCount('Medium')}
                          <span className="text-xs text-zinc-500 font-normal"> / {leetcodeGoal.medium}</span>
                        </span>
                        <span className="text-[10px] text-yellow-500 font-mono font-bold">
                          {leetcodeGoal.medium > 0 ? Math.min(100, Math.round((getWeeklyDsaCount('Medium') / leetcodeGoal.medium) * 100)) : 100}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div 
                          className="h-full bg-yellow-500 rounded-full transition-all animate-pulse-short"
                          style={{ width: `${leetcodeGoal.medium > 0 ? Math.min(100, (getWeeklyDsaCount('Medium') / leetcodeGoal.medium) * 100) : 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-red-500 uppercase font-mono">Hard Goal</span>
                        <div className="flex items-center gap-1 select-none">
                          <button 
                            onClick={() => handleUpdateGoal('hard', 'decrement')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white font-mono">{leetcodeGoal.hard}</span>
                          <button 
                            onClick={() => handleUpdateGoal('hard', 'increment')}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded flex items-center justify-center hover:bg-zinc-700 text-xs transition-all cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold font-mono text-zinc-200">
                          {getWeeklyDsaCount('Hard')}
                          <span className="text-xs text-zinc-500 font-normal"> / {leetcodeGoal.hard}</span>
                        </span>
                        <span className="text-[10px] text-red-500 font-mono font-bold">
                          {leetcodeGoal.hard > 0 ? Math.min(100, Math.round((getWeeklyDsaCount('Hard') / leetcodeGoal.hard) * 100)) : 100}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div 
                          className="h-full bg-red-650 rounded-full transition-all animate-pulse-short"
                          style={{ width: `${leetcodeGoal.hard > 0 ? Math.min(100, (getWeeklyDsaCount('Hard') / leetcodeGoal.hard) * 100) : 100}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Grid Heatmap */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brass-light" />
                      The 180-Day Grind Activity
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Submissions calendar
                    </span>
                  </div>

                  <div className="py-2 overflow-x-auto no-scrollbar">
                    <div className="min-w-[400px] flex gap-2">
                      <div className="flex flex-col justify-between text-[8px] text-zinc-600 font-mono pr-1 select-none h-[112px]">
                        <span>Sun</span>
                        <span>Tue</span>
                        <span>Thu</span>
                        <span>Sat</span>
                      </div>
                      
                      <div className="grid grid-flow-col grid-rows-7 gap-1 flex-1">
                        {getContributionGridData().map((day, idx) => {
                          let color = "bg-zinc-900/60 border border-zinc-850/40";
                          if (day.count > 0 && day.count <= 2) {
                            color = "bg-brass-glow/20 border border-brass-light/30 text-brass-light";
                          } else if (day.count > 2 && day.count <= 4) {
                            color = "bg-brass-glow/55 border border-brass-light/55 text-orange-200";
                          } else if (day.count > 4) {
                            color = "bg-brass-glow text-white shadow-[0_0_10px_rgba(217,119,6,0.5)]";
                          }
                          
                          return (
                            <div 
                              key={idx} 
                              className={`w-[12px] h-[12px] rounded-sm transition-all hover:scale-125 cursor-pointer relative group shrink-0 ${color}`}
                            >
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10 bg-zinc-950 border border-zinc-800 text-[9px] text-zinc-300 rounded px-2 py-0.5 whitespace-nowrap shadow-lg select-none">
                                {day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • {day.count} solved
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-2 border-t border-zinc-900/60 select-none">
                    <span>Last 6 Months Solves</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-sm bg-zinc-900 border border-zinc-800/40" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-brass-glow/20 border border-brass-light/30" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-brass-glow/55 border border-brass-light/55" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-brass-glow border shadow-[0_0_8px_rgba(217,119,6,0.3)]" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
