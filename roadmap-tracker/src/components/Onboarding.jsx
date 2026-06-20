import React, { useState } from 'react';
import { 
  SYLLABUS_OPTIONS, 
  DAYS_OF_WEEK 
} from '../data/roadmapGenerator';
import { 
  Target, 
  Award, 
  BookOpen, 
  Zap, 
  Calendar, 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Info,
  User,
  FileText
} from 'lucide-react';

const ICONS = {
  Award: Award,
  BookOpen: BookOpen,
  Zap: Zap,
  FileText: FileText,
  Target: Target
};

export default function Onboarding({ onComplete, initialSettings = null }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialSettings?.name || '');
  const [targetRole, setTargetRole] = useState(initialSettings?.targetRole || 'Full-Stack Engineer');
  const [weeksCount, setWeeksCount] = useState(initialSettings?.weeksCount || 12);
  const [studyDays, setStudyDays] = useState(initialSettings?.studyDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [syllabus, setSyllabus] = useState(initialSettings?.syllabus || ['dsa', 'cs']);
  const [customSubjects, setCustomSubjects] = useState(initialSettings?.customSubjects || []);
  const [customSubInput, setCustomSubInput] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState(initialSettings?.leetcodeUsername || '');

  const toggleDay = (dayId) => {
    if (studyDays.includes(dayId)) {
      if (studyDays.length > 1) {
        setStudyDays(studyDays.filter(d => d !== dayId));
      }
    } else {
      setStudyDays([...studyDays, dayId]);
    }
  };

  const toggleSyllabus = (syllId) => {
    if (syllabus.includes(syllId)) {
      setSyllabus(syllabus.filter(s => s !== syllId));
    } else {
      setSyllabus([...syllabus, syllId]);
    }
  };

  const addCustomSubject = (e) => {
    e.preventDefault();
    const val = customSubInput.trim();
    if (val && !customSubjects.includes(val)) {
      setCustomSubjects([...customSubjects, val]);
      setCustomSubInput('');
    }
  };

  const removeCustomSubject = (sub) => {
    setCustomSubjects(customSubjects.filter(c => c !== sub));
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    const settings = {
      name: name.trim(),
      targetRole: targetRole.trim(),
      weeksCount: parseInt(weeksCount) || 12,
      studyDays,
      syllabus,
      customSubjects,
      leetcodeUsername: leetcodeUsername.trim()
    };
    onComplete(settings);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background ambient glows */}
      <div className="absolute left-1/4 -top-24 w-48 h-48 bg-brass-glow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 -bottom-24 w-48 h-48 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="glass-reflection absolute inset-0 rounded-2xl" />

      {/* STEP PROGRESS BAR */}
      <div className="relative z-10 mb-8">
        <div className="flex justify-between items-center text-xs text-zinc-500 font-mono uppercase tracking-wider mb-2">
          <span>Profile Configuration Wizard</span>
          <span>Step {step} of 4</span>
        </div>
        <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden flex gap-0.5">
          <div className={`h-full transition-all duration-300 ${step >= 1 ? 'bg-brass-light flex-1' : 'bg-zinc-800'}`} />
          <div className={`h-full transition-all duration-300 ${step >= 2 ? 'bg-brass-light flex-1' : 'bg-zinc-800'}`} />
          <div className={`h-full transition-all duration-300 ${step >= 3 ? 'bg-brass-light flex-1' : 'bg-zinc-800'}`} />
          <div className={`h-full transition-all duration-300 ${step >= 4 ? 'bg-brass-light flex-1' : 'bg-zinc-800'}`} />
        </div>
      </div>

      {/* STEP 1: IDENTITY & TARGET */}
      {step === 1 && (
        <div className="space-y-6 relative z-10 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
              <User className="w-5 h-5 text-brass-light" />
              Who is this roadmap for?
            </h2>
            <p className="text-xs text-zinc-400">Personalize your tracker space. This will replace the hardcoded "Himanshu" defaults.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                required
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brass-light text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Target Role / Goal</label>
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Lead Full-Stack Engineer"
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brass-light text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition-all font-sans"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!name.trim()}
              className="px-6 py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              Configure Schedule
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYLLABUS & CUSTOM SUBJECTS */}
      {step === 2 && (
        <div className="space-y-6 relative z-10 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-neon-cyan" />
              Tailor Your Syllabus
            </h2>
            <p className="text-xs text-zinc-400">Select what you want to track on this roadmap. Unchecked subjects will be excluded from your routine.</p>
          </div>

          {/* Syllabus Checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYLLABUS_OPTIONS.map((option) => {
              const IconComp = ICONS[option.icon];
              const isChecked = syllabus.includes(option.id);
              return (
                <div 
                  key={option.id}
                  onClick={() => toggleSyllabus(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                    isChecked 
                      ? 'bg-zinc-900/80 border-brass-light/50 shadow-[0_0_15px_rgba(217,119,6,0.05)]' 
                      : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700/80'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-zinc-900 border ${isChecked ? 'border-brass-light/30' : 'border-zinc-800'} ${option.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-semibold text-white block">{option.name}</span>
                    <span className="text-[10px] text-zinc-500 block">Progressive study mapping for interviews.</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Subjects Input */}
          <div className="space-y-3 pt-2">
            <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Additional Custom Focus Subjects</label>
            <form onSubmit={addCustomSubject} className="flex gap-2">
              <input 
                type="text" 
                value={customSubInput}
                onChange={(e) => setCustomSubInput(e.target.value)}
                placeholder="e.g. iOS Development, Web3 Fundamentals"
                className="flex-1 bg-zinc-900/60 border border-zinc-800 focus:border-brass-light text-white rounded-lg px-3 py-2 text-xs focus:outline-none transition-all font-sans"
              />
              <button 
                type="submit"
                className="px-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </form>

            {/* Custom Subject Chips */}
            {customSubjects.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {customSubjects.map(sub => (
                  <span 
                    key={sub}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 pl-2.5 pr-1.5 py-1 rounded-full uppercase font-mono tracking-wider"
                  >
                    {sub}
                    <button 
                      type="button" 
                      onClick={() => removeCustomSubject(sub)}
                      className="p-0.5 text-zinc-500 hover:text-red-400 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="pt-4 flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={syllabus.length === 0 && customSubjects.length === 0}
              className="px-6 py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              Schedule Routine
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DURATION & STUDY DAYS */}
      {step === 3 && (
        <div className="space-y-6 relative z-10 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neon-purple" />
              Duration & Daily Routine
            </h2>
            <p className="text-xs text-zinc-400">Specify your weekly commitment and choose which days of the week you plan to study.</p>
          </div>

          {/* Weeks Count Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Roadmap Duration</label>
              <span className="text-xs font-bold text-brass-light font-mono bg-brass-glow/15 px-2 py-0.5 rounded border border-brass-light/30">{weeksCount} Weeks</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {[4, 8, 12, 16].map((wOption) => (
                <button
                  key={wOption}
                  type="button"
                  onClick={() => setWeeksCount(wOption)}
                  className={`py-3.5 text-center rounded-xl border transition-all cursor-pointer font-display font-bold ${
                    weeksCount === wOption
                      ? 'bg-brass-glow/20 border-brass-light text-white shadow-[0_0_15px_rgba(217,119,6,0.1)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className="text-sm block">{wOption}</span>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500">Weeks</span>
                </button>
              ))}
            </div>
          </div>

          {/* Study Days Selector */}
          <div className="space-y-3">
            <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Weekly Routine Days</label>
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = studyDays.includes(day.id);
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    className={`py-3 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brass-glow/20 border-brass-light text-brass-light'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                    title={day.name}
                  >
                    {day.id}
                  </button>
                );
              })}
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg text-[10px] text-zinc-500 flex gap-2 leading-relaxed">
              <Info className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
              <span>We will adapt your weekly roadmap automatically to assign tasks only on your selected study days. Unselected days will be designated as rest/buffer slots.</span>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="pt-4 flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 active:scale-95 transition-all text-xs flex items-center gap-2 cursor-pointer"
            >
              Telemetry Sync
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: LEETCODE TELEMETRY */}
      {step === 4 && (
        <div className="space-y-6 relative z-10 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              LeetCode Integration
            </h2>
            <p className="text-xs text-zinc-400">Sync solved problem telemetry from LeetCode. You can skip this and link it later.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">LeetCode Handle / Username (Optional)</label>
              <input 
                type="text" 
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                placeholder="e.g. coding_grind_hero"
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brass-light text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition-all font-mono"
              />
            </div>
            
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2 text-[11px] text-zinc-400 leading-normal">
              <div className="flex items-center gap-2 font-semibold text-brass-light text-xs">
                <Info className="w-4 h-4 shrink-0" />
                <span>Critical Notice for Live Sync</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-zinc-500">
                <li>Verify your LeetCode username matches the <strong className="text-zinc-400">exact casing</strong> in your LeetCode profile URL (e.g. <code>himanshu_codes</code>).</li>
                <li>Because public CORS APIs can occasionally experience slowdowns or rate limits, we provide a <strong className="text-zinc-400">Manual Entry Toggle</strong> inside the LeetCode dashboard so you are never blocked from updating your solve count.</li>
              </ul>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="pt-4 flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-brass-glow text-white font-bold rounded-lg hover:bg-brass-glow/90 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] active:scale-95 transition-all text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider font-display"
            >
              <Sparkles className="w-4 h-4" />
              Generate Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
