import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { getLeetcodeStats } from './leetcodeTelemetry';
import { generateRoadmap } from './data/roadmapGenerator';

// Components
import Onboarding from './components/Onboarding';
import SkeletonLoader from './components/SkeletonLoader';
import ResetConfirmModal from './components/ResetConfirmModal';

// Pages
import Dashboard from './pages/Dashboard';
import DailyQuest from './pages/DailyQuest';
import WeeklyLogs from './pages/WeeklyLogs';
import DsaAttempts from './pages/DsaAttempts';
import Sources from './pages/Sources';
import LeetcodeHub from './pages/LeetcodeHub';
import NeetcodeRoadmap from './pages/NeetcodeRoadmap';
import TufChecklist from './pages/TufChecklist';

// Icons
import { 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  BarChart2, 
  Settings, 
  RefreshCw,
  LogIn,
  LogOut,
  Target,
  FileText,
  Award,
  CloudLightning,
  CloudOff,
  GitMerge
} from 'lucide-react';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  
  // Auth states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Global loading states
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modals & UI States
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Onboarding Settings & Roadmap
  const [profileSettings, setProfileSettings] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_profile_settings');
    return saved ? JSON.parse(saved) : null;
  });

  const [roadmap, setRoadmap] = useState(() => {
    const savedSettings = localStorage.getItem('himanshu_roadmap_profile_settings');
    if (savedSettings) {
      return generateRoadmap(JSON.parse(savedSettings));
    }
    return null;
  });

  // Track progress states
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
    return saved ? JSON.parse(saved) : [];
  });

  // Form attempts states
  const [dsaForm, setDsaForm] = useState({
    problemName: '',
    pattern: 'Arrays & Strings',
    difficulty: 'Easy',
    solvedUnaided: 'Y',
    timeTaken: '',
    notes: ''
  });

  // LeetCode states
  const [leetcodeUsername, setLeetcodeUsername] = useState(() => {
    return localStorage.getItem('himanshu_roadmap_leetcode_username') || '';
  });
  
  const [leetcodeStats, setLeetcodeStats] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_leetcode_stats');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLeetcodeLoading, setIsLeetcodeLoading] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState(null);
  const [leetcodeGoal, setLeetcodeGoal] = useState(() => {
    const saved = localStorage.getItem('himanshu_roadmap_leetcode_goal');
    return saved ? JSON.parse(saved) : { easy: 5, medium: 5, hard: 1 };
  });

  const [steamParticles, setSteamParticles] = useState([]);
  const steamContainerRef = useRef(null);

  // Trigger loading timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleBlur = () => {
      setToastMessage(null);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  useEffect(() => {
    setToastMessage(null);
  }, [activeTab]);

  // Auth and sync logic
  useEffect(() => {
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (activeUser) {
        syncFromDatabase();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (activeUser) {
        syncFromDatabase();
      } else {
        // Fallback to local storage
        const savedTasks = localStorage.getItem('himanshu_roadmap_tasks');
        const savedDsa = localStorage.getItem('himanshu_roadmap_dsa_logs');
        const savedWeek = localStorage.getItem('himanshu_roadmap_weekly_logs');
        const savedProfile = localStorage.getItem('himanshu_roadmap_profile_settings');

        setCompletedTasks(savedTasks ? JSON.parse(savedTasks) : {});
        setDsaLogs(savedDsa ? JSON.parse(savedDsa) : []);
        setProfileSettings(savedProfile ? JSON.parse(savedProfile) : null);
        setRoadmap(savedProfile ? generateRoadmap(JSON.parse(savedProfile)) : null);

        const totalWeeks = savedProfile ? JSON.parse(savedProfile).weeksCount : 16;
        setWeeklyLogs(savedWeek ? JSON.parse(savedWeek) : initializeWeeklyLogs(totalWeeks));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save guest states to localStorage
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

  // Sync LeetCode metadata from account
  useEffect(() => {
    if (user) {
      const metaUsername = user.user_metadata?.leetcode_username;
      const metaGoal = user.user_metadata?.leetcode_goal;
      const metaStats = user.user_metadata?.leetcode_stats;
      const metaProfile = user.user_metadata?.profile_settings;
      
      if (metaProfile) {
        setProfileSettings(metaProfile);
        localStorage.setItem('himanshu_roadmap_profile_settings', JSON.stringify(metaProfile));
        setRoadmap(generateRoadmap(metaProfile));
      }
      if (metaUsername) {
        setLeetcodeUsername(metaUsername);
        localStorage.setItem('himanshu_roadmap_leetcode_username', metaUsername);
      }
      if (metaGoal) {
        setLeetcodeGoal(metaGoal);
        localStorage.setItem('himanshu_roadmap_leetcode_goal', JSON.stringify(metaGoal));
      }
      if (metaStats) {
        setLeetcodeStats(metaStats);
        localStorage.setItem('himanshu_roadmap_leetcode_stats', JSON.stringify(metaStats));
      } else if (metaUsername) {
        triggerLeetcodeSync(metaUsername, false);
      }
    } else {
      const localProfile = localStorage.getItem('himanshu_roadmap_profile_settings');
      const localUsername = localStorage.getItem('himanshu_roadmap_leetcode_username') || '';
      const localStats = localStorage.getItem('himanshu_roadmap_leetcode_stats');
      const localGoal = localStorage.getItem('himanshu_roadmap_leetcode_goal');
      
      if (localProfile) {
        const parsed = JSON.parse(localProfile);
        setProfileSettings(parsed);
        setRoadmap(generateRoadmap(parsed));
      }
      setLeetcodeUsername(localUsername);
      setLeetcodeStats(localStats ? JSON.parse(localStats) : null);
      setLeetcodeGoal(localGoal ? JSON.parse(localGoal) : { easy: 5, medium: 5, hard: 1 });
    }
  }, [user]);

  const initializeWeeklyLogs = (totalWeeks) => {
    return Array.from({ length: totalWeeks }, (_, i) => ({
      week: i + 1,
      dsaProblems: '',
      unaidedPct: '',
      csTopics: '',
      projectMilestone: 'N',
      mockDone: 'N',
      confidence: '',
      notes: ''
    }));
  };

  const syncFromDatabase = async () => {
    if (!supabase) return;
    setIsSyncing(true);
    try {
      // 1. Tasks
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

      // 2. DSA Logs
      const { data: dsaData, error: dsaErr } = await supabase
        .from('dsa_attempts')
        .select('*')
        .order('created_at', { ascending: false });

      if (dsaData && !dsaErr) {
        setDsaLogs(dsaData.map(d => ({
          id: d.id,
          problemName: d.problem_name,
          pattern: d.pattern,
          difficulty: d.difficulty,
          solvedUnaided: d.solved_unaided,
          timeTaken: d.time_taken ? String(d.time_taken) : '',
          notes: d.notes || '',
          week: d.week,
          date: d.date
        })));
      }

      // Sync metadata profile if missing on cloud
      const sessionUser = (await supabase.auth.getUser())?.data?.user;
      if (sessionUser && !sessionUser.user_metadata?.profile_settings) {
        const localProfile = localStorage.getItem('himanshu_roadmap_profile_settings');
        if (localProfile) {
          const parsed = JSON.parse(localProfile);
          await supabase.auth.updateUser({
            data: {
              profile_settings: parsed,
              leetcode_username: leetcodeUsername || null,
              leetcode_goal: leetcodeGoal
            }
          });
        }
      }

      // 3. Weekly reviews
      const { data: weeklyData, error: weeklyErr } = await supabase
        .from('weekly_logs')
        .select('*')
        .order('week', { ascending: true });

      if (weeklyData && !weeklyErr) {
        const totalWeeks = profileSettings?.weeksCount || 16;
        const logsTemplate = initializeWeeklyLogs(totalWeeks);
        
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
      console.error("Database sync pull error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOnboardingComplete = async (settings) => {
    setProfileSettings(settings);
    localStorage.setItem('himanshu_roadmap_profile_settings', JSON.stringify(settings));
    const generated = generateRoadmap(settings);
    setRoadmap(generated);
    setIsEditingProfile(false);
    setSelectedWeek(1);

    // Initial logs template for custom weeks
    setWeeklyLogs(initializeWeeklyLogs(settings.weeksCount));

    if (supabase && user) {
      setIsSyncing(true);
      try {
        await supabase.auth.updateUser({
          data: {
            profile_settings: settings,
            leetcode_username: settings.leetcodeUsername || null
          }
        });
        showToast("Profile routine settings saved successfully!");
      } catch (e) {
        console.error("Failed to sync profile settings metadata:", e);
      } finally {
        setIsSyncing(false);
      }
    }

    if (settings.leetcodeUsername) {
      setLeetcodeUsername(settings.leetcodeUsername);
      localStorage.setItem('himanshu_roadmap_leetcode_username', settings.leetcodeUsername);
      triggerLeetcodeSync(settings.leetcodeUsername, true);
    } else {
      setLeetcodeUsername('');
      setLeetcodeStats(null);
      localStorage.removeItem('himanshu_roadmap_leetcode_username');
      localStorage.removeItem('himanshu_roadmap_leetcode_stats');
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSyncing(true);

    if (!supabase) {
      setAuthError('Supabase config error.');
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
        showToast('Registration successful! Please confirm your email.');
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
      showToast("Logged out successfully.");
    }
  };

  const totalTasksCount = roadmap ? roadmap.weeks.length * roadmap.weeks[0].days.length * 3 : 16 * 6 * 3;
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const overallProgressPercent = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  const getWeekProgress = (weekNum) => {
    if (!roadmap) return 0;
    const weekData = roadmap.weeks.find(w => w.weekNumber === weekNum);
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
        console.error("Database complete task error:", err);
      }
    }
  };

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

  const executeReset = async () => {
    setCompletedTasks({});
    setDsaLogs([]);
    
    const totalWeeks = profileSettings?.weeksCount || 16;
    setWeeklyLogs(initializeWeeklyLogs(totalWeeks));
    
    setLeetcodeUsername('');
    setLeetcodeStats(null);
    setProfileSettings(null);
    setRoadmap(null);
    
    localStorage.clear();
    
    if (supabase && user) {
      setIsSyncing(true);
      try {
        await Promise.all([
          supabase.from('completed_tasks').delete().match({ user_id: user.id }),
          supabase.from('dsa_attempts').delete().match({ user_id: user.id }),
          supabase.from('weekly_logs').delete().match({ user_id: user.id }),
          supabase.auth.updateUser({
            data: {
              profile_settings: null,
              leetcode_username: null,
              leetcode_goal: null,
              leetcode_stats: null
            }
          })
        ]);
        showToast("Cloud and local databases fully reset.");
      } catch (err) {
        console.error("Failed to reset Supabase database tables:", err);
      } finally {
        setIsSyncing(false);
      }
    } else {
      showToast("All progress reset to zero.");
    }
  };

  // LeetCode Profile Handlers
  const saveLeetcodeProfile = async (username, stats, goal) => {
    setLeetcodeUsername(username);
    setLeetcodeStats(stats);
    setLeetcodeGoal(goal);

    localStorage.setItem('himanshu_roadmap_leetcode_username', username);
    if (stats) localStorage.setItem('himanshu_roadmap_leetcode_stats', JSON.stringify(stats));
    localStorage.setItem('himanshu_roadmap_leetcode_goal', JSON.stringify(goal));

    if (supabase && user) {
      try {
        await supabase.auth.updateUser({
          data: {
            leetcode_username: username,
            leetcode_stats: stats,
            leetcode_goal: goal
          }
        });
      } catch (err) {
        console.error("Failed to sync LeetCode profile metadata:", err);
      }
    }
  };

  const triggerLeetcodeSync = async (username, showToastNotification = true) => {
    setIsLeetcodeLoading(true);
    setLeetcodeError(null);
    try {
      const stats = await getLeetcodeStats(username);
      await saveLeetcodeProfile(username, stats, leetcodeGoal);
      if (showToastNotification) {
        showToast(
          stats.isSimulated 
            ? `Offline fallback loaded mock stats for ${username}` 
            : `Synchronized LeetCode stats for ${username}!`
        );
      }
    } catch (err) {
      setLeetcodeError(err.message || 'Failed to sync LeetCode statistics');
      if (showToastNotification) {
        showToast('Error syncing LeetCode stats.');
      }
    } finally {
      setIsLeetcodeLoading(false);
    }
  };

  const handleDisconnectLeetcode = async () => {
    if (window.confirm("Are you sure you want to disconnect your LeetCode profile?")) {
      setLeetcodeUsername('');
      setLeetcodeStats(null);
      localStorage.removeItem('himanshu_roadmap_leetcode_username');
      localStorage.removeItem('himanshu_roadmap_leetcode_stats');

      if (supabase && user) {
        try {
          await supabase.auth.updateUser({
            data: {
              leetcode_username: null,
              leetcode_stats: null
            }
          });
          showToast('LeetCode profile disconnected from account.');
        } catch (err) {
          console.error("Failed to clear LeetCode metadata:", err);
        }
      } else {
        showToast('LeetCode profile disconnected.');
      }
    }
  };

  const getWeeklyDsaCount = (difficulty) => {
    if (!Array.isArray(dsaLogs)) return 0;
    return dsaLogs.filter(log => 
      log &&
      log.week === selectedWeek && 
      log.difficulty &&
      typeof log.difficulty === 'string' &&
      log.difficulty.toLowerCase() === difficulty.toLowerCase()
    ).length;
  };

  const handleUpdateGoal = (type, action) => {
    const newGoal = { ...leetcodeGoal };
    if (action === 'increment') {
      newGoal[type] += 1;
    } else if (action === 'decrement' && newGoal[type] > 0) {
      newGoal[type] -= 1;
    }
    saveLeetcodeProfile(leetcodeUsername, leetcodeStats, newGoal);
  };

  const getPatternStats = () => {
    const counts = {};
    dsaLogs.forEach(log => {
      if (!counts[log.pattern]) {
        counts[log.pattern] = { total: 0, unaided: 0 };
      }
      counts[log.pattern].total += 1;
      if (log.solvedUnaided === 'Y') {
        counts[log.pattern].unaided += 1;
      }
    });

    return Object.entries(counts).map(([name, data]) => ({
      name,
      total: data.total,
      unaidedRate: Math.round((data.unaided / data.total) * 100)
    })).sort((a, b) => a.unaidedRate - b.unaidedRate);
  };

  const needleRotation = -120 + (overallProgressPercent / 100) * 240;

  // View state branching
  if (initialLoading) {
    return <SkeletonLoader activeTab={activeTab} />;
  }

  if (!profileSettings || isEditingProfile) {
    return (
      <div className="flex flex-col min-h-screen bg-cyber-bg justify-center items-center px-4 py-8">
        <div className="w-full text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold font-display text-white tracking-widest uppercase">The Coding Grind Space</h1>
          <p className="text-xs text-zinc-500 font-mono">PERSONALIZE YOUR ROADMAP TRACKER OBJECTIVES</p>
        </div>
        <Onboarding 
          onComplete={handleOnboardingComplete}
          initialSettings={profileSettings}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cyber-bg text-gray-200">
      
      {/* CONNECTION STATUS BANNER */}
      {!isSupabaseConfigured && (
        <div className="w-full bg-amber-950/40 border-b border-amber-900/60 px-4 py-2 text-center text-xs text-amber-400 flex items-center justify-center gap-2">
          <CloudOff className="w-3.5 h-3.5" /> 
          <span>Running in <strong>offline Local Storage mode</strong>. Provide your database keys in <code>.env</code> to activate the connect option.</span>
        </div>
      )}

      {isSupabaseConfigured && user && (
        <div className="w-full bg-emerald-950/30 border-b border-emerald-900/40 px-4 py-1.5 text-center text-[10px] text-emerald-400 tracking-wider uppercase font-mono flex items-center justify-center gap-2 select-none">
          <CloudLightning className="w-3.5 h-3.5 animate-pulse" /> 
          <span>Connected to Supabase Database • Syncing Active</span>
          {isSyncing && <span className="animate-spin inline-block w-2.5 h-2.5 border border-emerald-400 border-t-transparent rounded-full ml-1" />}
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4 select-none">
        <div className="flex items-center gap-3 w-full lg:w-auto justify-start">
          <div 
            onClick={() => setIsEditingProfile(true)}
            className="p-2 rounded-lg md:p-2.5 bg-brass-glow/10 border border-brass-light/30 shadow-[0_0_15px_rgba(217,119,6,0.15)] hover:bg-brass-glow/20 transition-all cursor-pointer glow-animation"
            title="Edit Profile Settings"
          >
            <Target className="w-5 h-5 md:w-6 md:h-6 text-brass-light" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              THE CODING GRIND
              <span className="text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full bg-brass-glow/20 border border-brass-light/30 text-brass-light font-sans font-medium uppercase tracking-wide">
                Weeks 1-{roadmap?.weeks?.length || 16}
              </span>
            </h1>
            <p className="text-[10px] md:text-xs text-zinc-400">Master custom focus tracks and monitor learning segments.</p>
          </div>
        </div>

        {/* TABS SELECT NAVIGATION */}
        <div className="flex justify-start lg:justify-center w-full lg:flex-1 lg:-ml-24 overflow-x-auto no-scrollbar scroll-smooth max-w-full">
          <nav className="flex flex-nowrap gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg justify-start lg:justify-center min-w-max">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'dashboard' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Engine Room
            </button>
            <button 
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'daily' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" /> Daily Tracker
            </button>
            <button 
              onClick={() => setActiveTab('weeks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'weeks' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Weekly Matrix
            </button>
            <button 
              onClick={() => setActiveTab('dsa-log')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'dsa-log' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> DSA Log
            </button>
            <button 
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'sources' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Study Library
            </button>
            <button 
              onClick={() => setActiveTab('neetcode')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'neetcode' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5 rotate-90" /> NeetCode Map
            </button>
            <button 
              onClick={() => setActiveTab('leetcode')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'leetcode' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> LeetCode Telemetry
            </button>
            <button 
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all uppercase tracking-wider ${
                activeTab === 'checklist' ? 'bg-brass-glow/20 text-brass-light border-b border-brass-light/60 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" /> TUF+ Checklist
            </button>
          </nav>
        </div>

        {/* Database & Profile Connect Button on Right */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button 
            onClick={() => setIsEditingProfile(true)}
            className="p-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Edit Profile Routine"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          
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
                  className="flex items-center gap-1.5 px-3 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 rounded-lg text-xs font-semibold text-brass-light hover:bg-zinc-800 transition-all cursor-pointer font-mono"
                >
                  <LogIn className="w-3.5 h-3.5" /> Connect Account
                </button>
              )}
            </>
          )}
        </div>
      </header>

      {/* RENDER PAGES BY TAB */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {activeTab === 'dashboard' && roadmap && (
          <Dashboard 
            overallProgressPercent={overallProgressPercent}
            needleRotation={needleRotation}
            dsaLogs={dsaLogs}
            completedTasksCount={completedTasksCount}
            totalTasksCount={totalTasksCount}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            getWeekProgress={getWeekProgress}
            patternStats={getPatternStats()}
            phases={roadmap.phases}
            weeks={roadmap.weeks}
            triggerSteamEffect={triggerSteamEffect}
            steamParticles={steamParticles}
            steamContainerRef={steamContainerRef}
            setActiveTab={setActiveTab}
            profileSettings={profileSettings}
          />
        )}

        {activeTab === 'daily' && roadmap && (
          <DailyQuest 
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            getWeekProgress={getWeekProgress}
            completedTasks={completedTasks}
            toggleTask={toggleTask}
            weeklyLogs={weeklyLogs}
            handleWeeklyLogChange={handleWeeklyLogChange}
            handleWeeklyLogBlur={handleWeeklyLogBlur}
            weeks={roadmap.weeks}
          />
        )}

        {activeTab === 'weeks' && roadmap && (
          <WeeklyLogs 
            weeks={roadmap.weeks}
            weeklyLogs={weeklyLogs}
            getWeekProgress={getWeekProgress}
            setSelectedWeek={setSelectedWeek}
            setActiveTab={setActiveTab}
            profileSettings={profileSettings}
          />
        )}

        {activeTab === 'dsa-log' && (
          <DsaAttempts 
            dsaForm={dsaForm}
            dsaLogs={dsaLogs}
            handleAddDsaLog={handleAddDsaLog}
            handleDsaFormChange={handleDsaFormChange}
            handleDeleteDsaLog={handleDeleteDsaLog}
          />
        )}

        {activeTab === 'sources' && roadmap && (
          <Sources 
            sources={roadmap.sources}
            profileSettings={profileSettings}
          />
        )}

        {activeTab === 'leetcode' && (
          <LeetcodeHub 
            leetcodeUsername={leetcodeUsername}
            leetcodeStats={leetcodeStats}
            isLeetcodeLoading={isLeetcodeLoading}
            leetcodeError={leetcodeError}
            leetcodeGoal={leetcodeGoal}
            handleUpdateGoal={handleUpdateGoal}
            triggerLeetcodeSync={triggerLeetcodeSync}
            handleDisconnectLeetcode={handleDisconnectLeetcode}
            getWeeklyDsaCount={getWeeklyDsaCount}
            selectedWeek={selectedWeek}
            saveLeetcodeProfile={saveLeetcodeProfile}
            weeks={roadmap?.weeks || []}
          />
        )}

        {activeTab === 'neetcode' && (
          <NeetcodeRoadmap />
        )}

        {activeTab === 'checklist' && (
          <TufChecklist />
        )}

      </main>

      {/* MODALS */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-805 rounded-xl p-6 shadow-2xl space-y-4 relative animate-scale-in">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold font-display text-white tracking-wider uppercase">
                {authMode === 'login' ? 'Cloud Sign In' : 'Create Account'}
              </h3>
              <p className="text-[10px] text-zinc-500 tracking-wider font-mono">
                {authMode === 'login' ? 'SYNC YOUR STUDY PROGRESS TO CLOUD' : 'START BACKING UP YOUR MILESTONES'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              {authError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 rounded text-center leading-relaxed font-semibold">
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
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brass-light rounded-lg px-3 py-2 text-white focus:outline-none"
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
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brass-light rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSyncing}
                className="w-full py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)] disabled:opacity-50 cursor-pointer font-mono text-xs uppercase"
              >
                {isSyncing ? 'Connecting...' : authMode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-zinc-900">
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-[10px] text-brass-light font-semibold hover:underline cursor-pointer"
              >
                {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION ALERT WIPE MODAL */}
      <ResetConfirmModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={executeReset}
      />

      {/* FOOTER CONTROLS */}
      <footer className="w-full border-t border-zinc-850 bg-zinc-950 py-6 px-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 select-none">
        <p>© 2026 {profileSettings?.name || "Guest"}'s {roadmap?.weeks?.length || 16}-Week Personal Study Prep System.</p>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsResetModalOpen(true)} 
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40 active:scale-95 transition-all text-[10px] font-bold tracking-widest uppercase cursor-pointer font-mono"
          >
            <RefreshCw className="w-3 h-3" /> Factory Reset Tracker
          </button>
        </div>
      </footer>

      {/* TOAST FLOATING ALERTS */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-pulse-short select-none">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-zinc-950/95 border border-brass-light/40 text-xs text-zinc-200 rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.25)] backdrop-blur-md font-sans font-semibold">
            <span className="w-2 h-2 rounded-full bg-brass-light animate-ping" />
            <span>{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)}
              className="ml-2.5 text-zinc-500 hover:text-white font-mono text-sm leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
