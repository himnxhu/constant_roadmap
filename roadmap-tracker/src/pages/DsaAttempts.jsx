import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function DsaAttempts({
  dsaForm,
  dsaLogs,
  handleAddDsaLog,
  handleDsaFormChange,
  handleDeleteDsaLog
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* LOG ENTRY FORM */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg flex flex-col justify-between backdrop-blur-md">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold font-display text-white tracking-wider uppercase">Log DSA Problem</h3>
            <p className="text-[10px] text-zinc-500 mt-1">LOG EACH PROBLEM TO DETECT COGNITIVE WEAKNESSES</p>
          </div>

          <form onSubmit={handleAddDsaLog} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-mono uppercase block">Problem Title</label>
              <input 
                type="text" 
                name="problemName"
                placeholder="e.g. Reverse Linked List II"
                value={dsaForm.problemName}
                onChange={handleDsaFormChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brass-light rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Pattern / Topic</label>
                <select 
                  name="pattern"
                  value={dsaForm.pattern}
                  onChange={handleDsaFormChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-zinc-200 focus:outline-none focus:border-brass-light font-mono font-semibold"
                >
                  <option value="Arrays & Strings">Arrays & Strings</option>
                  <option value="Two Pointers">Two Pointers</option>
                  <option value="Sliding Window">Sliding Window</option>
                  <option value="HashMaps & Hashing">HashMaps & Hashing</option>
                  <option value="Recursion & Backtracking">Recursion & Backtracking</option>
                  <option value="Linked Lists">Linked Lists</option>
                  <option value="Stacks & Queues">Stacks & Queues</option>
                  <option value="Trees & BST">Trees & BST</option>
                  <option value="Heaps & Priority Queues">Heaps & Priority Queues</option>
                  <option value="Graphs (BFS/DFS)">Graphs (BFS/DFS)</option>
                  <option value="Dynamic Programming">Dynamic Programming</option>
                  <option value="Tries">Tries</option>
                  <option value="Bit Manipulation">Bit Manipulation</option>
                  <option value="Greedy Algorithms">Greedy Algorithms</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Difficulty</label>
                <select 
                  name="difficulty"
                  value={dsaForm.difficulty}
                  onChange={handleDsaFormChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-zinc-200 focus:outline-none focus:border-brass-light font-mono font-semibold"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Solved Unaided?</label>
                <select 
                  name="solvedUnaided"
                  value={dsaForm.solvedUnaided}
                  onChange={handleDsaFormChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-brass-light focus:outline-none focus:border-brass-light font-mono font-semibold"
                >
                  <option value="Y">Yes (Y)</option>
                  <option value="N">No (N)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Time taken (min)</label>
                <input 
                  type="number" 
                  name="timeTaken"
                  placeholder="25"
                  value={dsaForm.timeTaken}
                  onChange={handleDsaFormChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light font-mono font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-mono uppercase block">Notes (Struggle points)</label>
              <textarea 
                name="notes"
                placeholder="e.g. got tripped up by base recursion conditions..."
                value={dsaForm.notes}
                rows="3"
                onChange={handleDsaFormChange}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brass-light rounded-lg px-3 py-2 text-white focus:outline-none font-sans resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-brass-glow text-white font-bold hover:bg-brass-glow/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Log Attempt
            </button>
          </form>
        </div>
      </div>

      {/* LOG HISTORY LIST TABLE */}
      <div className="lg:col-span-2 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
            <div>
              <h3 className="text-sm font-bold font-display text-white tracking-wider uppercase">Attempt Logbook</h3>
              <p className="text-[10px] text-zinc-500 mt-1">Review attempts to identify logical bottlenecks</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 font-semibold">
              Total: {dsaLogs.length} attempts
            </span>
          </div>

          {dsaLogs.length > 0 ? (
            <div className="overflow-y-auto max-h-[420px] custom-scroll space-y-3 pr-2">
              {dsaLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-805 hover:border-zinc-700/80 transition-all flex justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] px-2 py-0.5 font-bold font-mono rounded ${
                        log.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        log.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {log.difficulty}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-none">{log.problemName}</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-500 font-mono">
                      <span>Topic: <strong className="text-zinc-300 font-sans">{log.pattern}</strong></span>
                      <span>Time: <strong className="text-zinc-300 font-sans">{log.timeTaken || '-'} min</strong></span>
                      <span>Date: <strong className="text-zinc-400 font-sans">{log.date}</strong></span>
                    </div>

                    {log.notes && (
                      <p className="text-[10.5px] text-zinc-400 bg-zinc-950/60 border border-zinc-800/40 rounded px-2.5 py-1.5 leading-relaxed font-sans mt-2">
                        {log.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col justify-between items-end flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      log.solvedUnaided === 'Y' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {log.solvedUnaided === 'Y' ? 'Unaided (Y)' : 'Needed Help (N)'}
                    </span>
                    
                    <button 
                      onClick={() => handleDeleteDsaLog(log.id)}
                      className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all cursor-pointer mt-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-zinc-500 font-mono">
              No problems logged yet. Add your first attempt using the form on the left.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
