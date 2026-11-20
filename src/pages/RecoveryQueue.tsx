import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, ArrowUpDown, X, Check 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';
import { Transaction } from '../types/types';

export const RecoveryQueue: React.FC = () => {
  const location = useLocation();
  const { transactions, approveTransaction, rejectTransaction } = useRecoveryState();

  // Extract query param for search (if navigated from header search)
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  // Local Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [amountFilter, setAmountFilter] = useState<string>('All');
  const [sortKey, setSortKey] = useState<keyof Transaction>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Clear filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setMethodFilter('All');
    setAmountFilter('All');
  };

  // Sorting handler
  const handleSort = (key: keyof Transaction) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  // Filter and Sort Logic
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search query check
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(tx => 
        tx.id.toLowerCase().includes(q) ||
        tx.customerName.toLowerCase().includes(q) ||
        tx.customerEmail.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(tx => tx.status === statusFilter);
    }

    // Method filter
    if (methodFilter !== 'All') {
      result = result.filter(tx => tx.paymentMethod === methodFilter);
    }

    // Amount bracket filter
    if (amountFilter !== 'All') {
      if (amountFilter === 'low') {
        result = result.filter(tx => tx.amount < 2000);
      } else if (amountFilter === 'mid') {
        result = result.filter(tx => tx.amount >= 2000 && tx.amount <= 10000);
      } else if (amountFilter === 'high') {
        result = result.filter(tx => tx.amount > 10000);
      }
    }

    // Apply Sorting
    result.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      // Handle simple string/number comparisons
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

    return result;
  }, [transactions, searchTerm, statusFilter, methodFilter, amountFilter, sortKey, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Recovery Queue</h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-light">Audit status, failure context, and recommended retry schedules.</p>
      </div>

      {/* Filters Toolbar card */}
      <div className="premium-card p-5 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute top-3 left-3.5 h-4 w-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search Customer or Transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#1F3047] bg-[#101D30] py-2 pl-10 pr-4 text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6]"
            />
          </div>

          {/* Quick Select Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Selector */}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#1F3047] bg-[#0B1728] px-3 py-2 text-xs font-semibold text-[#94A3B8] outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Recovering">Recovering</option>
                <option value="Recovered">Recovered</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold">Payment Method</span>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="rounded-xl border border-[#1F3047] bg-[#0B1728] px-3 py-2 text-xs font-semibold text-[#94A3B8] outline-none"
              >
                <option value="All">All Methods</option>
                <option value="Card">Cards</option>
                <option value="UPI">UPI</option>
                <option value="Netbanking">Netbanking</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>

            {/* Amount Brackets */}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold">Transaction Value</span>
              <select
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                className="rounded-xl border border-[#1F3047] bg-[#0B1728] px-3 py-2 text-xs font-semibold text-[#94A3B8] outline-none"
              >
                <option value="All">All Amounts</option>
                <option value="low">Under ₹2,000</option>
                <option value="mid">₹2,000 - ₹10,000</option>
                <option value="high">Over ₹10,000</option>
              </select>
            </div>

            {/* Reset Button */}
            {(searchTerm || statusFilter !== 'All' || methodFilter !== 'All' || amountFilter !== 'All') && (
              <button
                onClick={resetFilters}
                className="mt-5 rounded-xl border border-[#1F3047] bg-[#101D30] px-3 py-2 text-xs font-bold text-[#CBD5E1] hover:bg-[#14243A] hover:text-white transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Results Table / Cards Panel */}
      <div className="overflow-hidden rounded-2xl border border-[#1F3047] bg-[#101D30]/40">
        
        {/* Desktop View Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1F3047] bg-[#0B1728] text-[#94A3B8] font-semibold uppercase tracking-wider">
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Transaction</th>
                <th 
                  onClick={() => handleSort('amount')}
                  className="py-4 px-5 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Amount
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-4 px-5">Failure reason</th>
                <th 
                  onClick={() => handleSort('recoveryProbability')}
                  className="py-4 px-5 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Recovery Odds
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-4 px-5">AI Recommendation</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3047]">
              {processedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#64748B]">
                    No transactions matching selected filters.
                  </td>
                </tr>
              ) : (
                processedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#14243A]/40 transition-colors border-l-2 border-l-transparent hover:border-l-[#3B82F6]">
                    {/* Customer */}
                    <td className="py-4.5 px-5">
                      <div className="font-semibold text-[#F8FAFC]">{tx.customerName}</div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">{tx.customerEmail}</div>
                    </td>

                    {/* ID */}
                    <td className="py-4.5 px-5 font-numeric text-[#F8FAFC] font-medium">
                      {tx.id}
                    </td>

                    {/* Amount */}
                    <td className="py-4.5 px-5 font-numeric text-white font-semibold text-right">
                      ₹{tx.amount.toLocaleString()}
                    </td>

                    {/* Reason */}
                    <td className="py-4.5 px-5">
                      <span className="rounded bg-[#2d1012]/60 px-2 py-0.5 font-semibold text-[#EF4444] border border-[#EF4444]/20">
                        {tx.failureReason}
                      </span>
                    </td>

                    {/* Recovery Probability */}
                    <td className="py-4.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-numeric font-semibold ${
                          tx.recoveryProbability >= 80 ? 'text-[#10B981]' :
                          tx.recoveryProbability >= 50 ? 'text-[#F59E0B]' :
                          'text-[#EF4444]'
                        }`}>{tx.recoveryProbability}%</span>
                        <div className="w-12 bg-[#0B1728] rounded-full h-1 overflow-hidden">
                          <div 
                            className={`h-1 rounded-full ${
                              tx.recoveryProbability >= 80 ? 'bg-[#10B981]' :
                              tx.recoveryProbability >= 50 ? 'bg-[#F59E0B]' :
                              'bg-[#EF4444]'
                            }`}
                            style={{ width: `${tx.recoveryProbability}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* AI Recommendation */}
                    <td className="py-4.5 px-5">
                      <div className="text-gray-300 font-medium">{tx.recommendedAction}</div>
                      <div className="text-[9.5px] text-[#64748B] mt-0.5">Conf: {tx.aiConfidence}%</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4.5 px-5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        tx.status === 'Recovered' ? 'bg-[#0a291f]/60 text-[#10B981] border-[#10B981]/20' :
                        tx.status === 'Failed' ? 'bg-[#2d1012]/60 text-[#EF4444] border-[#EF4444]/20' :
                        tx.status === 'Scheduled' ? 'bg-[#132744]/60 text-[#3B82F6] border-[#3B82F6]/20' :
                        tx.status === 'Recovering' ? 'bg-[#0c2033]/60 text-[#22D3EE] border-[#22D3EE]/20' :
                        'bg-[#2d1f06]/60 text-[#F59E0B] border-[#F59E0B]/20'
                      }`}>
                        {tx.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4.5 px-5 text-right">
                      {tx.status === 'Needs Review' ? (
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => rejectTransaction(tx.id)}
                            className="rounded-lg p-1.5 text-[#EF4444] border border-[#2A405D] bg-transparent hover:bg-[#101D30] transition-all cursor-pointer"
                            title="Reject Action"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => approveTransaction(tx.id)}
                            className="rounded-lg p-1.5 bg-[#3B82F6] text-white hover:bg-[#60A5FA] transition-all cursor-pointer"
                            title="Approve AI Plan"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#64748B] font-light">Autonomous</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Convert into layout cards */}
        <div className="block lg:hidden divide-y divide-[#1F3047]">
          {processedTransactions.length === 0 ? (
            <p className="py-12 text-center text-xs text-[#64748B]">No transactions matching selected filters.</p>
          ) : (
            processedTransactions.map((tx) => (
              <div key={tx.id} className="p-4 space-y-3.5 hover:bg-[#14243A]/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <h5 className="font-bold text-[#F8FAFC] text-sm">{tx.customerName}</h5>
                    <p className="text-[10.5px] text-[#64748B] font-numeric mt-0.5">{tx.id} • {tx.paymentMethod}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[9.5px] font-bold border ${
                    tx.status === 'Recovered' ? 'bg-[#0a291f]/60 text-[#10B981] border-[#10B981]/20' :
                    tx.status === 'Failed' ? 'bg-[#2d1012]/60 text-[#EF4444] border-[#EF4444]/20' :
                    tx.status === 'Scheduled' ? 'bg-[#132744]/60 text-[#3B82F6] border-[#3B82F6]/20' :
                    tx.status === 'Recovering' ? 'bg-[#0c2033]/60 text-[#22D3EE] border-[#22D3EE]/20' :
                    'bg-[#2d1f06]/60 text-[#F59E0B] border-[#F59E0B]/20'
                  }`}>
                    {tx.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] bg-[#0B1728] p-2.5 rounded-lg border border-[#1F3047] text-left">
                  <div>
                    <span className="text-[#64748B] block uppercase text-[9px]">Amount</span>
                    <span className="font-numeric font-bold text-white">₹{tx.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block uppercase text-[9px]">Failure reason</span>
                    <span className="text-[#EF4444] font-semibold">{tx.failureReason}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block uppercase text-[9px]">Recovery Chance</span>
                    <span className={`font-numeric font-semibold ${
                      tx.recoveryProbability >= 80 ? 'text-[#10B981]' : 'text-[#F59E0B]'
                    }`}>{tx.recoveryProbability}%</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block uppercase text-[9px]">AI Action</span>
                    <span className="text-gray-300 font-medium">{tx.recommendedAction}</span>
                  </div>
                </div>

                {/* Mobile actions trigger */}
                {tx.status === 'Needs Review' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => rejectTransaction(tx.id)}
                      className="flex-1 rounded-xl bg-transparent border border-[#2A405D] text-xs font-semibold py-2 text-[#EF4444] hover:bg-[#101D30] cursor-pointer"
                    >
                      Reject Plan
                    </button>
                    <button
                      onClick={() => approveTransaction(tx.id)}
                      className="flex-1 rounded-xl bg-[#3B82F6] text-xs font-semibold py-2 text-white hover:bg-[#60A5FA] cursor-pointer"
                    >
                      Approve Retry
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default RecoveryQueue;
