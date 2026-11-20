import React, { useState } from 'react';
import { 
  ShieldCheck, RefreshCw, Key, Landmark, 
  Trash2, PlusCircle, Check 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';
import { generateRandomTransaction } from '../utils/simulation';

export const Settings: React.FC = () => {
  const { setTransactions, addActivity } = useRecoveryState();
  const [webhookUrl, setWebhookUrl] = useState('https://api.merchant.com/v1/revive-webhooks');
  const [toastMsg, setToastMsg] = useState('');

  const handleSaveMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg('Merchant profiles updated successfully.');
    addActivity('user', 'Merchant profile configuration changes saved.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleBulkGenerate = () => {
    setTransactions(prev => {
      const generated: any[] = [];
      for (let i = 0; i < 5; i++) {
        generated.push(generateRandomTransaction(i));
      }
      addActivity('user', `Bulk generated 5 failed transactions and added to review queue.`);
      return [...generated, ...prev];
    });
    setToastMsg('Added 5 new failures to queue.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleClearQueue = () => {
    setTransactions([]);
    addActivity('user', 'Manually cleared all records in recovery queue.');
    setToastMsg('Recovery queue cleared.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleResetState = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast message popup */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#1F3047] bg-[#0B1728] px-4 py-3 text-xs font-semibold text-emerald-400 shadow-xl flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Console Settings</h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-light">Configure workspace parameters, notification preferences, and API credentials.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Merchant & webhook details Form */}
        <div className="premium-card p-6 lg:col-span-2 space-y-6">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 border-b border-[#1F3047] pb-3">
            <Landmark className="h-4.5 w-4.5 text-[#3B82F6]" />
            Merchant Profile Details
          </h4>

          <form onSubmit={handleSaveMerchant} className="space-y-4 text-xs text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#64748B] uppercase font-semibold">Business Legal Name</label>
                <input 
                  type="text" 
                  defaultValue="Revive AI Sandbox Inc."
                  className="rounded-xl border border-[#1F3047] bg-[#0B1728] py-2.5 px-3.5 text-white outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#64748B] uppercase font-semibold">Support Contact Email</label>
                <input 
                  type="email" 
                  defaultValue="billing@reviveai.io"
                  className="rounded-xl border border-[#1F3047] bg-[#0B1728] py-2.5 px-3.5 text-white outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#64748B] uppercase font-semibold">Webhook URL for events notifications</label>
              <input 
                type="url" 
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full rounded-xl border border-[#1F3047] bg-[#0B1728] py-2.5 px-3.5 text-white outline-none focus:border-[#3B82F6] font-mono"
              />
              <p className="text-[10px] text-[#64748B] leading-normal font-light">Failed payment triggers and recovery success pings are dispatched to this destination.</p>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#3B82F6] px-4.5 py-2.5 font-bold text-white hover:bg-[#60A5FA] transition-all"
            >
              Update Merchant Profile
            </button>
          </form>
        </div>

        {/* Sandbox Dev tools */}
        <div className="premium-card p-6 space-y-6">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 border-b border-[#1F3047] pb-3">
            <Key className="h-4.5 w-4.5 text-[#22D3EE]" />
            Developer Mocks
          </h4>

          <div className="space-y-4">
            {/* Generate failures */}
            <div className="flex justify-between items-center bg-[#101D30]/40 p-3.5 rounded-xl border border-[#1F3047]">
              <div className="space-y-0.5 text-left">
                <span className="text-xs font-semibold text-gray-300 block">Queue Injector</span>
                <span className="text-[9.5px] text-[#64748B] leading-tight block font-light">Simulate 5 new random declines</span>
              </div>
              <button
                onClick={handleBulkGenerate}
                className="rounded-lg p-1.5 bg-[#0B1728] border border-[#1F3047] text-[#22D3EE] hover:bg-[#14243A] hover:text-cyan-300"
              >
                <PlusCircle className="h-4 w-4" />
              </button>
            </div>

            {/* Clear table */}
            <div className="flex justify-between items-center bg-[#101D30]/40 p-3.5 rounded-xl border border-[#1F3047]">
              <div className="space-y-0.5 text-left">
                <span className="text-xs font-semibold text-gray-300 block">Purge Data</span>
                <span className="text-[9.5px] text-[#64748B] leading-tight block font-light">Empty transaction queue logs</span>
              </div>
              <button
                onClick={handleClearQueue}
                className="rounded-lg p-1.5 bg-[#0B1728] border border-[#1F3047] text-[#EF4444] hover:bg-[#14243A] hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Reset state */}
            <div className="flex justify-between items-center bg-[#101D30]/40 p-3.5 rounded-xl border border-[#1F3047]">
              <div className="space-y-0.5 text-left">
                <span className="text-xs font-semibold text-gray-300 block">Reset Sandbox</span>
                <span className="text-[9.5px] text-[#64748B] leading-tight block font-light">Restore original database models</span>
              </div>
              <button
                onClick={handleResetState}
                className="rounded-lg p-1.5 bg-[#0B1728] border border-[#1F3047] text-[#3B82F6] hover:bg-[#14243A] hover:text-blue-300"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Settings;
