import React, { useState, useEffect } from 'react';
import { 
  NEETCODE_CATEGORIES 
} from '../data/neetcodeData';
import { 
  ExternalLink, 
  Search, 
  Filter, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  Target, 
  Compass, 
  Award,
  ChevronRight,
  GitMerge
} from 'lucide-react';

export default function NeetcodeRoadmap() {
  // State for tracking solved problems
  // Format: { [problemId]: boolean }
  const [solvedProblems, setSolvedProblems] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_neetcode_solved');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState('arrays-hashing');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('graph'); // 'graph' | 'list'
  const [randomPromptedProblem, setRandomPromptedProblem] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('himanshu_roadmap_neetcode_solved', JSON.stringify(solvedProblems));
  }, [solvedProblems]);

  const toggleProblem = (id) => {
    setSolvedProblems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all NeetCode 150 progress? This cannot be undone.")) {
      setSolvedProblems({});
      setRandomPromptedProblem(null);
    }
  };

  // Helper selectors
  const totalProblemsCount = 150;
  const solvedProblemsCount = Object.values(solvedProblems).filter(Boolean).length;
  const overallProgressPercent = Math.round((solvedProblemsCount / totalProblemsCount) * 100);

  // Difficulty breakdowns
  let easyTotal = 0, easySolved = 0;
  let mediumTotal = 0, mediumSolved = 0;
  let hardTotal = 0, hardSolved = 0;

  NEETCODE_CATEGORIES.forEach(cat => {
    cat.problems.forEach(p => {
      if (p.difficulty === 'Easy') {
        easyTotal++;
        if (solvedProblems[p.id]) easySolved++;
      } else if (p.difficulty === 'Medium') {
        mediumTotal++;
        if (solvedProblems[p.id]) mediumSolved++;
      } else if (p.difficulty === 'Hard') {
        hardTotal++;
        if (solvedProblems[p.id]) hardSolved++;
      }
    });
  });

  // Calculate status for each category
  const getCategoryStats = (category) => {
    const total = category.problems.length;
    const completed = category.problems.filter(p => solvedProblems[p.id]).length;
    const percent = Math.round((completed / total) * 100);
    const isCompleted = completed === total;
    const isStarted = completed > 0;

    return { total, completed, percent, isCompleted, isStarted };
  };

  // Select active category object
  const activeCategory = NEETCODE_CATEGORIES.find(c => c.id === selectedCategoryId) || NEETCODE_CATEGORIES[0];
  const activeStats = getCategoryStats(activeCategory);

  // Filters logic
  const filteredProblems = activeCategory.problems.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    
    const isSolved = !!solvedProblems[p.id];
    let matchesStatus = true;
    if (statusFilter === 'Solved') matchesStatus = isSolved;
    if (statusFilter === 'Unsolved') matchesStatus = !isSolved;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  // Pick a random unsolved problem from the entire 150 set
  const pickRandomUnsolved = () => {
    const allUnsolved = [];
    NEETCODE_CATEGORIES.forEach(cat => {
      cat.problems.forEach(p => {
        if (!solvedProblems[p.id]) {
          allUnsolved.push({ ...p, categoryName: cat.name, categoryId: cat.id });
        }
      });
    });

    if (allUnsolved.length === 0) {
      setRandomPromptedProblem({ name: "All solved! You're ready.", isFinished: true });
      return;
    }

    const randomIndex = Math.floor(Math.random() * allUnsolved.length);
    setRandomPromptedProblem(allUnsolved[randomIndex]);
  };

  return (
    <div className="space-y-6 animate-fade-in text-gray-200">
      
      {/* HEADER HERO */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="glass-reflection absolute inset-0 rounded-xl" />
        <div className="space-y-1.5 z-10">
          <h2 className="text-xl font-bold font-display text-white tracking-wide flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-brass-light rotate-90" /> NeetCode 150 Roadmap Grid
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl">
            A visual DAG representation of core algorithm categories. Complete preceding nodes to build strong foundation links. Check off questions to sync metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 z-10">
          <button 
            onClick={pickRandomUnsolved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-850 hover:border-zinc-750 bg-zinc-900 hover:bg-zinc-850 text-xs font-bold text-brass-light uppercase transition-all cursor-pointer font-mono"
            title="Pick a random unsolved problem"
          >
            <Compass className="w-3.5 h-3.5" /> Random Quest
          </button>
          <button 
            onClick={resetAllProgress}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-850 hover:border-zinc-750 bg-zinc-900 hover:bg-zinc-850 text-xs font-bold text-red-400 hover:text-red-300 uppercase transition-all cursor-pointer font-mono"
            title="Clear all completed markings"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Map
          </button>
        </div>
      </div>

      {/* METRICS & OVERALL PROGRESS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* PROGRESS METER */}
        <div className="md:col-span-2 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div className="glass-reflection absolute inset-0 rounded-xl" />
          <div className="z-10 flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-semibold">Boiler Pressure</span>
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">Overall Completion</h3>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-display text-brass-light">{solvedProblemsCount}</span>
              <span className="text-xs text-zinc-500 font-mono"> / 150</span>
            </div>
          </div>

          <div className="z-10 space-y-2">
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-gradient-to-r from-brass-dark via-brass-glow to-brass-light transition-all duration-700 shadow-[0_0_10px_rgba(217,119,6,0.3)]" 
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span>0% GROUND</span>
              <span>{overallProgressPercent}% SATURATION</span>
              <span>100% ASCENT</span>
            </div>
          </div>
        </div>

        {/* DIFFICULTIES BREAKDOWN CARD */}
        <div className="md:col-span-2 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex items-center justify-between backdrop-blur-md relative overflow-hidden">
          <div className="glass-reflection absolute inset-0 rounded-xl" />
          <div className="z-10 w-full grid grid-cols-3 gap-2">
            
            {/* EASY */}
            <div className="text-center p-2.5 bg-zinc-900/60 border border-zinc-850 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider font-mono">Easy</span>
              <div className="my-1">
                <span className="text-base font-bold text-white font-display">{easySolved}</span>
                <span className="text-[11px] text-zinc-500">/{easyTotal}</span>
              </div>
              <div className="w-full bg-zinc-950 h-1 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }} />
              </div>
            </div>

            {/* MEDIUM */}
            <div className="text-center p-2.5 bg-zinc-900/60 border border-zinc-850 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider font-mono">Medium</span>
              <div className="my-1">
                <span className="text-base font-bold text-white font-display">{mediumSolved}</span>
                <span className="text-[11px] text-zinc-500">/{mediumTotal}</span>
              </div>
              <div className="w-full bg-zinc-950 h-1 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }} />
              </div>
            </div>

            {/* HARD */}
            <div className="text-center p-2.5 bg-zinc-900/60 border border-zinc-850 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider font-mono">Hard</span>
              <div className="my-1">
                <span className="text-base font-bold text-white font-display">{hardSolved}</span>
                <span className="text-[11px] text-zinc-500">/{hardTotal}</span>
              </div>
              <div className="w-full bg-zinc-950 h-1 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }} />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RANDOM PROBLEM ALERTS */}
      {randomPromptedProblem && (
        <div className="bg-brass-glow/10 border border-brass-light/30 rounded-xl p-4 flex justify-between items-center gap-4 animate-pulse-glow z-10 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-zinc-950/80 border border-brass-light/40 text-brass-light">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[9px] font-mono text-brass-light/80 uppercase tracking-widest block">Active Random Target</span>
              {randomPromptedProblem.isFinished ? (
                <strong className="text-xs text-white block">{randomPromptedProblem.name}</strong>
              ) : (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                  <strong className="text-xs text-white font-display">{randomPromptedProblem.name}</strong>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    randomPromptedProblem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    randomPromptedProblem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {randomPromptedProblem.difficulty}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    in <button onClick={() => setSelectedCategoryId(randomPromptedProblem.categoryId)} className="text-brass-light hover:underline bg-transparent border-none p-0 cursor-pointer">{randomPromptedProblem.categoryName}</button>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {!randomPromptedProblem.isFinished && (
              <>
                <a 
                  href={`https://leetcode.com/problems/${randomPromptedProblem.id}/`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-wider transition-all hover:bg-zinc-800 flex items-center gap-1"
                >
                  Solve <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <button 
                  onClick={() => {
                    toggleProblem(randomPromptedProblem.id);
                    setRandomPromptedProblem(null);
                  }}
                  className="px-2.5 py-1 rounded bg-brass-glow text-[10px] font-bold text-white uppercase tracking-wider transition-all hover:bg-brass-light cursor-pointer"
                >
                  Completed
                </button>
              </>
            )}
            <button 
              onClick={() => setRandomPromptedProblem(null)}
              className="text-zinc-500 hover:text-white px-2 py-1 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODES SELECTOR FOR RESPONSIVE */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">Roadmap Flow matrix</h3>
        <div className="flex bg-zinc-950 p-0.5 rounded border border-zinc-850">
          <button 
            onClick={() => setViewMode('graph')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
              viewMode === 'graph' ? 'bg-zinc-900 text-brass-light border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Graph View
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
              viewMode === 'list' ? 'bg-zinc-900 text-brass-light border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Grid List
          </button>
        </div>
      </div>

      {/* MAIN ROADMAP SCREEN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ROADMAP GRAPH/LIST COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          
          {viewMode === 'graph' ? (
            /* GRAPH DISPLAY CONTAINER */
            <div className="hidden md:block bg-zinc-950/70 border border-zinc-900 rounded-xl relative overflow-x-auto min-h-[690px] shadow-inner select-none p-4">
              
              {/* RELATIVE HEIGHT CONTAINER FOR NODES */}
              <div className="relative w-full h-[650px] min-w-[550px] mx-auto">
                
                {/* SVG CONNECTIONS OVERLAY BACKGROUND */}
                <svg 
                  className="absolute inset-0 w-full h-[650px] pointer-events-none" 
                  viewBox="0 0 100 650"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3f3f46" />
                    </marker>
                    <marker id="arrow-brass" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
                    </marker>
                    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* DRAW GRAPH BEZIER CURVES */}
                  {NEETCODE_CATEGORIES.map(category => {
                    return category.dependencies.map(depId => {
                      const parentNode = NEETCODE_CATEGORIES.find(c => c.id === depId);
                      if (!parentNode) return null;

                      // Check parent / child progress for line color coding
                      const parentStats = getCategoryStats(parentNode);
                      const childStats = getCategoryStats(category);

                      let strokeColorClass = "stroke-zinc-800/80";
                      let markerId = "arrow";
                      if (parentStats.isCompleted && childStats.isCompleted) {
                        strokeColorClass = "stroke-emerald-500/50";
                        markerId = "arrow-emerald";
                      } else if (parentStats.isStarted || parentStats.isCompleted) {
                        strokeColorClass = "stroke-brass-glow/40";
                        markerId = "arrow-brass";
                      }

                      // Curve endpoints (Node Center)
                      const x1 = parentNode.x;
                      const y1 = parentNode.y;
                      const x2 = category.x;
                      const y2 = category.y;
                      
                      // Calculate smooth S-Curve control points
                      const controlY = (y1 + y2) / 2;

                      return (
                        <path 
                          key={`${depId}-${category.id}`}
                          d={`M ${x1} ${y1} C ${x1} ${controlY}, ${x2} ${controlY}, ${x2} ${y2}`}
                          fill="none"
                          className={`${strokeColorClass} transition-all duration-500`}
                          strokeWidth="2.5"
                          markerEnd={`url(#${markerId})`}
                        />
                      );
                    });
                  })}
                </svg>

                {/* GRAPH NODES */}
                {NEETCODE_CATEGORIES.map(cat => {
                  const stats = getCategoryStats(cat);
                  const isSelected = selectedCategoryId === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-between p-2.5 rounded-lg border text-center transition-all duration-300 w-[140px] h-[68px] cursor-pointer select-none group ${
                        isSelected
                          ? "bg-zinc-900 border-brass-light text-white shadow-[0_0_15px_rgba(217,119,6,0.35)] scale-105"
                          : stats.isCompleted
                          ? "bg-zinc-950/90 border-emerald-500/60 text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          : stats.isStarted
                          ? "bg-zinc-950/80 border-brass-glow/50 text-brass-light hover:border-brass-light hover:shadow-[0_0_10px_rgba(217,119,6,0.15)]"
                          : "bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                      style={{ left: `${cat.x}%`, top: `${cat.y}px` }}
                    >
                      <span className="text-[10px] font-display font-bold leading-tight line-clamp-2 block group-hover:text-white transition-colors">
                        {cat.name}
                      </span>
                      
                      <div className="w-full space-y-1 mt-1">
                        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                          <span>SOLVED</span>
                          <span className={stats.isCompleted ? "text-emerald-400 font-bold" : stats.isStarted ? "text-brass-light" : ""}>
                            {stats.completed}/{stats.total}
                          </span>
                        </div>
                        <div className="w-full bg-zinc-900/80 h-1 rounded-full overflow-hidden border border-zinc-850/50">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              stats.isCompleted ? "bg-emerald-500" : "bg-brass-light"
                            }`} 
                            style={{ width: `${stats.percent}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}

              </div>
              
              {/* Graph key footer */}
              <div className="border-t border-zinc-900 mt-4 pt-3 flex flex-wrap gap-4 justify-center text-[10px] text-zinc-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-zinc-950 border border-zinc-800" />
                  <span>Unstarted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-zinc-950 border border-brass-glow text-brass-light" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-zinc-950 border border-emerald-500 text-emerald-400" />
                  <span>Fully Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-0.5 bg-brass-glow/40" />
                  <span>Dependency Link</span>
                </div>
              </div>

            </div>
          ) : null}

          {/* GRID LIST (FOR MOBILE RESPONSIVE OR TOGGLE OPTION) */}
          {(viewMode === 'list' || !viewMode) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NEETCODE_CATEGORIES.map(cat => {
                const stats = getCategoryStats(cat);
                const isSelected = selectedCategoryId === cat.id;

                return (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-4 bg-zinc-950/80 border rounded-xl cursor-pointer hover:border-zinc-700/80 transition-all flex flex-col justify-between gap-4 backdrop-blur-md relative overflow-hidden group ${
                      isSelected ? "border-brass-light shadow-[0_0_15px_rgba(217,119,6,0.15)] bg-zinc-900/40" : "border-zinc-850"
                    }`}
                  >
                    <div className="glass-reflection absolute inset-0 rounded-xl" />
                    
                    <div className="z-10 flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white font-display group-hover:text-brass-light transition-colors">{cat.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                          Dependencies: {cat.dependencies.length > 0 ? cat.dependencies.join(', ') : 'None'}
                        </p>
                      </div>
                      {stats.isCompleted && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 uppercase font-mono tracking-wider font-semibold">Done</span>
                      )}
                    </div>

                    <div className="z-10 w-full space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                        <span>Completion Rate</span>
                        <span>{stats.completed} / {stats.total} Solved</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-850">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            stats.isCompleted ? "bg-emerald-500" : "bg-brass-light"
                          }`}
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Fallback list for mobile view when in graph mode */
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              {NEETCODE_CATEGORIES.map(cat => {
                const stats = getCategoryStats(cat);
                const isSelected = selectedCategoryId === cat.id;

                return (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-4 bg-zinc-950/80 border rounded-xl cursor-pointer hover:border-zinc-700/80 transition-all flex flex-col justify-between gap-4 backdrop-blur-md relative overflow-hidden group ${
                      isSelected ? "border-brass-light shadow-[0_0_15px_rgba(217,119,6,0.15)] bg-zinc-900/40" : "border-zinc-850"
                    }`}
                  >
                    <div className="glass-reflection absolute inset-0 rounded-xl" />
                    
                    <div className="z-10 flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white font-display group-hover:text-brass-light transition-colors">{cat.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                          Dependencies: {cat.dependencies.length > 0 ? cat.dependencies.join(', ') : 'None'}
                        </p>
                      </div>
                      {stats.isCompleted && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 uppercase font-mono tracking-wider font-semibold">Done</span>
                      )}
                    </div>

                    <div className="z-10 w-full space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                        <span>Completion Rate</span>
                        <span>{stats.completed} / {stats.total} Solved</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-850">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            stats.isCompleted ? "bg-emerald-500" : "bg-brass-light"
                          }`}
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* DETAILS PROBLEMS LIST PANEL */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col min-h-[500px]">
          <div className="glass-reflection absolute inset-0 rounded-xl" />
          
          <div className="z-10 border-b border-zinc-900 pb-3 mb-4 space-y-2">
            <span className="text-[9px] text-brass-light font-bold font-mono tracking-widest uppercase">Target Sector</span>
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-sm font-bold text-white font-display leading-tight">{activeCategory.name}</h3>
              <a 
                href={`https://neetcode.io/roadmap`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 hover:text-brass-light flex items-center gap-1 font-mono transition-colors"
              >
                io <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Category level progress bar */}
            <div className="space-y-1 pt-1.5">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                <span>Sector Clear</span>
                <span>{activeStats.percent}% ({activeStats.completed}/{activeStats.total})</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-850">
                <div 
                  className={`h-full transition-all duration-500 ${
                    activeStats.isCompleted ? "bg-emerald-500" : "bg-brass-light"
                  }`} 
                  style={{ width: `${activeStats.percent}%` }}
                />
              </div>
            </div>
          </div>

          {/* SEARCH & FILTERS FOR PROBLEMS */}
          <div className="z-10 space-y-3 mb-4">
            
            {/* SEARCH */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input 
                type="text"
                placeholder="Filter sector problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-850 rounded text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-700/80 transition-all font-mono"
              />
            </div>

            {/* QUICK FILTER DROPDOWNS */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="space-y-1">
                <span className="text-[8px] text-zinc-500 uppercase tracking-wide">Difficulty</span>
                <select 
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded p-1 text-zinc-300 outline-none cursor-pointer focus:border-zinc-700"
                >
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] text-zinc-500 uppercase tracking-wide">Status</span>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded p-1 text-zinc-300 outline-none cursor-pointer focus:border-zinc-700"
                >
                  <option value="All">All</option>
                  <option value="Solved">Solved</option>
                  <option value="Unsolved">Unsolved</option>
                </select>
              </div>
            </div>

          </div>

          {/* SCROLLABLE PROBLEMS GRID */}
          <div className="z-10 flex-1 overflow-y-auto max-h-[360px] custom-scroll pr-1 space-y-2.5">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 flex flex-col items-center justify-center gap-2">
                <HelpCircle className="w-7 h-7 text-zinc-700 animate-pulse" />
                <span className="text-xs font-mono">No matching sector problems.</span>
              </div>
            ) : (
              filteredProblems.map(p => {
                const isSolved = !!solvedProblems[p.id];
                
                return (
                  <div 
                    key={p.id}
                    className={`flex items-center justify-between p-2.5 bg-zinc-900/50 border rounded-lg transition-all hover:bg-zinc-900 group ${
                      isSolved 
                        ? "border-emerald-900/30 bg-emerald-950/5" 
                        : "border-zinc-850"
                    }`}
                  >
                    
                    {/* Checkbox + Title */}
                    <div className="flex items-center gap-3 min-w-0">
                      
                      {/* Uiverse Checkbox Wrapper */}
                      <label className="uiverse-checkbox-container flex items-center select-none cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isSolved} 
                          onChange={() => toggleProblem(p.id)} 
                        />
                        <span className="checkmark" />
                      </label>

                      <div className="min-w-0">
                        <a 
                          href={`https://leetcode.com/problems/${p.id}/`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-xs font-display font-medium block truncate hover:text-brass-light transition-colors ${
                            isSolved ? "line-through text-zinc-500" : "text-zinc-200"
                          }`}
                          title={`Solve on LeetCode: ${p.name}`}
                        >
                          {p.name}
                        </a>
                        
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[8px] font-bold font-mono ${
                            p.difficulty === 'Easy' ? 'text-emerald-500' :
                            p.difficulty === 'Medium' ? 'text-amber-500' :
                            'text-red-500'
                          }`}>
                            {p.difficulty}
                          </span>
                          
                          {/* NeetCode explanation shortcut */}
                          <a 
                            href={`https://neetcode.io/solutions/${p.id}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[8px] text-zinc-500 hover:text-zinc-300 font-mono tracking-tighter"
                          >
                            • Explanation <ExternalLink className="w-1.5 h-1.5 inline" />
                          </a>
                        </div>

                      </div>
                    </div>

                    {/* Quick solve link on hover */}
                    <a 
                      href={`https://leetcode.com/problems/${p.id}/`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-30 group-hover:opacity-100 p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                      title="Open Leetcode external page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                  </div>
                );
              })
            )}
          </div>

          {/* Quick status check footer */}
          <div className="z-10 border-t border-zinc-900 pt-3 mt-3 text-[10px] text-zinc-500 font-mono flex justify-between items-center">
            <span>Total sector problems:</span>
            <span className="font-bold text-white">{filteredProblems.length} displayed</span>
          </div>

        </div>

      </div>

    </div>
  );
}
