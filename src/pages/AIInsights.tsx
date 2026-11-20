import React, { useState } from 'react';
import { 
  Check, Zap 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const AIInsights: React.FC = () => {
  const { insights } = useRecoveryState();
  const [activeTab, setActiveTab] = useState<'all' | 'segment' | 'channel' | 'timing'>('all');
  const [appliedInsights, setAppliedInsights] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  const filteredInsights = activeTab === 'all'
    ? insights
    : insights.filter(ins => ins.category === activeTab);

  const handleApply = (id: string, title: string) => {
    if (appliedInsights.includes(id)) return;
    setAppliedInsights(prev => [...prev, id]);
    setToastMsg(`Applied recommendation: "${title}"`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast message popup */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#1F3047] bg-[#0B1728] px-4 py-3 text-xs font-semibold text-emerald-400 shadow-xl flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">AI Insights & Optimization</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">Autonomous recommendations derived from system failure trends and BIN metrics.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1F3047] pb-3">
        {(['all', 'segment', 'channel', 'timing'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? 'bg-[#132744] text-[#60A5FA] border border-[#3B82F6]/30'
                : 'text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            {tab === 'all' ? 'All Findings' : tab}
          </button>
        ))}
      </div>

      {/* Insights Cards list */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredInsights.map((insight) => {
          const isApplied = appliedInsights.includes(insight.id);
          return (
            <div 
              key={insight.id}
              className={`premium-card p-6 flex flex-col justify-between h-[360px] border transition-all ${
                isApplied ? 'border-[#10B981]/30 glow-success' : 'hover:border-[#3B82F6]/30'
              }`}
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <span className={`rounded px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${
                    insight.category === 'segment' ? 'bg-[#132744]/40 text-[#60A5FA] border border-[#3B82F6]/20' :
                    insight.category === 'channel' ? 'bg-[#0c2033]/40 text-[#22D3EE] border border-[#22D3EE]/20' :
                    'bg-[#0a291f]/40 text-emerald-400 border border-[#10B981]/20'
                  }`}>
                    {insight.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#64748B]">
                    <span>Confidence:</span>
                    <span className="font-bold text-white">{insight.confidence}%</span>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-2 text-left">
                  <h4 className="text-sm font-bold text-white font-display leading-snug">{insight.title}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-light">{insight.description}</p>
                </div>
              </div>

              {/* Impact summary & Action trigger */}
              <div className="mt-6 border-t border-[#1F3047] pt-4 space-y-4">
                <div className="flex justify-between items-center bg-[#0B1728] p-2.5 rounded-lg border border-[#1F3047]">
                  <span className="text-[10px] text-[#64748B] uppercase font-semibold">Projected Gain</span>
                  <span className="text-xs font-bold text-[#10B981]">{insight.impact}</span>
                </div>
                
                <button
                  onClick={() => handleApply(insight.id, insight.title)}
                  disabled={isApplied}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                    isApplied 
                      ? 'bg-[#0a291f]/40 text-[#10B981] border-[#10B981]/20 cursor-not-allowed'
                      : 'bg-[#3B82F6] text-white hover:bg-[#60A5FA] border-transparent'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Applied to Workflow
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Apply Configuration
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AIInsights;
