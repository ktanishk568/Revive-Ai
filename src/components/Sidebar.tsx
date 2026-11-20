import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  ListOrdered,
  FileWarning,
  Users,
  BarChart3,
  BrainCircuit,
  GitFork,
  ShieldCheck,
  Activity,
  Settings,
  X,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Recovery Agent', path: '/ai-agent', icon: Cpu },
    { name: 'Recovery Queue', path: '/queue', icon: ListOrdered },
    { name: 'Failed Payments', path: '/failures', icon: FileWarning },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Revenue Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Insights', path: '/insights', icon: BrainCircuit },
    { name: 'Automations', path: '/automations', icon: GitFork },
    { name: 'AI Guardrails', path: '/guardrails', icon: ShieldCheck },
    { name: 'Activity Log', path: '/activity', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-[#1F3047] bg-[#081321] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-[#1F3047]">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#081321]">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-[#F8FAFC]">Revive<span className="text-[#3B82F6]">AI</span></span>
              <p className="text-[9px] text-[#64748B] uppercase tracking-widest font-semibold leading-none">Autonomous Agent</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-lg p-1 text-[#94A3B8] hover:bg-[#101D30] hover:text-[#F8FAFC] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl py-3 px-4 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#132744] text-[#F8FAFC] border-l-2 border-[#3B82F6] rounded-l-none pl-3.5 shadow-inner'
                      : 'text-[#94A3B8] hover:bg-[#101D30] hover:text-[#F8FAFC]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#60A5FA]' : 'text-[#64748B]'}`} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Workspace Info Footer */}
        <div className="border-t border-[#1F3047] p-4 bg-[#081321]/60">
          <div className="rounded-xl border border-[#1F3047] bg-[#0B1728] p-3">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs font-semibold text-emerald-400 font-display">Autonomous active</span>
            </div>
            <p className="mt-1 text-[11px] text-[#64748B] leading-snug">AI is analyzing payment failures in real-time.</p>
          </div>
        </div>
      </aside>
    </>
  );
};
