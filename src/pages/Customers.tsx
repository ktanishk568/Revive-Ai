import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, Mail, Clock, Sparkles, CheckCircle2, MessageSquare, Landmark, ChevronRight 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const Customers: React.FC = () => {
  const { customers } = useRecoveryState();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Find currently selected customer details
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null;

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Customer Intelligence</h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-light">Telemetry customer profiles mapping payment history and recovery probability.</p>
      </div>

      {/* Customers Table / Grid */}
      <div className="overflow-hidden rounded-2xl border border-[#1F3047] bg-[#101D30]/40">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#1F3047] bg-[#0B1728] text-[#94A3B8] font-semibold uppercase tracking-wider">
              <th className="py-4 px-5">Customer Profile</th>
              <th className="py-4 px-5 text-right">Lifetime Value (LTV)</th>
              <th className="py-4 px-5 text-center">Cleared Payments</th>
              <th className="py-4 px-5 text-center">Failed Counts</th>
              <th className="py-4 px-5 text-right">Active Risk</th>
              <th className="py-4 px-5 text-right">Recovery Odds</th>
              <th className="py-4 px-5 text-right">Ledger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F3047]">
            {customers.map((cust) => (
              <tr 
                key={cust.id} 
                onClick={() => setSelectedCustomerId(cust.id)}
                className="hover:bg-[#14243A]/40 transition-colors cursor-pointer group border-l-2 border-l-transparent hover:border-l-[#3B82F6]"
              >
                {/* Profile */}
                <td className="py-4.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#132744] border border-[#3B82F6]/20 flex items-center justify-center font-display font-bold text-[#60A5FA]">
                      {cust.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">{cust.name}</div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">{cust.email}</div>
                    </div>
                  </div>
                </td>

                {/* LTV */}
                <td className="py-4.5 px-5 font-numeric text-white font-semibold text-right">
                  ₹{cust.ltv.toLocaleString()}
                </td>

                {/* Successful Payments */}
                <td className="py-4.5 px-5 text-center font-numeric text-gray-300 font-medium">
                  {cust.successfulPayments}
                </td>

                {/* Failed Payments */}
                <td className="py-4.5 px-5 text-center font-numeric text-[#EF4444] font-semibold">
                  {cust.failedPayments}
                </td>

                {/* Revenue at Risk */}
                <td className="py-4.5 px-5 text-right">
                  {cust.revenueAtRisk > 0 ? (
                    <span className="text-[#EF4444] font-numeric font-bold">₹{cust.revenueAtRisk.toLocaleString()}</span>
                  ) : (
                    <span className="text-[#64748B] font-numeric">—</span>
                  )}
                </td>

                {/* Recovery Probability */}
                <td className="py-4.5 px-5 text-right">
                  {cust.revenueAtRisk > 0 ? (
                    <span className={`font-numeric font-semibold ${
                      cust.recoveryProbability >= 80 ? 'text-[#10B981]' : 'text-[#F59E0B]'
                    }`}>{cust.recoveryProbability}%</span>
                  ) : (
                    <span className="text-[#64748B]">N/A</span>
                  )}
                </td>

                {/* Chevron */}
                <td className="py-4.5 px-5 text-right text-[#64748B] group-hover:text-[#3B82F6] transition-colors">
                  <ChevronRight className="inline-block h-4.5 w-4.5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Sliding Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomerId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:pl-64"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-[#07111F] border-l border-[#1F3047] z-50 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              {/* Drawer Content wrapper */}
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#1F3047] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#132744] border border-[#3B82F6]/20 flex items-center justify-center font-display font-bold text-[#60A5FA]">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{selectedCustomer.name}</h4>
                      <span className="text-xs text-[#64748B]">{selectedCustomer.id}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCustomerId(null)}
                    className="rounded-lg p-1 text-[#94A3B8] hover:bg-[#101D30] hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Contact Stats Card */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#101D30]/40 p-3 rounded-xl border border-[#1F3047]">
                  <div className="flex items-center gap-2 text-[#94A3B8] truncate">
                    <Mail className="h-3.5 w-3.5 text-[#64748B]" />
                    <span className="truncate">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <Phone className="h-3.5 w-3.5 text-[#64748B]" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>

                {/* Financial overview */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-3">
                    <span className="text-[9px] uppercase text-[#64748B]">LTV Value</span>
                    <p className="text-sm font-numeric font-bold text-white mt-0.5">₹{selectedCustomer.ltv.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-3">
                    <span className="text-[9px] uppercase text-[#64748B]">Payments Run</span>
                    <p className="text-sm font-numeric font-bold text-white mt-0.5">{selectedCustomer.successfulPayments}</p>
                  </div>
                  <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-3">
                    <span className="text-[9px] uppercase text-[#64748B]">At Risk Now</span>
                    <p className="text-sm font-numeric font-bold text-[#EF4444] mt-0.5">₹{selectedCustomer.revenueAtRisk.toLocaleString()}</p>
                  </div>
                </div>

                {/* AI Customer Analysis */}
                <div className="rounded-xl border border-[#3B82F6]/10 bg-[#132744]/15 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#22D3EE]">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Customer Profile Analysis
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                    {selectedCustomer.aiAnalysis}
                  </p>
                </div>

                {/* Chronological Payment Timeline */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-white font-display">Transaction Ledger</h5>
                  <div className="space-y-3">
                    {selectedCustomer.paymentHistory.map((historyItem, idx) => (
                      <div key={idx} className="flex gap-3 text-xs leading-none">
                        <div className="relative flex flex-col items-center">
                          <span className={`h-2.5 w-2.5 rounded-full ring-4 ${
                            historyItem.status === 'Success' ? 'bg-[#10B981] ring-[#10B981]/25' :
                            historyItem.status === 'Recovered' ? 'bg-[#3B82F6] ring-[#132744]/25' :
                            'bg-[#EF4444] ring-[#EF4444]/25'
                          }`} />
                          {idx < selectedCustomer.paymentHistory.length - 1 && (
                            <span className="w-0.5 bg-[#1F3047] grow mt-1 mb-1 min-h-[20px]" />
                          )}
                        </div>
                        <div className="space-y-1 pb-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="font-numeric font-semibold text-gray-200">₹{historyItem.amount.toLocaleString()}</span>
                            <span className="text-[10px] text-[#64748B]">•</span>
                            <span className="text-[10px] font-numeric text-[#64748B]">{historyItem.transactionId}</span>
                            <span className={`inline-block rounded px-1.5 py-0.25 text-[8.5px] font-bold leading-normal uppercase border ${
                              historyItem.status === 'Success' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/20' :
                              historyItem.status === 'Recovered' ? 'bg-[#132744]/30 text-[#3B82F6] border-[#3B82F6]/20' :
                              'bg-rose-950/30 text-rose-400 border-rose-900/20'
                            }`}>{historyItem.status}</span>
                          </div>
                          <span className="text-[9.5px] text-[#64748B] block mt-0.5 font-numeric">
                            {new Date(historyItem.timestamp).toLocaleString()} via {historyItem.paymentMethod}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="border-t border-[#1F3047] pt-4 mt-6 flex gap-2">
                <button
                  onClick={() => {
                    alert(`Dispatched manual recovery notification to ${selectedCustomer.name}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#101D30] border border-[#1F3047] text-xs font-semibold py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#14243A] transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-[#22D3EE]" />
                  Manual Ping
                </button>
                <button
                  onClick={() => {
                    alert(`Refreshed credit mandate risk metrics for ${selectedCustomer.name}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#101D30] border border-[#1F3047] text-xs font-semibold py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#14243A] transition-colors"
                >
                  <Landmark className="h-4 w-4 text-[#3B82F6]" />
                  Re-evaluate Risk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Customers;
