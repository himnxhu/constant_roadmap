import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  CheckSquare, 
  Square, 
  RefreshCw, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Zap, 
  Award, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import checklistData from '../data/tufChecklist.json';

export default function TufChecklist() {
  // Load initial completed state from local storage
  const [completedProblems, setCompletedProblems] = useState(() => {
    const saved = localStorage.getItem('himanshu_tuf_checklist_completed');
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Track open/collapsed categories
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Save completed state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('himanshu_tuf_checklist_completed', JSON.stringify(completedProblems));
  }, [completedProblems]);

  // Compute total problems list
  const allProblems = useMemo(() => {
    const list = [];
    checklistData.forEach(cat => {
      cat.problems.forEach(prob => {
        list.push({
          category: cat.category,
          name: prob,
          id: `${cat.category}-${prob}`.replace(/\s+/g, '-').toLowerCase()
        });
      });
    });
    return list;
  }, []);

  const totalProblemsCount = allProblems.length;

  const completedCount = useMemo(() => {
    return allProblems.filter(p => !!completedProblems[p.id]).length;
  }, [allProblems, completedProblems]);

  const completionPercentage = totalProblemsCount > 0 
    ? Math.round((completedCount / totalProblemsCount) * 100) 
    : 0;

  // Toggle problem completion status
  const toggleProblem = (id) => {
    setCompletedProblems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get problem count for a specific category
  const getCategoryStats = (categoryName) => {
    const cat = checklistData.find(c => c.category === categoryName);
    if (!cat) return { total: 0, completed: 0, percent: 0 };
    
    const total = cat.problems.length;
    const completed = cat.problems.filter(prob => {
      const id = `${categoryName}-${prob}`.replace(/\s+/g, '-').toLowerCase();
      return !!completedProblems[id];
    }).length;
    
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  };

  // Reset checklist with confirmation
  const handleResetChecklist = () => {
    if (window.confirm("Are you sure you want to reset all progress in the TUF+ DSA Checklist? This cannot be undone.")) {
      setCompletedProblems({});
    }
  };

  // Expand / Collapse actions
  const toggleCategoryCollapse = (catName) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const handleExpandAll = () => {
    setCollapsedCategories({});
  };

  const handleCollapseAll = () => {
    const collapsed = {};
    checklistData.forEach(cat => {
      collapsed[cat.category] = true;
    });
    setCollapsedCategories(collapsed);
  };

  // Filtered categories and problems
  const filteredData = useMemo(() => {
    return checklistData.map(cat => {
      // Filter problems by search query
      const matchedProblems = cat.problems.filter(prob => 
        prob.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return {
        ...cat,
        problems: matchedProblems
      };
    }).filter(cat => {
      // Filter categories by selectedCategory and if it has problems
      if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
        return false;
      }
      return cat.problems.length > 0;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 animate-fade-in text-gray-200">
      
      {/* HEADER BANNER */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-brass-light" /> TUF+ DSA Checklist
          </h2>
          <p className="text-xs text-zinc-400">
            A structured compilation of crucial DSA problems based on the takeUforward (TUF+) roadmap.
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800/60 p-4 rounded-lg min-w-[240px]">
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-mono">TOTAL PROGRESS</span>
              <span className="text-brass-light font-bold font-mono">{completedCount}/{totalProblemsCount}</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brass-glow to-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full border border-brass-light/30 bg-brass-glow/5 shadow-[0_0_15px_rgba(217,119,6,0.1)]">
            <span className="text-sm font-bold font-mono text-brass-light">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 shadow-lg backdrop-blur-md space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800/80 focus:border-brass-light/60 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800/80 focus:border-brass-light/60 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer transition-all"
            >
              <option value="All">All Categories</option>
              {checklistData.map(cat => (
                <option key={cat.category} value={cat.category}>
                  {cat.category} ({getCategoryStats(cat.category).completed}/{getCategoryStats(cat.category).total})
                </option>
              ))}
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleExpandAll}
              className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-[10px] font-bold text-zinc-300 uppercase tracking-wider transition-all cursor-pointer font-mono"
              title="Expand all sections"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-[10px] font-bold text-zinc-300 uppercase tracking-wider transition-all cursor-pointer font-mono"
              title="Collapse all sections"
            >
              Collapse All
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-3 py-2 rounded border border-red-900/50 bg-red-950/10 hover:bg-red-950/20 text-[10px] font-bold text-red-400 uppercase tracking-wider transition-all cursor-pointer font-mono flex items-center gap-1"
              title="Reset checklist progress"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* SECTIONS LIST */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Matching Problems Found</h3>
            <p className="text-xs text-zinc-500">Try adjusting your search terms or selecting a different category.</p>
          </div>
        ) : (
          filteredData.map(cat => {
            const isCollapsed = !!collapsedCategories[cat.category];
            const stats = getCategoryStats(cat.category);

            return (
              <div 
                key={cat.category} 
                className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl overflow-hidden shadow-md"
              >
                {/* Category Header */}
                <div 
                  onClick={() => toggleCategoryCollapse(cat.category)}
                  className="p-4 bg-zinc-900/20 hover:bg-zinc-900/40 flex items-center justify-between gap-4 cursor-pointer select-none border-b border-zinc-800/40"
                >
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-brass-light flex-shrink-0" />
                      <h3 className="text-sm font-bold font-display text-white truncate">{cat.category}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex-shrink-0">
                        {stats.completed} / {stats.total}
                      </span>
                    </div>

                    {/* Category progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 max-w-[200px] bg-zinc-850 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brass-light transition-all duration-300 rounded-full"
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-bold font-mono text-zinc-500">{stats.percent}%</span>
                    </div>
                  </div>

                  <div className="p-1 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </div>

                {/* Category Problems List */}
                {!isCollapsed && (
                  <div className="p-4 bg-zinc-950/30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.problems.map(prob => {
                      const id = `${cat.category}-${prob}`.replace(/\s+/g, '-').toLowerCase();
                      const isCompleted = !!completedProblems[id];

                      // Links to search / practice
                      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(prob + " takeuforward leetcode")}`;
                      const leetcodeSearchUrl = `https://leetcode.com/problemset/?search=${encodeURIComponent(prob)}`;

                      return (
                        <div 
                          key={prob}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-zinc-900/60 group select-none ${
                            isCompleted 
                              ? "border-emerald-950/40 bg-emerald-950/5 text-zinc-400" 
                              : "border-zinc-850/80 bg-zinc-900/20 text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <label className="uiverse-checkbox-container flex items-center select-none cursor-pointer flex-shrink-0">
                              <input 
                                type="checkbox" 
                                checked={isCompleted} 
                                onChange={() => toggleProblem(id)} 
                              />
                              <span className="checkmark" />
                            </label>

                            <span 
                              onClick={() => toggleProblem(id)}
                              className={`text-xs font-medium cursor-pointer truncate ${
                                isCompleted ? "line-through text-zinc-500" : "hover:text-white"
                              }`}
                              title={prob}
                            >
                              {prob}
                            </span>
                          </div>

                          {/* Quick Solve Links */}
                          <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity ml-2">
                            <a 
                              href={leetcodeSearchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-brass-light hover:bg-zinc-800 transition-all flex items-center gap-0.5"
                              title="Search on LeetCode"
                            >
                              <Zap className="w-3 h-3 text-amber-500" />
                            </a>
                            <a 
                              href={googleSearchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
                              title="Google Search Solution"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
