import React from 'react';
import { ExternalLink, Info, BookOpen, Target, FileText, Zap, Award } from 'lucide-react';
import { SYLLABUS_OPTIONS } from '../data/roadmapGenerator';

const ICONS = {
  Award: Award,
  BookOpen: BookOpen,
  Zap: Zap,
  FileText: FileText,
  Target: Target
};

export default function Sources({ sources, profileSettings }) {
  const userName = profileSettings?.name || "Guest";
  
  // Create a mapping of section IDs to human readable names and colors
  const sectionMetaMap = {};
  SYLLABUS_OPTIONS.forEach(opt => {
    sectionMetaMap[opt.id] = { name: opt.name, color: opt.color, icon: opt.icon };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md">
        <h2 className="text-lg font-bold font-display text-white">Study Library & Learning Center</h2>
        <p className="text-xs text-zinc-400 mt-1">Consolidated learning material sources tailored to your custom routine. Stick to these, avoid switching resources mid-way.</p>
      </div>

      {/* DYNAMIC SOURCES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(sources || {}).map(([key, list]) => {
          const meta = sectionMetaMap[key] || { 
            name: key.toUpperCase() + " Prep", 
            color: "text-brass-light", 
            icon: "BookOpen" 
          };
          const IconComp = ICONS[meta.icon] || BookOpen;

          if (!list || list.length === 0) return null;

          return (
            <div key={key} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                <span className={`p-1.5 rounded bg-zinc-900 border border-zinc-800/80 ${meta.color}`}>
                  <IconComp className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">{meta.name}</h3>
              </div>

              <div className="space-y-4">
                {list.map((s, idx) => (
                  <div key={idx} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between min-h-[160px]">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white leading-tight font-display">{s.title}</h4>
                        {s.recommended && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-brass-glow/20 text-brass-light border border-brass-light/30 uppercase font-mono tracking-wider font-semibold font-bold">REC</span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{s.description}</p>
                    </div>
                    <a 
                      href={s.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-[10px] font-bold text-brass-light tracking-wider uppercase transition-all cursor-pointer font-mono"
                    >
                      Open Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint cognitive checks */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 shadow-lg backdrop-blur-md">
        <h3 className="text-sm font-bold font-display text-white mb-3 tracking-wider uppercase flex items-center gap-2">
          <Info className="w-4 h-4 text-brass-light" /> {userName}'s Daily Checklist Action Loops
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
  );
}
