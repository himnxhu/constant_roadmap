import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function DailyQuest({
  selectedWeek,
  setSelectedWeek,
  getWeekProgress,
  completedTasks,
  toggleTask,
  weeklyLogs,
  handleWeeklyLogChange,
  handleWeeklyLogBlur,
  weeks
}) {
  const totalWeeks = weeks.length;
  
  // Find current week details
  const weekData = weeks.find(w => w.weekNumber === selectedWeek);
  
  if (!weekData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* WEEK SELECTOR BANNER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">Active Week:</span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
              disabled={selectedWeek === 1}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-bold text-zinc-300 disabled:opacity-50 cursor-pointer font-mono"
            >
              Prev
            </button>
            <span className="text-sm font-bold font-mono text-brass-light px-3 py-0.5 rounded bg-brass-glow/10 border border-brass-light/20">
              Week {selectedWeek} / {totalWeeks}
            </span>
            <button 
              onClick={() => setSelectedWeek(w => Math.min(totalWeeks, w + 1))}
              disabled={selectedWeek === totalWeeks}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-bold text-zinc-300 disabled:opacity-50 cursor-pointer font-mono"
            >
              Next
            </button>
          </div>
        </div>

        {/* Progress for selected week */}
        <div className="flex items-center gap-3 justify-center sm:justify-end w-full sm:w-auto">
          <span className="text-xs font-mono text-zinc-400">Week Progress:</span>
          <div className="w-32 h-2.5 bg-zinc-900 border border-zinc-800/60 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-brass-glow rounded-full transition-all duration-500" 
              style={{ width: `${getWeekProgress(selectedWeek)}%` }}
            />
          </div>
          <span className="text-xs font-mono text-brass-light font-bold">{getWeekProgress(selectedWeek)}%</span>
        </div>
      </div>

      {/* WEEK DETAILS BANNER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-3 bg-zinc-900/60 border-l border-b border-zinc-800 text-[10px] text-brass-light font-mono rounded-bl-lg tracking-wider uppercase hidden sm:block font-bold">
          {weekData.phase}
        </div>
        <div className="space-y-4 max-w-4xl">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block">Weekly Core Theme</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-brass-light font-mono tracking-wider uppercase border border-zinc-800 sm:hidden">
                {weekData.phase}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white leading-snug">{weekData.theme}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-800/60">
            <div className="space-y-1">
              <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase">Primary Focus Area</span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{weekData.dsaFocus}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase">Secondary Focus Area</span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{weekData.csFocus}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-brass-light font-mono tracking-wide uppercase">Weekly Exit Milestone</span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans font-medium">{weekData.milestone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* DAILY CHECKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekData.days.map((day, idx) => (
          <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-md flex flex-col justify-between backdrop-blur-md space-y-4 hover:border-zinc-700/80 transition-all">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
              <span className="text-sm font-bold font-mono text-brass-light bg-brass-glow/5 border border-brass-light/10 px-2 py-0.5 rounded">
                {day.day}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                Commitment: ~4-6 hrs / day
              </span>
            </div>

            {/* Daily tracks checkbox list */}
            <div className="space-y-3.5 flex-1">
              
              {/* DSA Task */}
              <div className="flex items-start gap-3">
                <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    checked={!!completedTasks[`w${selectedWeek}-${day.day}-dsa`]} 
                    onChange={() => toggleTask(selectedWeek, day.day, 'dsa')} 
                  />
                  <span className="checkmark" />
                </label>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold tracking-wider text-purple-400 font-mono uppercase block">Syllabus Track A</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">{day.dsa}</p>
                </div>
              </div>

              {/* CS Task */}
              <div className="flex items-start gap-3">
                <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    checked={!!completedTasks[`w${selectedWeek}-${day.day}-cs`]} 
                    onChange={() => toggleTask(selectedWeek, day.day, 'cs')} 
                  />
                  <span className="checkmark" />
                </label>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold tracking-wider text-cyan-400 font-mono uppercase block">Syllabus Track B</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">{day.cs}</p>
                </div>
              </div>

              {/* Project / Work Task */}
              <div className="flex items-start gap-3">
                <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    checked={!!completedTasks[`w${selectedWeek}-${day.day}-project`]} 
                    onChange={() => toggleTask(selectedWeek, day.day, 'project')} 
                  />
                  <span className="checkmark" />
                </label>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold tracking-wider text-brass-light font-mono uppercase block">Practical / Project Application</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">{day.project}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* SUNDAY LOG REVIEW */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden backdrop-blur-md">
        <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brass-light animate-pulse-short" /> WEEKLY LOG & SUNDAY REVIEW
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>Study routine reviews</strong> help consolidate progress. Fill in your weekly summary on the right to sync your statistics and track growth.
            </p>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-300">
              <strong className="text-white block mb-1">Catch-Up Strategy Checklist:</strong>
              1. Redo any problem marked "solved with help" this week.<br />
              2. Make sure you can explain the core CS / Specialization concept in under 2 minutes.<br />
              3. Check the next week's theme to mentally prepare for upcoming coding structures.
            </div>
          </div>

          {/* SUNDAY MANUAL INPUT FIELDS */}
          <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 font-display tracking-wide uppercase pb-2 border-b border-zinc-800">
              Weekly Review Log (Week {selectedWeek})
            </h4>

            {weeklyLogs.filter(wl => wl.week === selectedWeek).map((log, idx) => (
              <div key={idx} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">DSA Problems</label>
                    <input 
                      type="number" 
                      placeholder="12"
                      value={log.dsaProblems}
                      onChange={(e) => handleWeeklyLogChange(selectedWeek, 'dsaProblems', e.target.value)}
                      onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Unaided %</label>
                    <input 
                      type="number" 
                      placeholder="85"
                      value={log.unaidedPct}
                      onChange={(e) => handleWeeklyLogChange(selectedWeek, 'unaidedPct', e.target.value)}
                      onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 font-mono uppercase block">CS Topics Covered</label>
                  <input 
                    type="text" 
                    placeholder="OS Paging, Normalization"
                    value={log.csTopics}
                    onChange={(e) => handleWeeklyLogChange(selectedWeek, 'csTopics', e.target.value)}
                    onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Project Milestone?</label>
                    <select 
                      value={log.projectMilestone}
                      onChange={(e) => handleWeeklyLogChange(selectedWeek, 'projectMilestone', e.target.value)}
                      onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono font-semibold"
                    >
                      <option value="Y">Yes (Y)</option>
                      <option value="N">No (N)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Mock Conducted?</label>
                    <select 
                      value={log.mockDone}
                      onChange={(e) => handleWeeklyLogChange(selectedWeek, 'mockDone', e.target.value)}
                      onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono font-semibold"
                    >
                      <option value="Y">Yes (Y)</option>
                      <option value="N">No (N)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 font-mono uppercase block">Confidence (1-5)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="5"
                    placeholder="4"
                    value={log.confidence}
                    onChange={(e) => handleWeeklyLogChange(selectedWeek, 'confidence', e.target.value)}
                    onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 font-mono uppercase block">Study Notes</label>
                  <textarea 
                    placeholder="Weak structures, focus goals for next week..."
                    value={log.notes}
                    rows="2"
                    onChange={(e) => handleWeeklyLogChange(selectedWeek, 'notes', e.target.value)}
                    onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-sans resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
