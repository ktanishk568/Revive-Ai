import React, { useState } from 'react';
import { 
  BarChart, Bar, Cell, AreaChart, Area, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const RevenueAnalytics: React.FC = () => {
  const { chartData } = useRecoveryState();
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  // Recovery by Payment Method data
  const paymentMethodData = [
    { name: 'UPI', Recovered: 320000, Lost: 45000, Rate: 87.6 },
    { name: 'Cards', Recovered: 380000, Lost: 120000, Rate: 76.0 },
    { name: 'Netbanking', Recovered: 110000, Lost: 65000, Rate: 62.8 },
    { name: 'Wallets', Recovered: 22500, Lost: 5000, Rate: 81.8 },
  ];

  // Recovery by Channel data
  const channelData = [
    { name: 'WhatsApp', Recovered: 285000, Cost: 1200, Conversions: 66.4 },
    { name: 'Auto-Retry', Recovered: 320000, Cost: 400, Conversions: 54.2 },
    { name: 'Email Sequence', Recovered: 155000, Cost: 300, Conversions: 32.8 },
    { name: 'SMS Alerts', Recovered: 72500, Cost: 600, Conversions: 16.5 },
  ];

  // Recovery by Failure Type data
  const failureTypeData = [
    { name: 'Timeout', Rate: 91.2 },
    { name: 'Decline', Rate: 78.5 },
    { name: 'Checkout Drop', Rate: 88.0 },
    { name: 'Tech Fail', Rate: 84.6 },
    { name: 'Funds Decline', Rate: 61.2 },
    { name: 'Expired Card', Rate: 42.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Revenue Analytics</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">Deep-dive financial reporting on recovery yields and channels performance.</p>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-1 rounded-xl bg-[#0B1728] p-1 border border-[#1F3047] self-start">
          {(['7D', '30D', '90D', '1Y'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                timeFilter === filter
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Recovery by Payment Method */}
        <div className="premium-card p-6 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white font-display">Recovery Status by Payment Method</h4>
            <p className="text-xs text-[#64748B]">Comparing recovered vs lost amounts (INR) across UPI and Cards.</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentMethodData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3047" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Recovered" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Lost" fill="#EF4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery by Communication Channel */}
        <div className="premium-card p-6 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white font-display">Conversions Yield by Channel</h4>
            <p className="text-xs text-[#64748B]">Conversions efficiency rate percentage (%) for active pings.</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3047" opacity={0.2} />
                <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="Conversions" fill="#22D3EE" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery Rate Timeline */}
        <div className="premium-card p-6 lg:col-span-2 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white font-display">Historical Recovery Efficiency Rate</h4>
            <p className="text-xs text-[#64748B]">Agent performance rate trend lines over selected timeframe.</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData[timeFilter]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3047" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${v/10000}k`} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Line type="monotone" name="Recovered Revenue" dataKey="Recovered" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Revenue at Risk" dataKey="At Risk" stroke="#3B82F6" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery by Failure Code */}
        <div className="premium-card p-6 lg:col-span-2 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white font-display">Average Recovery Probability by Decline Type</h4>
            <p className="text-xs text-[#64748B]">Visual mapping of decline types against actual successful retry percentages.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
            {failureTypeData.map((item, idx) => {
              const accentColor = item.Rate >= 80 ? 'text-[#10B981]' : item.Rate >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]';
              const progressBg = item.Rate >= 80 ? 'bg-[#10B981]' : item.Rate >= 60 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
              
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4.5 text-center space-y-2"
                >
                  <span className="text-[10px] text-[#64748B] uppercase font-semibold block truncate">{item.name}</span>
                  <p className={`text-lg font-numeric font-bold ${accentColor}`}>{item.Rate}%</p>
                  <div className="w-full bg-[#0B1728] rounded-full h-1 overflow-hidden">
                    <div 
                      className={`${progressBg} h-1 rounded-full`} 
                      style={{ width: `${item.Rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default RevenueAnalytics;
