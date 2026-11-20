import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Check, X, Sparkles, ChevronRight, 
  CheckCircle2, RotateCcw
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const AIRecoveryAgent: React.FC = () => {
  const { 
    transactions, approveTransaction, rejectTransaction, modifyTransaction,
    scenarioResults, activeScenarioId, runScenario, advanceScenarioStep
  } = useRecoveryState();

  // Find cases that need review
  const pendingCases = transactions.filter(tx => tx.status === 'Needs Review');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const currentCase = pendingCases[currentIndex] || null;

  const handleApprove = () => {
    if (!currentCase) return;
    approveTransaction(currentCase.id);
    setSuccessMsg('Recovery action scheduled successfully!');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      // Advance to next index
      if (currentIndex < pendingCases.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 1500);
  };

  const handleReject = () => {
    if (!currentCase) return;
    rejectTransaction(currentCase.id);
    setSuccessMsg('Case rejected. AI recovery terminated.');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      if (currentIndex < pendingCases.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 1500);
  };

  const handleModify = (newAction: string) => {
    if (!currentCase) return;
    modifyTransaction(currentCase.id, newAction);
  };

  return (
    <div className="space-y-6">
      {/* Header and Agent Status */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">AI Recovery Agent</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">Autonomous decision systems recovering transactions 24/7.</p>
        </div>
        <div className="flex items-center gap-2.5 rounded-full border border-emerald-900 bg-emerald-950/20 px-4.5 py-1.5 text-sm text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
          <span className="font-bold tracking-wide font-display">Autonomous Mode Active</span>
        </div>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#1F3047] bg-[#0B1728]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Cases Analyzed Today</span>
          <p className="text-xl font-numeric font-bold text-white mt-1">184</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#0B1728]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Recovery Opportunities</span>
          <p className="text-xl font-numeric font-bold text-[#22D3EE] mt-1">67</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#0B1728]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Actions Recommended</span>
          <p className="text-xl font-numeric font-bold text-[#3B82F6] mt-1">42</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#0B1728]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Revenue Recovered Today</span>
          <p className="text-xl font-numeric font-bold text-emerald-400 mt-1">₹1,84,500</p>
        </div>
      </div>

      {/* Main Grid split: Visualizer Left + Case Analysis Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Animated AI Brain Orb Visualizer */}
        <div className="premium-card p-6 flex flex-col items-center justify-center text-center lg:col-span-5 relative overflow-hidden h-[450px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
          
          {/* Animated Concentric Rings & SVG Grid */}
          <div className="relative flex h-56 w-56 items-center justify-center">
            {/* SVG Background Radar Grid */}
            <svg className="absolute inset-0 h-full w-full opacity-45 text-[#1F3047]" fill="none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d="M 50 2 L 50 98 M 2 50 L 98 50" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
            </svg>
            
            {/* Orbiting particles/nodes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute top-0 h-2 w-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
              <div className="absolute bottom-0 h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 flex items-center justify-center"
            >
              <div className="absolute left-0 h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
            </motion.div>

            {/* Glowing Core with glassmorphic style */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#1F3047] bg-[#101D30]/85 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="absolute inset-2.5 rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-[#22D3EE]/10 animate-pulse" />
              <Cpu className="h-9 w-9 text-[#22D3EE] relative z-10" />
            </div>
          </div>

          <div className="mt-6 z-10 max-w-xs">
            <h4 className="text-base font-bold text-white font-display">AI Engine Computing</h4>
            <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-light">
              Synthesizing historical BIN data, gateway latency, and payment methods to predict checkout recovery triggers.
            </p>
          </div>
        </div>

        {/* Case Analysis card */}
        <div className="premium-card p-6 lg:col-span-7 flex flex-col justify-between h-[450px] relative text-left">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="h-12 w-12 rounded-full bg-[#0a291f] border border-[#10B981]/25 flex items-center justify-center text-[#10B981]">
                  <Check className="h-6 w-6 font-bold" />
                </div>
                <h4 className="text-lg font-bold text-white">{successMsg}</h4>
                <p className="text-xs text-[#64748B]">Global ledger statistics have updated.</p>
              </motion.div>
            ) : currentCase ? (
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start border-b border-[#1F3047] pb-3">
                  <div>
                    <span className="text-[10px] text-[#22D3EE] font-bold tracking-wider uppercase">Active Evaluation</span>
                    <h3 className="text-lg font-bold text-white font-display">{currentCase.customerName}</h3>
                    <p className="text-[11px] text-[#64748B] font-numeric">{currentCase.customerEmail} • {currentCase.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#64748B]">Transaction Value</span>
                    <p className="text-lg font-numeric font-bold text-white">₹{currentCase.amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Technical Parameters */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-2.5">
                    <span className="text-[9px] uppercase text-[#64748B]">Failure Trigger</span>
                    <p className="text-xs font-semibold text-rose-400 mt-0.5">{currentCase.failureReason}</p>
                  </div>
                  <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-2.5">
                    <span className="text-[9px] uppercase text-[#64748B]">AI Confidence</span>
                    <p className="text-xs font-numeric font-semibold text-[#22D3EE] mt-0.5">{currentCase.aiConfidence}%</p>
                  </div>
                  <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-2.5">
                    <span className="text-[9px] uppercase text-[#64748B]">Recovery Odds</span>
                    <p className="text-xs font-numeric font-semibold text-emerald-400 mt-0.5">{currentCase.recoveryProbability}%</p>
                  </div>
                </div>

                {/* AI Recommendation Business Explanation */}
                <div className="rounded-xl border border-[#1F3047] bg-[#101D30] p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#22D3EE] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Recommendation reasoning
                  </span>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed font-light">
                    "The customer has a strong previous payment history and the failure is consistent with a temporary {currentCase.failureReason.toLowerCase()}. A {currentCase.recommendedAction.toLowerCase()} has a high expected recovery probability."
                  </p>
                </div>

                {/* Modify Action Option Block */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#64748B] uppercase font-semibold">Alter Action:</span>
                  <div className="flex gap-1.5">
                    {['Delayed retry', 'WhatsApp recovery link', 'Email link'].map((act) => (
                      <button
                        key={act}
                        onClick={() => handleModify(act)}
                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all cursor-pointer ${
                          currentCase.recommendedAction === act
                            ? 'bg-[#132744] text-[#F8FAFC] border border-[#3B82F6]'
                            : 'bg-[#0B1728] text-[#94A3B8] hover:text-[#F8FAFC] border border-transparent'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Approve/Reject Controls */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleReject}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-transparent border border-[#2A405D] py-3 text-xs font-semibold text-[#CBD5E1] hover:bg-[#101D30] transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                    Reject Recommendation
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3 text-xs font-semibold text-white hover:bg-[#60A5FA] shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
                  >
                    <Check className="h-4 w-4" />
                    Approve Recovery Action
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                <h4 className="text-base font-bold text-white">All pending reviews cleared!</h4>
                <p className="text-xs text-[#64748B] max-w-xs leading-normal font-light">
                  The AI is autonomous and handles recoveries in the background. You can trigger new transactions using simulation mode.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-xl border border-[#1F3047] bg-[#101D30] px-3.5 py-1.5 text-xs text-[#94A3B8] flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Demo
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Scenario Sandbox */}
      <div className="premium-card p-6 space-y-6">
        <div className="text-left">
          <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-[#22D3EE]" />
            Try ReviveAI — Live Demo Sandbox
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5 font-light">Select a scenario to trigger and monitor an end-to-end simulated AI recovery loop.</p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: 'scenario-1', title: 'Failed Card Payment', desc: 'Temporary bank decline on ₹7,999 premium charge.', value: 7999, reason: 'Bank Decline' },
            { id: 'scenario-2', title: 'Abandoned Checkout', desc: 'UPI session timeout on ₹2,499 order.', value: 2499, reason: 'Timeout' },
            { id: 'scenario-3', title: 'Subscription Mandate', desc: 'Insufficient credit limit on ₹4,999 mandate renewal.', value: 4999, reason: 'Insufficient Funds' },
            { id: 'scenario-4', title: 'High-Value Payment', desc: '₹45,000 checkout decline exceeding autonomous limits.', value: 45000, reason: 'Bank Limit' },
          ].map((sc) => {
            const result = scenarioResults[sc.id];
            const isCurrent = activeScenarioId === sc.id;

            return (
              <div 
                key={sc.id}
                onClick={() => {
                  if (result.status === 'running') return;
                  runScenario(sc.id);
                }}
                className={`rounded-xl border p-4 text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-[#3B82F6] bg-[#132744]/40'
                    : result.status === 'completed'
                    ? 'border-[#10B981]/20 bg-[#0a291f]/40 text-[#10B981]'
                    : 'border-[#1F3047] bg-[#0B1728]/40 hover:border-[#2A405D]'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <h5 className="text-xs font-bold text-white font-display leading-tight">{sc.title}</h5>
                  {result.status === 'completed' && (
                    <span className="rounded bg-[#0a291f] px-1 py-0.25 text-[8.5px] font-bold text-[#10B981] border border-[#10B981]/20 uppercase font-numeric">Success</span>
                  )}
                  {result.status === 'running' && (
                    <span className="rounded bg-[#132744] px-1 py-0.25 text-[8.5px] font-bold text-[#3B82F6] border border-[#3B82F6]/20 uppercase animate-pulse">Running</span>
                  )}
                </div>
                <p className="text-[10px] text-[#94A3B8] mt-1 leading-normal font-light">{sc.desc}</p>
                <div className="mt-3.5 flex justify-between items-center text-[10px]">
                  <span className="text-[#64748B] font-semibold uppercase">{sc.reason}</span>
                  <span className="font-numeric font-bold text-white">₹{sc.value.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Scenario Console */}
        {activeScenarioId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#1F3047] bg-[#0B1728]/40 p-5 space-y-4"
          >
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-[#1F3047] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-ping"></span>
                <span className="text-xs font-semibold text-gray-200">Terminal Process Console</span>
              </div>
              
              {scenarioResults[activeScenarioId].status === 'running' && (
                <button
                  onClick={() => advanceScenarioStep(activeScenarioId)}
                  className="rounded-lg bg-[#3B82F6] px-3 py-1.5 text-[10.5px] font-semibold text-white hover:bg-[#60A5FA] flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Terminal output log */}
            <div className="rounded-xl border border-[#1F3047] bg-[#07111F] p-4.5 font-mono text-[11px] leading-relaxed space-y-2.5 h-44 overflow-y-auto scrollbar-thin text-left shadow-inner">
              {scenarioResults[activeScenarioId].log.map((logLine: string, idx: number) => {
                let color = 'text-[#94A3B8]';
                if (logLine.startsWith('[DETECT]')) color = 'text-[#F59E0B]';
                if (logLine.startsWith('[ANALYZE]')) color = 'text-[#22D3EE]';
                if (logLine.startsWith('[PREDICT]')) color = 'text-[#22D3EE]';
                if (logLine.startsWith('[DECIDE]')) color = 'text-[#3B82F6]';
                if (logLine.startsWith('[EXECUTE]')) color = 'text-amber-400';
                if (logLine.startsWith('[COMPLETE]')) color = 'text-[#10B981] font-semibold';

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#64748B] select-none font-numeric text-[10px] w-4 text-right">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className={`${color} font-mono`}>{logLine}</span>
                  </div>
                );
              })}
              {scenarioResults[activeScenarioId].status === 'running' && (
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] select-none font-numeric text-[10px] w-4 text-right">~</span>
                  <span className="text-[#22D3EE]/60 animate-pulse text-[10px] italic font-mono">
                    Waiting for step action... (Click "Next Step" to advance)
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default AIRecoveryAgent;
