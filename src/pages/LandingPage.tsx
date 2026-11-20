import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Cpu, ShieldCheck, Zap, BarChart3, TrendingUp, CheckCircle, 
  Sparkles, Play, Award, CheckCircle2 
} from 'lucide-react';
import { SimulationModal } from '../components/SimulationModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [simOpen, setSimOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F8FAFC] overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-950/20 via-indigo-950/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f304708_1px,transparent_1px),linear-gradient(to_bottom,#1f304708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header bar */}
      <nav className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#081321]">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">Revive<span className="text-[#3B82F6]">AI</span></span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 rounded-xl bg-[#101D30] border border-[#1F3047] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#14243A]"
          >
            Launch Console
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Banner Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-950 bg-blue-950/20 px-3 py-1 text-xs text-blue-300 mb-6"
        >
          <Sparkles className="h-3 w-3 text-[#3B82F6]" />
          <span>Next-Generation Autonomous Recovery</span>
        </motion.div>

        {/* Hero title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.1] mb-6"
        >
          Recover Lost Revenue. <br/>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Automatically.</span>
        </motion.h1>

        {/* Hero description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          ReviveAI uses intelligent recovery workflows to identify failed payments, prioritize revenue opportunities, and recommend the best recovery action.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-[#60A5FA] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Launch Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button 
            onClick={() => setSimOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#101D30] border border-[#1F3047] px-6 py-3.5 text-sm font-semibold text-[#CBD5E1] hover:bg-[#14243A] hover:text-white hover:border-[#2A405D] transition-all"
          >
            <Play className="h-4 w-4 text-[#3B82F6]" />
            Try AI Demo Simulation
          </button>
        </motion.div>

        {/* Mock Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto max-w-5xl rounded-2xl border border-[#1F3047] bg-[#101D30]/60 p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Mock Dashboard Header */}
          <div className="flex items-center justify-between border-b border-[#1F3047] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-[10px] text-[#64748B] ml-2 font-mono">https://console.reviveai.io/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] text-emerald-400 font-semibold">Live Sandbox Mode</span>
            </div>
          </div>

          {/* Stats Preview Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Revenue at Risk</span>
              <h3 className="text-xl font-bold text-white mt-1 font-display">₹12,48,000</h3>
              <p className="text-[9px] text-[#EF4444] mt-1 flex items-center gap-1 font-semibold">
                +18.4% vs prev month
              </p>
            </div>
            <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Revenue Recovered</span>
              <h3 className="text-xl font-bold text-emerald-400 mt-1 font-display">₹8,32,500</h3>
              <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                +24.1% vs prev month
              </p>
            </div>
            <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Recovery Rate</span>
              <h3 className="text-xl font-bold text-white mt-1 font-display">66.7%</h3>
              <div className="w-full bg-[#101D30] rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full" style={{ width: '66.7%' }}></div>
              </div>
            </div>
            <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">AI Actions Run</span>
              <h3 className="text-xl font-bold text-[#22D3EE] mt-1 font-display">1,284</h3>
              <p className="text-[9px] text-[#22D3EE] mt-1 font-semibold">
                98.4% Accuracy rating
              </p>
            </div>
          </div>

          {/* Inline Agent Stream preview */}
          <div className="mt-4 rounded-xl border border-[#1F3047] bg-[#0B1728] p-4 text-left">
            <div className="flex items-center justify-between border-b border-[#1F3047] pb-2 mb-2">
              <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                AI Agent Live Stream
              </span>
              <span className="text-[10px] text-cyan-400 font-medium">Auto Mode</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs py-1 px-2 rounded bg-[#101D30]/20">
                <span className="text-[#94A3B8] font-mono">Case RP92831 (Rahul Sharma) declined. failure: Bank Decline.</span>
                <span className="text-cyan-400 font-medium font-mono">AI analyzing... (Confidence 91%)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 px-2 rounded bg-[#101D30]/20">
                <span className="text-[#94A3B8] font-mono">Bypassing standard route. Swapping gateway for corporate bin...</span>
                <span className="text-emerald-400 font-medium font-mono">Success. ₹7,999 recovered.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grids */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-[#1F3047] bg-[#0B1728]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-[#1F3047] bg-[#0B1728]/60">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Dynamic Smart Retries</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Never retry blindly. ReviveAI maps exact server codes and schedules attempts during low-traffic windows.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-[#1F3047] bg-[#0B1728]/60">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Gateway Redirection</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Automatically reroutes high-value transaction volumes to redundant bank terminals when primary pathways fail.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-[#1F3047] bg-[#0B1728]/60">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Risk Guardrails</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Total administrative control. Keep high-value transactions on hold until manual manager confirmation is provided.
            </p>
          </div>
        </div>
      </section>

      {/* Global simulation modal */}
      <SimulationModal isOpen={simOpen} onClose={() => setSimOpen(false)} />
    </div>
  );
};
export default LandingPage;
