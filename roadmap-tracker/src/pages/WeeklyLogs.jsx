import React from 'react';
import { Target } from 'lucide-react';

export default function WeeklyLogs({
  weeks,
  weeklyLogs,
  getWeekProgress,
  setSelectedWeek,
  setActiveTab,
  profileSettings
}) {
  const userName = profileSettings?.name || "Guest";
  const totalWeeks = weeks.length;
  
  // Custom segment boundary counts based on weeks
  const w1 = Math.round(totalWeeks * 0.5);
  const w2 = Math.round(totalWeeks * 0.8);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold font-display text-white">Weekly Roadmap Blueprint</h2>
          <p className="text-xs text-zinc-400 mt-1">Review the theme, focus tracks, and target milestone for all {totalWeeks} weeks at a glance.</p>
        </div>
        <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs space-y-1 font-mono">
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500">Foundation (Weeks 1-{w1}):</span>
            <span className="text-white font-semibold">OS, DBMS, Core DSA</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500">Specialization (Weeks {w1 + 1}-{w2}):</span>
            <span className="text-brass-light font-semibold">Specialty Focus Tracks</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500">Interview Reps (Weeks {w2 + 1}-{totalWeeks}):</span>
            <span className="text-cyan-400 font-semibold">Mocks & System Design</span>
          </div>
        </div>
      </div>

      {/* WEEK MATRIX TABLE / CARD CONTAINER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl backdrop-blur-md">
        
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/60 border-b border-zinc-850 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                <th className="py-4 px-5">Week</th>
                <th className="py-4 px-5">Theme / Milestone</th>
                <th className="py-4 px-5">Syllabus Track A Focus</th>
                <th className="py-4 px-5">Syllabus Track B Focus</th>
                <th className="py-4 px-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850 text-xs">
              {weeks.map((w) => (
                <tr 
                  key={w.weekNumber}
                  onClick={() => {
                    setSelectedWeek(w.weekNumber);
                    setActiveTab('daily');
                  }}
                  className="hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5 align-top">
                    <span className="font-bold font-mono text-brass-light group-hover:underline">W{w.weekNumber}</span>
                    <span className="block text-[9px] text-zinc-500 uppercase mt-0.5 tracking-wider font-mono">{w.phase.split(' ')[0]}</span>
                  </td>
                  <td className="py-4 px-5 align-top max-w-sm space-y-1.5">
                    <div className="font-medium text-white group-hover:text-brass-light transition-colors">{w.theme}</div>
                    <div className="text-[10.5px] text-zinc-400 italic">Target: {w.milestone}</div>
                  </td>
                  <td className="py-4 px-5 align-top text-zinc-300">{w.dsaFocus}</td>
                  <td className="py-4 px-5 align-top text-zinc-300">{w.csFocus}</td>
                  <td className="py-4 px-5 text-center align-top">
                    <div className="flex flex-col items-center justify-center gap-1 mt-1">
                      <span className="font-mono text-brass-light font-semibold">{getWeekProgress(w.weekNumber)}%</span>
                      <div className="w-12 h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brass-glow" style={{ width: `${getWeekProgress(w.weekNumber)}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-zinc-900">
          {weeks.map((w) => (
            <div 
              key={w.weekNumber}
              onClick={() => {
                setSelectedWeek(w.weekNumber);
                setActiveTab('daily');
              }}
              className="p-4 space-y-3 active:bg-zinc-900/40 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-brass-light text-xs">Week {w.weekNumber}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 font-mono tracking-wider uppercase border border-zinc-805">
                    {w.phase}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-brass-light text-xs font-semibold">{getWeekProgress(w.weekNumber)}%</span>
                  <div className="w-12 h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brass-glow" style={{ width: `${getWeekProgress(w.weekNumber)}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-white text-xs leading-snug">{w.theme}</h4>
                <p className="text-[10px] text-zinc-505 italic">Target: {w.milestone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-900 text-[10.5px]">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-purple-400 font-mono uppercase block">Track A Focus</span>
                  <p className="text-zinc-300 line-clamp-2 leading-relaxed">{w.dsaFocus}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-cyan-400 font-mono uppercase block">Track B Focus</span>
                  <p className="text-zinc-300 line-clamp-2 leading-relaxed">{w.csFocus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUNDAY HISTORICAL REVIEW SUMMARY */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
          <Target className="w-4 h-4 text-brass-light" /> {userName}'s Sunday Review History
        </h3>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 border-b border-zinc-800 text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                <th className="py-3 px-4">Week</th>
                <th className="py-3 px-4 text-center">DSA Solved</th>
                <th className="py-3 px-4 text-center">Unaided %</th>
                <th className="py-3 px-4">CS Topics Completed</th>
                <th className="py-3 px-4 text-center">Project hit?</th>
                <th className="py-3 px-4 text-center">Mock hit?</th>
                <th className="py-3 px-4 text-center">Confidence</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-xs font-sans">
              {weeklyLogs.slice(0, totalWeeks).map((log) => (
                <tr key={log.week} className="hover:bg-zinc-900/20">
                  <td className="py-3 px-4 font-bold font-mono text-zinc-400">Week {log.week}</td>
                  <td className="py-3 px-4 text-center font-mono text-white">{log.dsaProblems || '-'}</td>
                  <td className="py-3 px-4 text-center font-mono text-zinc-300">{log.unaidedPct ? `${log.unaidedPct}%` : '-'}</td>
                  <td className="py-3 px-4 text-zinc-300 max-w-xs truncate" title={log.csTopics}>{log.csTopics || '-'}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      log.projectMilestone === 'Y' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {log.projectMilestone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      log.mockDone === 'Y' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {log.mockDone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {log.confidence ? (
                      <span className="font-mono font-bold text-brass-light">
                        {Array.from({ length: log.confidence }).map(() => '★').join('')}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 max-w-sm truncate" title={log.notes}>{log.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden space-y-3">
          {weeklyLogs.slice(0, totalWeeks).map((log) => {
            const hasData = log.dsaProblems || log.unaidedPct || log.csTopics || log.notes || log.projectMilestone === 'Y' || log.mockDone === 'Y';
            if (!hasData) return null;
            return (
              <div key={log.week} className="p-4 bg-zinc-900/30 border border-zinc-805 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                  <span className="font-bold font-mono text-zinc-400 text-xs">Week {log.week}</span>
                  <div className="flex gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono ${
                      log.projectMilestone === 'Y' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-zinc-950 text-zinc-600'
                    }`}>
                      PROJ: {log.projectMilestone}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono ${
                      log.mockDone === 'Y' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-zinc-950 text-zinc-600'
                    }`}>
                      MOCK: {log.mockDone}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-zinc-400">
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase tracking-wider">DSA Solved</span>
                    <span className="text-white font-bold">{log.dsaProblems || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase tracking-wider">Unaided Rate</span>
                    <span className="text-brass-light font-bold">{log.unaidedPct ? `${log.unaidedPct}%` : '-'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase tracking-wider">Confidence</span>
                    <span className="text-amber-400 font-bold">
                      {log.confidence ? Array.from({ length: log.confidence }).map(() => '★').join('') : '-'}
                    </span>
                  </div>
                </div>
                
                {log.csTopics && (
                  <div className="text-[11px] text-zinc-300">
                    <span className="text-[8px] text-zinc-500 font-mono block uppercase tracking-wider">Topics</span>
                    {log.csTopics}
                  </div>
                )}
                
                {log.notes && (
                  <div className="text-[11px] text-zinc-400 italic bg-zinc-950/40 p-2.5 rounded border border-zinc-900 leading-relaxed">
                    {log.notes}
                  </div>
                )}
              </div>
            );
          })}
          {weeklyLogs.slice(0, totalWeeks).filter(log => log.dsaProblems || log.unaidedPct || log.csTopics || log.notes || log.projectMilestone === 'Y' || log.mockDone === 'Y').length === 0 && (
            <div className="py-6 text-center text-xs text-zinc-500 font-mono">
              No review entries logged yet. Complete Sunday logs in Daily Tracker page to display summaries here.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
