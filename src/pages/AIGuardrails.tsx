import React, { useState } from 'react';
import { 
  ShieldCheck, Settings, UserCheck, AlertOctagon 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const AIGuardrails: React.FC = () => {
  const { guardrails, updateGuardrails } = useRecoveryState();
  const [toastMsg, setToastMsg] = useState('');

  // Toggles handler
  const handleToggle = (key: keyof typeof guardrails) => {
    const newVal = !guardrails[key];
    updateGuardrails({ [key]: newVal });
    setToastMsg(`Guardrail configuration updated.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Sliders handler
  const handleRangeChange = (key: keyof typeof guardrails, val: number) => {
    updateGuardrails({ [key]: val });
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast message popup */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#1F3047] bg-[#0B1728] px-4 py-3 text-xs font-semibold text-[#60A5FA] shadow-xl flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#3B82F6]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">AI Guardrails & Limits</h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-light">Regulate autonomous agent thresholds, communication channels, and approval boundaries.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Core Controls */}
        <div className="premium-card p-6 lg:col-span-2 space-y-6">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 border-b border-[#1F3047] pb-3">
            <Settings className="h-4.5 w-4.5 text-[#3B82F6]" />
            Autonomous Actions Toggles
          </h4>

          <div className="space-y-4 divide-y divide-[#1F3047]">
            {/* Toggle 1: Auto Retry */}
            <div className="flex items-center justify-between pt-4 first:pt-0">
              <div className="space-y-1 max-w-md pr-4 text-left">
                <h5 className="text-xs font-semibold text-gray-200">Auto-retry payments</h5>
                <p className="text-[11px] text-[#64748B] leading-normal font-light">Allows the agent to trigger smart retries through secondary routes when bank declines happen.</p>
              </div>
              <button
                onClick={() => handleToggle('autoRetry')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.autoRetry ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.autoRetry ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 2: Send links */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1 max-w-md pr-4 text-left">
                <h5 className="text-xs font-semibold text-gray-200">Send recovery links</h5>
                <p className="text-[11px] text-[#64748B] leading-normal font-light">Generate and dispatch check-out recovery pings for checkout abandonments or expired cards.</p>
              </div>
              <button
                onClick={() => handleToggle('sendLinks')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.sendLinks ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.sendLinks ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 3: WhatsApp */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1 max-w-md pr-4 text-left">
                <h5 className="text-xs font-semibold text-gray-200">Send WhatsApp recovery messages</h5>
                <p className="text-[11px] text-[#64748B] leading-normal font-light">Send transactional QR codes and checkout prompts via verified WhatsApp template channels.</p>
              </div>
              <button
                onClick={() => handleToggle('sendWhatsApp')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.sendWhatsApp ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.sendWhatsApp ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 4: Email */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1 max-w-md pr-4 text-left">
                <h5 className="text-xs font-semibold text-gray-200">Send email reminders</h5>
                <p className="text-[11px] text-[#64748B] leading-normal font-light">Standard billing fallback reminder sequences sent for subscription mandate failures.</p>
              </div>
              <button
                onClick={() => handleToggle('sendEmail')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.sendEmail ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.sendEmail ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 5: Auto Refunds */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1 max-w-md pr-4 text-left">
                <h5 className="text-xs font-semibold text-gray-200">Automatic refunds</h5>
                <p className="text-[11px] text-[#64748B] leading-normal font-light">Allows the agent to refund double transactions or incorrect debit logs without queueing for audit approval.</p>
              </div>
              <button
                onClick={() => handleToggle('autoRefunds')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.autoRefunds ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.autoRefunds ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Sliders & Manual Thresholds controls */}
        <div className="premium-card p-6 space-y-6">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 border-b border-[#1F3047] pb-3">
            <UserCheck className="h-4.5 w-4.5 text-[#22D3EE]" />
            Decision Limits
          </h4>

          {/* Slider 1: Maximum autonomous amount */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#94A3B8] font-semibold">Max Autonomous Amount</span>
              <span className="font-numeric font-bold text-white">₹{guardrails.maxAutonomousAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={guardrails.maxAutonomousAmount}
              onChange={(e) => handleRangeChange('maxAutonomousAmount', Number(e.target.value))}
              className="w-full h-1.5 bg-[#0B1728] rounded-lg appearance-none cursor-pointer accent-[#3B82F6] focus:outline-none"
            />
            <p className="text-[10px] text-[#64748B] leading-snug font-light">Transactions exceeding this value require explicit approval from a manager.</p>
          </div>

          {/* Slider 2: Minimum confidence */}
          <div className="space-y-2 pt-2 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#94A3B8] font-semibold">Minimum AI Confidence</span>
              <span className="font-numeric font-bold text-white">{guardrails.minAiConfidence}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={guardrails.minAiConfidence}
              onChange={(e) => handleRangeChange('minAiConfidence', Number(e.target.value))}
              className="w-full h-1.5 bg-[#0B1728] rounded-lg appearance-none cursor-pointer accent-[#3B82F6] focus:outline-none"
            />
            <p className="text-[10px] text-[#64748B] leading-snug font-light">Actions scoring below this threshold are placed in the Needs Review bin.</p>
          </div>

          {/* High-value approval checkbox trigger */}
          <div className="border-t border-[#1F3047] pt-5 space-y-4">
            <div className="flex items-start justify-between gap-4 text-left">
              <div className="space-y-0.5">
                <h5 className="text-xs font-semibold text-gray-200">High-value manual authorization</h5>
                <p className="text-[9.5px] text-[#64748B] leading-normal font-light">Requires manual confirmation for all retries on transactions in high risk tiers.</p>
              </div>
              <button
                onClick={() => handleToggle('highValueApprovalRequired')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  guardrails.highValueApprovalRequired ? 'bg-[#3B82F6]' : 'bg-[#101D30]'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  guardrails.highValueApprovalRequired ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Safety Alert Box */}
      <div className="rounded-2xl border border-[#3B82F6]/10 bg-[#132744]/15 p-4.5 flex gap-3 text-xs leading-relaxed text-[#94A3B8] text-left">
        <AlertOctagon className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block font-display">Compliance and Guardrails Guarantee</span>
          AI decisions execute strictly within boundaries configured here. Restricting channels automatically suspends active sequences and drops cases back into the review table.
        </div>
      </div>
    </div>
  );
};
export default AIGuardrails;
