import React, { useState, useMemo } from 'react';
import { 
  Search, Cpu, UserCheck, 
  Terminal, Check, RefreshCw 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

export const ActivityLog: React.FC = () => {
  const { activities, addActivity } = useRecoveryState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'agent' | 'user' | 'system'>('all');

  const filteredActivities = useMemo(() => {
    let result = [...activities];

    // Search query check
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(act => act.message.toLowerCase().includes(q));
    }

    // Type check
    if (filterType !== 'all') {
      result = result.filter(act => act.type === filterType);
    }

    return result;
  }, [activities, searchTerm, filterType]);

  const handleInjectMockEvent = () => {
    const txIds = ['RP92831', 'RP88372', 'RP74639', 'RP93021', 'RP64811'];
    const randomTx = txIds[Math.floor(Math.random() * txIds.length)];
    const messages = [
      `AI verified HDFC card merchant mandate check for transaction ${randomTx}.`,
      `Scheduled smart retry delay threshold adjusted for NPCI network peak latencies.`,
      `User updated maxAutonomousAmount guardrail parameter to ₹15,000.`,
      `Gateway switch node routed transaction payload ${randomTx} successfully.`,
      `WhatsApp webhook verified checkout link clicked by customer.`
    ];
    const types: Array<'agent' | 'user' | 'system'> = ['agent', 'agent', 'user', 'agent', 'system'];
    const randIdx = Math.floor(Math.random() * messages.length);
    
    addActivity(types[randIdx], messages[randIdx], undefined, randomTx);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">System Activity Logs</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">Trace historical logs of all autonomous calculations, user audits, and payment completions.</p>
        </div>

        {/* Developer Mock Tool */}
        <button
          onClick={handleInjectMockEvent}
          className="flex items-center gap-2 rounded-xl bg-[#101D30] border border-[#1F3047] px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] hover:bg-[#14243A] hover:text-white transition-all self-start"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Inject Mock Event
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="premium-card p-5 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute top-3 left-3.5 h-4.5 w-4.5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search event logs content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#1F3047] bg-[#101D30] py-2 pl-10 pr-4 text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6]"
            />
          </div>

          {/* Type filters tabs */}
          <div className="flex items-center gap-1 bg-[#0B1728] p-1 rounded-xl border border-[#1F3047] self-start">
            {(['all', 'agent', 'user', 'system'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  filterType === type
                    ? 'bg-[#3B82F6] text-white shadow'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline List cards */}
      <div className="premium-card p-6 space-y-5 h-[500px] overflow-y-auto scrollbar-thin">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-20 text-[#64748B] text-xs">
            No activities matched search query.
          </div>
        ) : (
          <div className="relative border-l border-[#1F3047] ml-4.5 pl-8 space-y-6 text-left">
            {filteredActivities.map((act) => {
              // Icon selector
              let Icon = Terminal;
              let iconColor = 'text-[#64748B] bg-[#0B1728] border-[#1F3047]';
              
              if (act.type === 'agent') {
                Icon = Cpu;
                iconColor = 'text-[#22D3EE] bg-[#0c2033]/40 border-[#22D3EE]/20';
              } else if (act.type === 'user') {
                Icon = UserCheck;
                iconColor = 'text-[#60A5FA] bg-[#132744]/40 border-[#3B82F6]/20';
              } else if (act.type === 'system') {
                Icon = Check;
                iconColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-900/20';
              }

              return (
                <div key={act.id} className="relative group text-xs leading-relaxed text-gray-300">
                  {/* Point circle icon */}
                  <div className={`absolute -left-[50px] top-0.5 flex h-8 w-8 items-center justify-center rounded-xl border ${iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="font-semibold text-[#F8FAFC]">{act.message}</span>
                      <span className="text-[10px] text-[#64748B] font-mono">
                        {new Date(act.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    {act.transactionId && (
                      <div className="flex items-center gap-3 text-[10px] text-[#64748B]">
                        <span>TXID: <span className="font-mono text-gray-400 font-medium">{act.transactionId}</span></span>
                        {act.amount && (
                          <span>Value: <span className="text-white font-semibold">₹{act.amount.toLocaleString()}</span></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ActivityLog;
