import React, { useState, useEffect, useRef } from 'react';
import { 
  ROADMAP_SOURCES, 
  ROADMAP_PHASES, 
  ROADMAP_WEEKS 
} from './data/roadmapData';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  BarChart2, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Settings, 
  Zap, 
  Info, 
  ChevronRight, 
  Sparkles, 
  Target,
  FileText,
  Award,
  RefreshCw,
  LogIn,
  LogOut,
  User,
  CloudLightning,
  CloudOff,
  Database
} from 'lucide-react';
import './App.css';

function App() {
  // Navigation Tabs: 'dashboard' | 'daily' | 'weeks' | 'dsa-log' | 'sources'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Authentication states
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Local state initialized from LocalStorage (will be overridden on login)
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_tasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedWeek, setSelectedWeek] = useState(1);

  const [dsaLogs, setDsaLogs] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_dsa_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [weeklyLogs, setWeeklyLogs] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_weekly_logs');
    if (saved) return JSON.parse(saved);
    return Array.from({ length: 16 }, (_, i) => ({
      week: i + 1,
      dsaProblems: '',
      unaidedPct: '',
      csTopics: '',
      projectMilestone: 'N',
      mockDone: 'N',
      confidence: '',
      notes: ''
    }));
  });

  // Form input states
  const [dsaForm, setDsaForm] = useState({
    problemName: '',
    pattern: 'Arrays & Strings',
    difficulty: 'Easy',
    solvedUnaided: 'Y',
    timeTaken: '',
    notes: ''
  });

  const [steamParticles, setSteamParticles] = useState([]);
  const steamContainerRef = useRef(null);

  // Listen to Auth State Changes & Fetch Sync
  useEffect(() => {
    if (!supabase) return;
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        syncFromDatabase();
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        syncFromDatabase();
      } else {
        // Clear variables, fallback to local storage
        const savedTasks = localStorage.getItem('himanshu_roadmap_tasks');
        const savedDsa = localStorage.getItem('himanshu_roadmap_dsa_logs');
        const savedWeek = localStorage.getItem('himanshu_roadmap_weekly_logs');

        setCompletedTasks(savedTasks ? JSON.parse(savedTasks) : {});
        setDsaLogs(savedDsa ? JSON.parse(savedDsa) : []);
        setWeeklyLogs(savedWeek ? JSON.parse(savedWeek) : Array.from({ length: 16 }, (_, i) => ({
          week: i + 1,
          dsaProblems: '',
          unaidedPct: '',
          csTopics: '',
          projectMilestone: 'N',
          mockDone: 'N',
          confidence: '',
          notes: ''
        })));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save states locally ONLY if not logged in (to prevent overwriting database on loading states)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('himanshu_roadmap_tasks', JSON.stringify(completedTasks));
    }
  }, [completedTasks, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('himanshu_roadmap_dsa_logs', JSON.stringify(dsaLogs));
    }
  }, [dsaLogs, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('himanshu_roadmap_weekly_logs', JSON.stringify(weeklyLogs));
    }
  }, [weeklyLogs, user]);

  // Pull all data from Supabase
  const syncFromDatabase = async () => {
    if (!supabase) return;
    setIsSyncing(true);
    try {
      // 1. Fetch completed tasks
      const { data: tasksData, error: tasksErr } = await supabase
        .from('completed_tasks')
        .select('task_id');
      
      if (tasksData && !tasksErr) {
        const taskMap = {};
        tasksData.forEach(t => {
          taskMap[t.task_id] = true;
        });
        setCompletedTasks(taskMap);
      }

      // 2. Fetch DSA attempts
      const { data: dsaData, error: dsaErr } = await supabase
        .from('dsa_attempts')
        .select('*')
        .order('created_at', { ascending: false });

      if (dsaData && !dsaErr) {
        const formattedDsa = dsaData.map(d => ({
          id: d.id,
          problemName: d.problem_name,
          pattern: d.pattern,
          difficulty: d.difficulty,
          solvedUnaided: d.solved_unaided,
          timeTaken: d.time_taken ? String(d.time_taken) : '',
          notes: d.notes || '',
          week: d.week,
          date: d.date
        }));
        setDsaLogs(formattedDsa);
      }

      // 3. Fetch weekly reviews
      const { data: weeklyData, error: weeklyErr } = await supabase
        .from('weekly_logs')
        .select('*')
        .order('week', { ascending: true });

      if (weeklyData && !weeklyErr) {
        const logsTemplate = Array.from({ length: 16 }, (_, i) => ({
          week: i + 1,
          dsaProblems: '',
          unaidedPct: '',
          csTopics: '',
          projectMilestone: 'N',
          mockDone: 'N',
          confidence: '',
          notes: ''
        }));
        
        weeklyData.forEach(w => {
          const index = w.week - 1;
          if (logsTemplate[index]) {
            logsTemplate[index] = {
              week: w.week,
              dsaProblems: w.dsa_problems ? String(w.dsa_problems) : '',
              unaidedPct: w.unaided_pct ? String(w.unaided_pct) : '',
              csTopics: w.cs_topics || '',
              projectMilestone: w.project_milestone,
              mockDone: w.mock_done,
              confidence: w.confidence ? String(w.confidence) : '',
              notes: w.notes || ''
            };
          }
        });
        setWeeklyLogs(logsTemplate);
      }
    } catch (err) {
      console.error("Supabase pull error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auth Submit Handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSyncing(true);

    if (!supabase) {
      setAuthError('Supabase is not configured yet.');
      setIsSyncing(false);
      return;
    }

    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        });
        if (error) throw error;
        setAuthModalOpen(false);
        setAuthEmail('');
        setAuthPassword('');
      } else {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword
        });
        if (error) throw error;
        alert('Registration successful! Please check your email for the confirmation link.');
        setAuthModalOpen(false);
        setAuthEmail('');
        setAuthPassword('');
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  // Task stats calculations
  const totalTasksCount = 16 * 6 * 3; 
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const overallProgressPercent = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  // Week-specific stats calculation
  const getWeekProgress = (weekNum) => {
    const weekData = ROADMAP_WEEKS.find(w => w.weekNumber === weekNum);
    if (!weekData) return 0;
    
    let weekTasksCount = 0;
    let completedWeekTasksCount = 0;

    weekData.days.forEach(day => {
      ['dsa', 'cs', 'project'].forEach(track => {
        weekTasksCount++;
        const taskId = `w${weekNum}-${day.day}-${track}`;
        if (completedTasks[taskId]) {
          completedWeekTasksCount++;
        }
      });
    });

    return weekTasksCount > 0 
      ? Math.round((completedWeekTasksCount / weekTasksCount) * 100) 
      : 0;
  };

  // Toggle checklist tasks
  const toggleTask = async (weekNum, dayName, track) => {
    const taskId = `w${weekNum}-${dayName}-${track}`;
    const isNowCompleted = !completedTasks[taskId];
    
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: isNowCompleted
    }));

    if (isNowCompleted) {
      triggerSteamEffect();
    }

    // Sync database
    if (supabase && user) {
      try {
        if (isNowCompleted) {
          await supabase
            .from('completed_tasks')
            .insert([{ user_id: user.id, task_id: taskId }]);
        } else {
          await supabase
            .from('completed_tasks')
            .delete()
            .match({ user_id: user.id, task_id: taskId });
        }
      } catch (err) {
        console.error("Database update task error:", err);
      }
    }
  };

  // Steam particle animation trigger
  const triggerSteamEffect = () => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 60 + 20 + '%',
      size: Math.random() * 12 + 6 + 'px',
      delay: Math.random() * 0.3 + 's'
    }));

    setSteamParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setSteamParticles(prev => prev.slice(8));
    }, 1500);
  };

  // DSA Form Handlers
  const handleDsaFormChange = (e) => {
    const { name, value } = e.target;
    setDsaForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDsaLog = async (e) => {
    e.preventDefault();
    if (!dsaForm.problemName.trim()) return;

    const newLogId = Date.now().toString();
    const newLogDate = new Date().toLocaleDateString();

    const localLog = {
      ...dsaForm,
      id: newLogId,
      date: newLogDate,
      week: selectedWeek
    };

    setDsaLogs(prev => [localLog, ...prev]);
    triggerSteamEffect();

    // Sync to Supabase
    if (supabase && user) {
      try {
        const { data, error } = await supabase
          .from('dsa_attempts')
          .insert([{
            user_id: user.id,
            problem_name: dsaForm.problemName,
            pattern: dsaForm.pattern,
            difficulty: dsaForm.difficulty,
            solved_unaided: dsaForm.solvedUnaided,
            time_taken: dsaForm.timeTaken ? parseInt(dsaForm.timeTaken) : null,
            notes: dsaForm.notes,
            week: selectedWeek,
            date: newLogDate
          }])
          .select();
        
        // Swap local timestamp id with actual DB generated uuid
        if (data && data[0] && !error) {
          setDsaLogs(prev => prev.map(l => l.id === newLogId ? { ...l, id: data[0].id } : l));
        }
      } catch (err) {
        console.error("Database insert DSA error:", err);
      }
    }

    setDsaForm(prev => ({
      ...prev,
      problemName: '',
      timeTaken: '',
      notes: ''
    }));
  };

  const handleDeleteDsaLog = async (id) => {
    setDsaLogs(prev => prev.filter(log => log.id !== id));

    if (supabase && user) {
      try {
        await supabase
          .from('dsa_attempts')
          .delete()
          .match({ user_id: user.id, id: id });
      } catch (err) {
        console.error("Database delete DSA error:", err);
      }
    }
  };

  // Sunday weekly progress edit handler & auto-sync
  const handleWeeklyLogChange = (weekNum, field, value) => {
    setWeeklyLogs(prev => prev.map(log => {
      if (log.week === weekNum) {
        return { ...log, [field]: value };
      }
      return log;
    }));
  };

  const handleWeeklyLogBlur = async (weekNum) => {
    if (!supabase || !user) return;
    
    const currentWeekLog = weeklyLogs.find(wl => wl.week === weekNum);
    if (!currentWeekLog) return;

    try {
      await supabase
        .from('weekly_logs')
        .upsert({
          user_id: user.id,
          week: weekNum,
          dsa_problems: currentWeekLog.dsaProblems ? parseInt(currentWeekLog.dsaProblems) : null,
          unaided_pct: currentWeekLog.unaidedPct ? parseInt(currentWeekLog.unaidedPct) : null,
          cs_topics: currentWeekLog.csTopics,
          project_milestone: currentWeekLog.projectMilestone,
          mock_done: currentWeekLog.mockDone,
          confidence: currentWeekLog.confidence ? parseInt(currentWeekLog.confidence) : null,
          notes: currentWeekLog.notes
        }, { onConflict: 'user_id,week' });
    } catch (err) {
      console.error("Database upsert weekly log error:", err);
    }
  };

  // Factory reset state
  const resetAllData = async () => {
    if (window.confirm("Are you sure you want to reset all tracking progress, logs, and notes? This will wipe your local cache and online database if logged in.")) {
      setCompletedTasks({});
      setDsaLogs([]);
      setWeeklyLogs(Array.from({ length: 16 }, (_, i) => ({
        week: i + 1,
        dsaProblems: '',
        unaidedPct: '',
        csTopics: '',
        projectMilestone: 'N',
        mockDone: 'N',
        confidence: '',
        notes: ''
      })));

      localStorage.removeItem('himanshu_roadmap_tasks');
      localStorage.removeItem('himanshu_roadmap_dsa_logs');
      localStorage.removeItem('himanshu_roadmap_weekly_logs');

      if (supabase && user) {
        try {
          setIsSyncing(true);
          await supabase.from('completed_tasks').delete().match({ user_id: user.id });
          await supabase.from('dsa_attempts').delete().match({ user_id: user.id });
          await supabase.from('weekly_logs').delete().match({ user_id: user.id });
        } catch (err) {
          console.error("Database factory wipe error:", err);
        } finally {
          setIsSyncing(false);
        }
      }
      alert("All progress reset to zero.");
    }
  };

  // Calculate needle rotation sweep (-120deg to 120deg)
  const needleRotation = -120 + (overallProgressPercent / 100) * 240;

  // Weak pattern extraction helper
  const getPatternStats = () => {
    const stats = {};
    dsaLogs.forEach(log => {
      if (!stats[log.pattern]) {
        stats[log.pattern] = { total: 0, unaided: 0 };
      }
      stats[log.pattern].total += 1;
      if (log.solvedUnaided === 'Y') {
        stats[log.pattern].unaided += 1;
      }
    });

    return Object.entries(stats).map(([name, data]) => ({
      name,
      total: data.total,
      unaidedRate: Math.round((data.unaided / data.total) * 100)
    })).sort((a, b) => a.unaidedRate - b.unaidedRate);
  };

  const patternStats = getPatternStats();

  return (
    <div className="flex flex-col min-h-screen bg-cyber-bg text-gray-200">
      
      {/* STATUS NOTIFICATION BANNER */}
      {!isSupabaseConfigured && (
        <div className="w-full bg-amber-950/40 border-b border-amber-900/60 px-4 py-2 text-center text-xs text-amber-400 flex items-center justify-center gap-2">
          <CloudOff className="w-3.5 h-3.5" /> 
          <span>Running in <strong>offline Local Storage mode</strong>. Provide your database keys in <code>.env</code> to activate cloud sync.</span>
        </div>
      )}

      {isSupabaseConfigured && user && (
        <div className="w-full bg-emerald-950/30 border-b border-emerald-900/40 px-4 py-1.5 text-center text-[10px] text-emerald-400 tracking-wider uppercase font-mono flex items-center justify-center gap-2">
          <CloudLightning className="w-3.5 h-3.5 animate-pulse" /> 
          <span>Connected to Supabase Database • Syncing Active</span>
          {isSyncing && <span className="animate-spin inline-block w-2.5 h-2.5 border border-emerald-400 border-t-transparent rounded-full ml-1" />}
        </div>
      )}

      {/* GLOWING HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full lg:w-auto justify-start">
          <div className="p-2.5 rounded-lg bg-brass-glow/10 border border-brass-light/30 shadow-[0_0_15px_rgba(217,119,6,0.15)] glow-animation">
            <Target className="w-6 h-6 text-brass-light" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              THE CODING GRIND
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brass-glow/20 border border-brass-light/30 text-brass-light font-sans font-medium uppercase tracking-wide">
                Week 1-16
              </span>
            </h1>
            <p className="text-xs text-zinc-400">Master DSA Patterns, CS Fundamentals, and RAG Architecture</p>
          </div>
        </div>

        {/* TABS NAVIGATION IN TOP CENTER */}
        <div className="flex justify-center w-full lg:flex-1">
          <nav className="flex flex-wrap gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg justify-center">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'dashboard' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Engine Room
            </button>
            <button 
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'daily' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" /> Daily Tracker
            </button>
            <button 
              onClick={() => setActiveTab('weeks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'weeks' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Weekly Overview
            </button>
            <button 
              onClick={() => setActiveTab('dsa-log')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'dsa-log' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> DSA Log
            </button>
            <button 
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'sources' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Study Library
            </button>
          </nav>
        </div>

        {/* Database & Profile Section on the Right */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          {isSupabaseConfigured && (
            <>
              {user ? (
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 pl-3">
                  <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[120px]">{user.email}</span>
                  <button 
                    onClick={handleLogout} 
                    className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 rounded-lg text-xs font-medium text-brass-light hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" /> Cloud Sync
                </button>
              )}
            </>
          )}
        </div>
      </header>

      {/* CORE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* ================== TAB: ENGINE ROOM / DASHBOARD ================== */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ANTIMATERIAL METALLIC STEAM GAUGE */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="glass-reflection absolute inset-0 rounded-xl" />
              
              <div className="w-full text-center space-y-1 mb-4 z-10">
                <h3 className="font-display font-medium text-brass-light text-sm tracking-wider uppercase">Aetheric Steam Gauge</h3>
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest">ROADMAP BOILER CONVERSION RATE</p>
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
                className="mt-6 flex items-center gap-1.5 px-4 py-2 rounded-full border border-brass-light/40 bg-zinc-950 text-[10px] uppercase font-bold tracking-widest text-brass-light hover:bg-brass-glow/10 active:scale-95 transition-all shadow-[0_0_10px_rgba(217,119,6,0.1)] cursor-pointer"
              >
                <Zap className="w-3 h-3" /> VENT STEAM VALVE
              </button>
            </div>

            {/* QUICK STATS & TARGET SUMMARY */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative flex flex-col justify-between backdrop-blur-md">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">DSA TARGET</span>
                    <span className="text-3xl font-display font-semibold text-white block mt-2">
                      {dsaLogs.length}
                    </span>
                    <p className="text-xs text-zinc-400 mt-1">Logged Problems</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Unaided Rate</span>
                    <span className="text-xs font-mono text-brass-light">
                      {dsaLogs.length > 0
                        ? Math.round((dsaLogs.filter(l => l.solvedUnaided === 'Y').length / dsaLogs.length) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg relative flex flex-col justify-between backdrop-blur-md">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">COMPLETED TASKS</span>
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
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">CURRENT MILESTONE</span>
                    <span className="text-sm font-display font-medium text-white block mt-2 leading-snug">
                      Week {selectedWeek}: {ROADMAP_WEEKS.find(w => w.weekNumber === selectedWeek)?.milestone.split('.')[0]}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Week Progress</span>
                    <span className="text-xs font-mono text-brass-light">{getWeekProgress(selectedWeek)}%</span>
                  </div>
                </div>
              </div>

              {/* COGNITIVE GAP ANALYSIS & ROADMAP TARGETS */}
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
                <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
                  <Award className="w-4 h-4 text-brass-light" /> COGNITIVE GAP EXPLAINER CHECKPOINT
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-xs leading-relaxed text-zinc-300">
                    <strong className="text-brass-light block text-sm mb-1 font-display">💡 What holds you back:</strong>
                    "You build fast and explain slow. Touching a tool isn't the same as understanding what it's doing for you. This roadmap forces you to explain concepts out loud to build depth over breadth."
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ROADMAP_PHASES.map((p, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">{p.name.split(':')[1]}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">{p.weeks}</span>
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
                    <h3 className="text-xs font-bold font-display text-white mb-3 tracking-wider uppercase">Weak Patterns Log</h3>
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
                                className="h-full bg-red-500 rounded-full" 
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
                    className="mt-4 w-full flex items-center justify-center gap-1 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-brass-light transition-all cursor-pointer"
                  >
                    Open Logbook <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold font-display text-white mb-2 tracking-wider uppercase">Study Blueprint Tracker</h3>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-2 mt-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-400">Week Select</span>
                        <select 
                          value={selectedWeek} 
                          onChange={(e) => setSelectedWeek(Number(e.target.value))}
                          className="bg-zinc-950 border border-zinc-800 rounded px-2 py-0.5 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono"
                        >
                          {Array.from({ length: 16 }).map((_, i) => (
                            <option key={i} value={i + 1}>Week {i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Weekly Theme</span>
                        <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                          {ROADMAP_WEEKS.find(w => w.weekNumber === selectedWeek)?.theme}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('daily')}
                    className="mt-4 w-full flex items-center justify-center gap-1 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-brass-light transition-all cursor-pointer"
                  >
                    Go to Week {selectedWeek} Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================== TAB: DAILY CHECKLISTS ================== */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            
            {/* WEEK SELECTOR ACCORDION MENU */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 flex flex-wrap gap-2 items-center justify-between shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">Active Week:</span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
                    disabled={selectedWeek === 1}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-bold text-zinc-300 disabled:opacity-50 cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="text-sm font-bold font-mono text-brass-light px-3 py-0.5 rounded bg-brass-glow/10 border border-brass-light/20">
                    Week {selectedWeek}
                  </span>
                  <button 
                    onClick={() => setSelectedWeek(w => Math.min(16, w + 1))}
                    disabled={selectedWeek === 16}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-bold text-zinc-300 disabled:opacity-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Progress for selected week */}
              <div className="flex items-center gap-3">
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

            {/* WEEK HEADER SPECIFICS */}
            {ROADMAP_WEEKS.filter(w => w.weekNumber === selectedWeek).map((week) => (
              <div key={week.weekNumber} className="space-y-6">
                
                {/* Theme & Milestones Details Banner */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 p-3 bg-zinc-900/60 border-l border-b border-zinc-800 text-[10px] text-brass-light font-mono rounded-bl-lg tracking-wider uppercase">
                    {week.phase}
                  </div>
                  <div className="space-y-4 max-w-4xl">
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block">Weekly Core Theme</span>
                      <h2 className="text-lg font-bold font-display text-white leading-snug">{week.theme}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-800/60">
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase">DSA Learning Targets</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{week.dsaFocus}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase">CS / Specialization Focus</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{week.csFocus}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-brass-light font-mono tracking-wide uppercase">Exit Milestone goal</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans font-medium">{week.milestone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* THE 6-DAY MON-SAT TASKS MATRIX GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {week.days.map((day, idx) => (
                    <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-md flex flex-col justify-between backdrop-blur-md space-y-4 hover:border-zinc-700/80 transition-all">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
                        <span className="text-sm font-bold font-mono text-brass-light bg-brass-glow/5 border border-brass-light/10 px-2 py-0.5 rounded">
                          {day.day}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                          Target: ~5-7 hrs / day
                        </span>
                      </div>

                      {/* Tracks Section */}
                      <div className="space-y-3.5 flex-1">
                        <div className="flex items-start gap-3">
                          <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                            <input 
                              type="checkbox" 
                              checked={!!completedTasks[`w${week.weekNumber}-${day.day}-dsa`]} 
                              onChange={() => toggleTask(week.weekNumber, day.day, 'dsa')} 
                            />
                            <span className="checkmark" />
                          </label>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold tracking-wider text-purple-400 font-mono uppercase">DSA (3 Hrs)</span>
                            <p className="text-xs text-zinc-300 leading-relaxed">{day.dsa}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                            <input 
                              type="checkbox" 
                              checked={!!completedTasks[`w${week.weekNumber}-${day.day}-cs`]} 
                              onChange={() => toggleTask(week.weekNumber, day.day, 'cs')} 
                            />
                            <span className="checkmark" />
                          </label>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold tracking-wider text-cyan-400 font-mono uppercase">CS / Specialization (2 Hrs)</span>
                            <p className="text-xs text-zinc-300 leading-relaxed">{day.cs}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <label className="uiverse-checkbox-container mt-0.5 flex-shrink-0">
                            <input 
                              type="checkbox" 
                              checked={!!completedTasks[`w${week.weekNumber}-${day.day}-project`]} 
                              onChange={() => toggleTask(week.weekNumber, day.day, 'project')} 
                            />
                            <span className="checkmark" />
                          </label>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold tracking-wider text-brass-light font-mono uppercase">Project Work (1-2 Hrs)</span>
                            <p className="text-xs text-zinc-300 leading-relaxed">{day.project}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUNDAY BUFFER & WEEKLY PROGRESS UPDATE */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden backdrop-blur-md">
                  <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brass-light" /> SUNDAY CATCH-UP & WEEKLY LOG REVIEW
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <strong>Sunday is a buffer/rest day</strong> — use it to catch up on any unchecked tasks from Mon-Sat, redo your weakest problems, or rest. 
                      </p>
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-300">
                        <strong className="text-white block mb-1">Weekly Review Action Items:</strong>
                        1. Count and record how many DSA problems you solved this week.<br />
                        2. Record your solved unaided rate percentage in the logbook.<br />
                        3. Review next week's theme in the Overview tab to align your mind before Monday starts.
                      </div>
                    </div>

                    {/* SUNDAY USER MANUAL LOG INPUT */}
                    <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
                      <h4 className="text-xs font-bold text-zinc-300 font-display tracking-wide uppercase pb-2 border-b border-zinc-800">
                        Manual Sunday Entry (Week {selectedWeek})
                      </h4>

                      {weeklyLogs.filter(wl => wl.week === selectedWeek).map((log, idx) => (
                        <div key={idx} className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] text-zinc-500 font-mono uppercase block">DSA Solved</label>
                              <input 
                                type="number" 
                                placeholder="15"
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
                                placeholder="80"
                                value={log.unaidedPct}
                                onChange={(e) => handleWeeklyLogChange(selectedWeek, 'unaidedPct', e.target.value)}
                                onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] text-zinc-500 font-mono uppercase block">CS Topics Completed</label>
                            <input 
                              type="text" 
                              placeholder="OS Deadlocks, SQL Joins"
                              value={log.csTopics}
                              onChange={(e) => handleWeeklyLogChange(selectedWeek, 'csTopics', e.target.value)}
                              onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] text-zinc-500 font-mono uppercase block">Project Target?</label>
                              <select 
                                value={log.projectMilestone}
                                onChange={(e) => handleWeeklyLogChange(selectedWeek, 'projectMilestone', e.target.value)}
                                onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono"
                              >
                                <option value="Y">Yes (Y)</option>
                                <option value="N">No (N)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] text-zinc-500 font-mono uppercase block">Mock Interview?</label>
                              <select 
                                value={log.mockDone}
                                onChange={(e) => handleWeeklyLogChange(selectedWeek, 'mockDone', e.target.value)}
                                onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-brass-light focus:outline-none focus:border-brass-light font-mono"
                              >
                                <option value="Y">Yes (Y)</option>
                                <option value="N">No (N)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] text-zinc-500 font-mono uppercase block">Self-Confidence (1-5)</label>
                            <input 
                              type="number" 
                              min="1"
                              max="5"
                              placeholder="5"
                              value={log.confidence}
                              onChange={(e) => handleWeeklyLogChange(selectedWeek, 'confidence', e.target.value)}
                              onBlur={() => handleWeeklyLogBlur(selectedWeek)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brass-light font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] text-zinc-500 font-mono uppercase block">Notes</label>
                            <textarea 
                              placeholder="Identify weak spots..."
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
            ))}

          </div>
        )}

        {/* ================== TAB: OVERVIEW MATRIX ================== */}
        {activeTab === 'weeks' && (
          <div className="space-y-6">
            
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Weekly Roadmap Blueprint</h2>
                <p className="text-xs text-zinc-400 mt-1">Review the theme, focus tracks, and target milestone for all 16 weeks at a glance.</p>
              </div>
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs space-y-1 font-mono">
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Foundation (Weeks 1-8):</span>
                  <span className="text-white font-semibold">OS, DBMS, Core DSA</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Specialization (Weeks 6-14):</span>
                  <span className="text-brass-light font-semibold">GenAI, RAG, Transformers</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Interview Reps (Weeks 10-16):</span>
                  <span className="text-cyan-400 font-semibold">Mocks, Stories, System Design</span>
                </div>
              </div>
            </div>

            {/* WEEK LOG TABLE LISTING */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/60 border-b border-zinc-850 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      <th className="py-4 px-5">Week</th>
                      <th className="py-4 px-5">Theme / Milestone</th>
                      <th className="py-4 px-5">DSA Track Focus</th>
                      <th className="py-4 px-5">CS / Specialization Focus</th>
                      <th className="py-4 px-5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850 text-xs">
                    {ROADMAP_WEEKS.map((w) => (
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
            </div>

            {/* SUNDAY PROGRESS REVIEW HISTORICAL TABLE */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-bold font-display text-white mb-4 tracking-wider uppercase flex items-center gap-2">
                <Target className="w-4 h-4 text-brass-light" /> Himanshu's Sunday Review History
              </h3>

              <div className="overflow-x-auto">
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
                    {weeklyLogs.map((log) => (
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
            </div>

          </div>
        )}

        {/* ================== TAB: DSA PATTERN LOGBOOK ================== */}
        {activeTab === 'dsa-log' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
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
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-mono uppercase block">Pattern / Topic</label>
                      <select 
                        name="pattern"
                        value={dsaForm.pattern}
                        onChange={handleDsaFormChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-zinc-200 focus:outline-none focus:border-brass-light font-mono"
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
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-zinc-200 focus:outline-none focus:border-brass-light font-mono"
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
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-brass-light focus:outline-none focus:border-brass-light font-mono"
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
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light font-mono"
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
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light font-sans resize-none"
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
                  <span className="text-[10px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                    Total: {dsaLogs.length} attempts
                  </span>
                </div>

                {dsaLogs.length > 0 ? (
                  <div className="overflow-y-auto max-h-[420px] custom-scroll space-y-3 pr-2">
                    {dsaLogs.map((log) => (
                      <div key={log.id} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-805 hover:border-zinc-700/80 transition-all flex justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
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
                            className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all cursor-pointer"
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
        )}

        {/* ================== TAB: STUDY SOURCES / LIBRARY ================== */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md">
              <h2 className="text-lg font-bold font-display text-white">Study Library & Learning Center</h2>
              <p className="text-xs text-zinc-400 mt-1">Consolidated learning material sources. Stick to these, avoid switching resources mid-way.</p>
            </div>

            {/* SOURCES LIST BY SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* DSA Learning Material Track */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <span className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Target className="w-4 h-4" />
                  </span>
                  <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">DSA Core Sources</h3>
                </div>

                <div className="space-y-4">
                  {ROADMAP_SOURCES.dsa.map((s, idx) => (
                    <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between min-h-[160px]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-white leading-tight font-display">{s.title}</h4>
                          {s.recommended && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-brass-glow/20 text-brass-light border border-brass-light/30 uppercase font-mono tracking-wider font-semibold">REC</span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{s.description}</p>
                      </div>
                      <a 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[10px] font-bold text-purple-400 tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Open Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* CS Fundamentals Learning Track */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">CS Foundations</h3>
                </div>

                <div className="space-y-4">
                  {ROADMAP_SOURCES.cs.map((s, idx) => (
                    <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between min-h-[160px]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-white leading-tight font-display">{s.title}</h4>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{s.description}</p>
                      </div>
                      <a 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[10px] font-bold text-cyan-400 tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Open Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* GenAI and LLM Specialization Track */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <span className="p-1.5 rounded bg-brass-glow/10 text-brass-light border border-brass-light/20">
                    <Award className="w-4 h-4" />
                  </span>
                  <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">GenAI / Specialization</h3>
                </div>

                <div className="space-y-4">
                  {ROADMAP_SOURCES.genai.map((s, idx) => (
                    <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between min-h-[160px]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-white leading-tight font-display">{s.title}</h4>
                          {s.recommended && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-brass-glow/20 text-brass-light border border-brass-light/30 uppercase font-mono tracking-wider font-semibold">REC</span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{s.description}</p>
                      </div>
                      <a 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[10px] font-bold text-brass-light tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Open Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BLUEPRINT COGNITIVE STUDY TRICKS */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md">
              <h3 className="text-sm font-bold font-display text-white mb-3 tracking-wider uppercase flex items-center gap-2">
                <Info className="w-4 h-4 text-brass-light" /> Himanshu's Daily Checklist Action Loops
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 leading-relaxed">
                <div className="space-y-1">
                  <strong className="text-white block font-display font-medium text-xs uppercase tracking-wide">1. Daily Tracker Loop</strong>
                  <p>Open the daily checker tab every morning, select the current week, read your daily tasks for the 3 tracks, check them off as you complete them.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-white block font-display font-medium text-xs uppercase tracking-wide">2. DSA Logging Loop</strong>
                  <p>Do not batch dsa problem records. Log them here immediately to write notes on what tripped you up while it is fresh. Use it to find your weak patterns.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-white block font-display font-medium text-xs uppercase tracking-wide">3. Sunday Checklist Review</strong>
                  <p>Sit down on Sundays, review your week's milestone and Exit Standard checklist, enter weekly completion rates, and clear weak pattern backlogs.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* AUTHENTICATION MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-4 relative">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-md font-bold font-display text-white tracking-wider uppercase">
                {authMode === 'login' ? 'Cloud Sign In' : 'Create Account'}
              </h3>
              <p className="text-[10px] text-zinc-500 tracking-wider font-mono">
                {authMode === 'login' ? 'SYNC YOUR STUDY PROGRESS TO CLOUD' : 'START BACKING UP YOUR MILESTONES'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              {authError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 rounded text-center leading-relaxed">
                  {authError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] text-zinc-500 font-mono uppercase block">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="himanshu@engineer.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-zinc-500 font-mono uppercase block">Password</label>
                <input 
                  type="password" 
                  required 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brass-light"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSyncing}
                className="w-full py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)] disabled:opacity-50 cursor-pointer"
              >
                {isSyncing ? 'Connecting...' : authMode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-zinc-900">
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-[10px] text-brass-light font-medium hover:underline cursor-pointer"
              >
                {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CONTROLS */}
      <footer className="w-full border-t border-zinc-850 bg-zinc-950 py-6 px-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <p>© 2026 Himanshu's 16-Week AI Engineer Prep System. Built natives-first.</p>
        <div className="flex gap-4">
          <button 
            onClick={resetAllData} 
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/20 active:scale-95 transition-all text-[10px] font-bold tracking-widest uppercase cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Factory Reset Tracker
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;
