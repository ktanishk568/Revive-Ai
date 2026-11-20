import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, ShieldAlert, Cpu, 
  Sparkles, Zap, ArrowRight, Play, TrendingUp
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';
import { SimulationModal } from '../components/SimulationModal';

export const OverviewDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, activities, chartData } = useRecoveryState();
  const [activeFilter, setActiveFilter] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [simOpen, setSimOpen] = useState(false);

  // Quick stats configurations
  const cards = [
    {
      title: 'Revenue at Risk',
      value: `₹${stats.revenueAtRisk.toLocaleString()}`,
      change: '+18.4% vs last month',
      changeType: 'negative',
      icon: ShieldAlert,
      color: 'text-[#F59E0B] bg-[#2d1f06]/40 border-[#F59E0B]/20'
    },
    {
      title: 'Revenue Recovered',
      value: `₹${stats.revenueRecovered.toLocaleString()}`,
      change: '+24.1% vs last month',
      changeType: 'positive',
      icon: CheckCircle2,
      color: 'text-[#10B981] bg-[#0a291f]/40 border-[#10B981]/20'
    },
    {
      title: 'Recovery Rate',
      value: `${stats.recoveryRate}%`,
      change: '+4.2% since yesterday',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-[#3B82F6] bg-[#132744]/40 border-[#3B82F6]/20',
      progressBar: true
    },
    {
      title: 'Payments Recovered',
      value: stats.paymentsRecovered.toString(),
      change: '+12 recovered today',
      changeType: 'positive',
      icon: Zap,
      color: 'text-[#22D3EE] bg-[#0c2033]/40 border-[#22D3EE]/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Revenue Recovery Command Center</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">AI-powered visibility into revenue at risk and recovery opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSimOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#60A5FA] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="h-4 w-4 fill-current" />
            Run AI Simulation
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="premium-card p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{card.title}</span>
                  <h3 className="mt-1 font-numeric text-2xl font-bold text-white tracking-tight">{card.value}</h3>
                </div>
                <div className={`rounded-xl border p-2 ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                  card.changeType === 'positive' ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}>
                  {card.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {card.change}
                </span>
              </div>
              {card.progressBar && (
                <div className="mt-3.5 w-full bg-[#0B1728] rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-1.5 rounded-full" 
                    style={{ width: `${stats.recoveryRate}%` }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Secondary Stats Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#0c2033]/60 border border-[#22D3EE]/20 p-2.5 text-[#22D3EE]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-[#64748B]">Autonomous Actions Executed</span>
              <p className="text-lg font-numeric font-bold text-white mt-0.5">{stats.aiActions.toLocaleString()}</p>
            </div>
          </div>
          <span className="rounded bg-[#0c2033] px-2 py-0.5 text-[10px] font-semibold text-[#22D3EE] border border-[#22D3EE]/20">
            98.2% accuracy
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-900/20 p-2.5 text-emerald-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-[#64748B]">Average Recovery Duration</span>
              <p className="text-lg font-numeric font-bold text-white mt-0.5">{stats.avgRecoveryTime} Minutes</p>
            </div>
          </div>
          <span className="rounded bg-emerald-950/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-[#10B981]/20">
            Fast response
          </span>
        </div>
      </div>

      {/* Charts & Activity Split Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recharts chart card */}
        <div className="premium-card p-6 lg:col-span-2 space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h4 className="text-base font-bold text-white font-display">Revenue Recovery Over Time</h4>
              <p className="text-xs text-[#64748B] mt-0.5">Recovery outcomes tracked across financial cycles.</p>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-1 rounded-xl bg-[#0B1728] p-1 border border-[#1F3047]">
              {(['7D', '30D', '90D', '1Y'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeFilter === filter
                      ? 'bg-[#3B82F6] text-white shadow'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[activeFilter]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3047" opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v >= 100000 ? `${v/100000}L` : `${v/1000}k`}`} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Area type="monotone" name="Revenue Recovered" dataKey="Recovered" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRecovered)" />
                <Area type="monotone" name="Revenue at Risk" dataKey="At Risk" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Log */}
        <div className="premium-card p-6 flex flex-col h-[410px]">
          <div className="flex items-center justify-between border-b border-[#1F3047] pb-3.5 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-[#22D3EE] animate-pulse" />
              <h4 className="text-base font-bold text-white font-display">AI Agent Activity Log</h4>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            <AnimatePresence initial={false}>
              {activities.slice(0, 8).map((activity) => {
                // Determine bullet color based on category
                let bulletColor = 'bg-[#3B82F6]';
                if (activity.type === 'agent') bulletColor = 'bg-[#22D3EE]';
                if (activity.type === 'system') {
                  bulletColor = activity.message.includes('recovered') ? 'bg-[#10B981]' : 'bg-[#EF4444]';
                }

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3 text-xs leading-relaxed"
                  >
                    <div className={`mt-1.5 flex h-2 w-2 shrink-0 rounded-full ${bulletColor}`} />
                    <div className="space-y-0.5">
                      <p className="text-[#94A3B8]">{activity.message}</p>
                      <span className="block text-[9.5px] text-[#64748B]">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigate('/activity')}
            className="mt-4 flex items-center justify-center gap-1.5 w-full rounded-xl bg-[#101D30] py-2.5 text-xs font-semibold text-[#94A3B8] border border-[#1F3047] hover:bg-[#132744] hover:text-white transition-all"
          >
            Open Complete Logs
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Quick Shortcuts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div 
          onClick={() => navigate('/ai-agent')}
          className="group rounded-2xl border border-[#1F3047] bg-[#101D30]/20 p-5 hover:bg-[#132744]/40 hover:border-[#3B82F6]/30 cursor-pointer transition-all"
        >
          <Sparkles className="h-5 w-5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
          <h4 className="mt-3 text-sm font-bold text-white font-display">Manage AI Cases</h4>
          <p className="text-xs text-[#64748B] mt-1 leading-snug font-light">Review recommended actions, approve mandate swaps, or modify retries.</p>
        </div>
        <div 
          onClick={() => navigate('/automations')}
          className="group rounded-2xl border border-[#1F3047] bg-[#101D30]/20 p-5 hover:bg-[#132744]/40 hover:border-[#22D3EE]/30 cursor-pointer transition-all"
        >
          <Zap className="h-5 w-5 text-[#22D3EE] group-hover:scale-110 transition-transform" />
          <h4 className="mt-3 text-sm font-bold text-white font-display">Configure Automations</h4>
          <p className="text-xs text-[#64748B] mt-1 leading-snug font-light">Customize timing nodes, payment failure triggers, and messaging steps.</p>
        </div>
        <div 
          onClick={() => navigate('/guardrails')}
          className="group rounded-2xl border border-[#1F3047] bg-[#101D30]/20 p-5 hover:bg-[#132744]/40 hover:border-emerald-800/30 cursor-pointer transition-all"
        >
          <ShieldAlert className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <h4 className="mt-3 text-sm font-bold text-white font-display">Enforce Guardrails</h4>
          <p className="text-xs text-[#64748B] mt-1 leading-snug font-light">Control auto-retries limits, minimum confidence triggers, and approval limits.</p>
        </div>
      </div>

      {/* Global Simulation Wizard */}
      <SimulationModal isOpen={simOpen} onClose={() => setSimOpen(false)} />
    </div>
  );
};
export default OverviewDashboard;
