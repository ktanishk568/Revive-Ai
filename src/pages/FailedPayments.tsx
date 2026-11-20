import React from 'react';
import { 
  BarChart, Bar, Cell, PieChart, Pie, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  AlertTriangle, Lightbulb, RefreshCcw, Clock
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const FailedPayments: React.FC = () => {
  const { stats } = useRecoveryState();

  // Redesigned failure categories dataset using fintech system colors
  const failureData = [
    { name: 'Bank Decline', value: 452, amount: 485000, color: '#3B82F6' },
    { name: 'Insufficient Funds', value: 384, amount: 280000, color: '#F59E0B' },
    { name: 'Abandoned Checkout', value: 290, amount: 185000, color: '#22D3EE' },
    { name: 'Timeout', value: 185, amount: 120000, color: '#0EA5E9' },
    { name: 'Technical Failure', value: 112, amount: 98000, color: '#EF4444' },
    { name: 'Subscription Failure', value: 54, amount: 45000, color: '#60A5FA' },
    { name: 'Expired Card', value: 25, amount: 25000, color: '#10B981' },
    { name: 'Incorrect Details', value: 12, amount: 10000, color: '#64748B' },
  ];

  // Calculated secondary metrics
  const totalFailuresCount = 1514 + (stats.aiActions - 1284);
  const averageFailureValue = Math.round(stats.revenueAtRisk / (transactionsCount() || 1)) || 4120;
  const recoveryOpportunity = Math.round(stats.revenueAtRisk * 0.8);

  function transactionsCount() {
    return Math.round(stats.revenueAtRisk / 4120);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Failed Payments Analysis</h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-light">Telemetry analytics into payment declines and terminal drop-offs.</p>
      </div>

      {/* KPI Stats Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Total Failed Payments</span>
          <p className="text-xl font-numeric font-bold text-white mt-1">{totalFailuresCount.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Revenue at Risk</span>
          <p className="text-xl font-numeric font-bold text-[#F59E0B] mt-1">₹{stats.revenueAtRisk.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">Average Failure Value</span>
          <p className="text-xl font-numeric font-bold text-white mt-1">₹{averageFailureValue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#64748B]">AI Recovery Opportunity</span>
          <p className="text-xl font-numeric font-bold text-[#10B981] mt-1">₹{recoveryOpportunity.toLocaleString()}</p>
        </div>
      </div>

      {/* Recharts Visualizations Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bar chart - failure reason values */}
        <div className="premium-card p-6 space-y-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white font-display">Declines Value by Failure Reason</h4>
            <p className="text-xs text-[#64748B]">INR value representing transactions caught in failure brackets.</p>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3047" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={9.5} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {failureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart - failure reason distribution volumes */}
        <div className="premium-card p-6 space-y-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white font-display">Failed Volume Distribution</h4>
            <p className="text-xs text-[#64748B]">Breakdown of payment errors by frequency count.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[280px]">
            <div className="h-full w-full sm:w-[60%]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={failureData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {failureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 text-[10.5px] w-full sm:w-[40%] text-[#94A3B8] text-left">
              {failureData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name} (<span className="font-numeric">{item.value}</span>)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Failure Insights cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 text-left">
          <Lightbulb className="h-4.5 w-4.5 text-[#22D3EE]" />
          AI Failure Insights
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#1F3047] bg-[#101D30]/30 hover:bg-[#132744]/40 hover:border-[#3B82F6]/30 p-5 space-y-2 transition-all text-left">
            <span className="text-[10px] uppercase font-bold text-[#EF4444] flex items-center gap-1.5 font-numeric">
              <AlertTriangle className="h-3.5 w-3.5" />
              Highest risk segment
            </span>
            <h5 className="text-xs font-bold text-white font-display mt-2">Bank Declines Rule Queue</h5>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
              Bank declines represent the largest share of revenue at risk. AI recommends prioritizing gateway routing configurations for card payments exceeding ₹5,000.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#1F3047] bg-[#101D30]/30 hover:bg-[#132744]/40 hover:border-[#3B82F6]/30 p-5 space-y-2 transition-all text-left">
            <span className="text-[10px] uppercase font-bold text-[#F59E0B] flex items-center gap-1.5 font-numeric">
              <Clock className="h-3.5 w-3.5" />
              UPI latency peaking
            </span>
            <h5 className="text-xs font-bold text-white font-display mt-2">Peak UPI Timeouts</h5>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
              UPI timeouts peak between 6:00 PM and 9:00 PM, suggesting bank gateway capacity limits. Avoid immediate retries; delay links by 15 mins.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#1F3047] bg-[#101D30]/30 hover:bg-[#132744]/40 hover:border-[#3B82F6]/30 p-5 space-y-2 transition-all text-left">
            <span className="text-[10px] uppercase font-bold text-[#22D3EE] flex items-center gap-1.5 font-numeric">
              <RefreshCcw className="h-3.5 w-3.5" />
              Subscription loss
            </span>
            <h5 className="text-xs font-bold text-white font-display mt-2">Card Expiration leakage</h5>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
              Expired cards account for 12% of subscription losses. Standard auto-retries always fail on expired cards; trigger interactive update prompts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FailedPayments;
