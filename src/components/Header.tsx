import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown, Cpu, Sparkles, Check } from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { activities, transactions, stats } = useRecoveryState();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState('Revive AI Sandbox');

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const merchantRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (merchantRef.current && !merchantRef.current.contains(event.target as Node)) {
        setShowMerchantDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter transactions and customers based on search query
  const filteredTransactions = searchQuery
    ? transactions.filter(tx => 
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.failureReason.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchResultClick = (txId: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/queue?search=${txId}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#1F3047] bg-[#0B1728]/95 px-6 backdrop-blur-md">
      {/* Mobile Toggle & Merchant Info */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#101D30] hover:text-[#F8FAFC] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Merchant Selector */}
        <div className="relative" ref={merchantRef}>
          <button 
            onClick={() => setShowMerchantDropdown(!showMerchantDropdown)}
            className="flex items-center gap-2 rounded-xl border border-[#1F3047] bg-[#101D30]/40 px-3.5 py-1.5 text-sm font-medium text-[#F8FAFC] transition-all hover:bg-[#14243A]/60"
          >
            <span>{selectedMerchant}</span>
            <ChevronDown className="h-4 w-4 text-[#64748B]" />
          </button>

          {showMerchantDropdown && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl border border-[#1F3047] bg-[#0B1728] p-1.5 shadow-2xl">
              {['Revive AI Sandbox', 'Acme E-Commerce Ltd', 'PixelCraft Studios'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMerchant(m);
                    setShowMerchantDropdown(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3.5 py-2 text-left text-sm text-[#94A3B8] hover:bg-[#101D30] hover:text-[#F8FAFC]"
                >
                  <span>{m}</span>
                  {selectedMerchant === m && <Check className="h-4 w-4 text-[#3B82F6]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Interactive Search Command Center */}
      <div className="hidden max-w-md flex-1 px-8 md:block relative" ref={searchRef}>
        <div className="relative w-full">
          <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search transactions, customers, reasons..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            className="w-full rounded-xl border border-[#1F3047] bg-[#101D30] py-2 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6] focus:bg-[#14243A] focus:ring-1 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && searchQuery && (
          <div className="absolute left-8 right-8 mt-2 rounded-xl border border-[#1F3047] bg-[#0B1728] p-2 shadow-2xl max-h-80 overflow-y-auto z-40">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Quick Searches</p>
            {filteredTransactions.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-[#64748B]">No matching records found</p>
            ) : (
              filteredTransactions.map(tx => (
                <button
                  key={tx.id}
                  onClick={() => handleSearchResultClick(tx.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-[#101D30] transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#F8FAFC]">{tx.customerName}</p>
                    <p className="text-[10px] text-[#64748B]">{tx.id} • {tx.failureReason} • {tx.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">₹{tx.amount.toLocaleString()}</p>
                    <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      tx.status === 'Recovered' ? 'bg-emerald-950/40 text-emerald-400' :
                      tx.status === 'Failed' ? 'bg-rose-950/40 text-rose-400' :
                      'bg-amber-950/40 text-amber-400'
                    }`}>{tx.status}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Control Tools, Notifications & Avatar */}
      <div className="flex items-center gap-4">
        {/* Active Chip */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-900 bg-emerald-950/20 px-3 py-1 text-xs text-emerald-400 md:flex shadow-[0_0_8px_rgba(16,185,129,0.15)]">
          <Cpu className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
          <span className="font-semibold">AI Agent Active</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-2 text-[#94A3B8] hover:bg-[#14243A]/60 hover:text-[#F8FAFC]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#3B82F6] animate-ping"></span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#3B82F6]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#1F3047] bg-[#0B1728] p-2 shadow-2xl z-40 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#1F3047] px-3 py-2">
                <span className="text-xs font-bold text-[#F8FAFC]">System Logs & Activities</span>
                <span className="rounded bg-[#132744] px-1.5 py-0.5 text-[10px] font-semibold text-[#60A5FA]">Live</span>
              </div>
              <div className="mt-1 divide-y divide-[#1F3047]">
                {activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="px-3 py-2.5 hover:bg-[#101D30]/40 transition-colors">
                    <p className="text-xs text-[#94A3B8] leading-snug">{act.message}</p>
                    <span className="mt-1 block text-[9px] text-[#64748B]">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/activity');
                }}
                className="mt-1 block w-full rounded-lg bg-[#101D30] py-2 text-center text-[11px] font-semibold text-[#94A3B8] hover:bg-[#132744] hover:text-[#F8FAFC] transition-colors"
              >
                View Complete Log
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <button 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-3 border-l border-[#1F3047] pl-4 cursor-pointer hover:opacity-80 active:scale-95 transition-all outline-none"
        >
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0B1728] font-display text-xs font-bold text-white">
              TK
            </div>
          </div>
          <div className="hidden flex-col text-left md:flex">
            <span className="text-xs font-semibold text-[#F8FAFC]">Tanishk Kumar</span>
            <span className="text-[10px] text-[#64748B]">Risk Manager</span>
          </div>
        </button>
      </div>
    </header>
  );
};
