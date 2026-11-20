import React, { useState } from 'react';
import { 
  GitFork, Plus, Trash2, Edit2, Check, Save, 
  ArrowDown, Clock, ShieldAlert, Sparkles 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';
import { WorkflowNode } from '../types/types';

export const Automations: React.FC = () => {
  const { workflowNodes, workflowConnections, saveWorkflow } = useRecoveryState();
  const [nodes, setNodes] = useState<WorkflowNode[]>(workflowNodes);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  
  // Inline edit state variables
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDelay, setEditDelay] = useState(30);
  const [editProb, setEditProb] = useState(70);
  const [editChannel, setEditChannel] = useState('WhatsApp');

  const [toastMsg, setToastMsg] = useState('');

  // Save changes from state back to global context
  const handleSaveAll = () => {
    saveWorkflow(nodes, workflowConnections);
    setToastMsg('Recovery workflow changes saved successfully.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Node deletion
  const handleDeleteNode = (id: string) => {
    // Avoid deleting core trigger node
    if (id === 'node-1') {
      alert('Cannot delete the root "Payment Failed" trigger node.');
      return;
    }
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  // Enable node edit state
  const handleStartEdit = (node: WorkflowNode) => {
    setEditingNodeId(node.id);
    setEditTitle(node.title);
    setEditDesc(node.description);
    setEditDelay(node.config?.delayMinutes || 30);
    setEditProb(node.config?.probabilityThreshold || 70);
    setEditChannel(node.config?.channel || 'WhatsApp');
  };

  // Save inline node edits
  const handleSaveNodeEdit = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        return {
          ...n,
          title: editTitle,
          description: editDesc,
          config: {
            ...n.config,
            delayMinutes: editDelay,
            probabilityThreshold: editProb,
            channel: editChannel
          }
        };
      }
      return n;
    }));
    setEditingNodeId(null);
  };

  // Insert a new step after an index
  const handleAddStep = (index: number) => {
    const newId = `node-${Date.now()}`;
    const newNode: WorkflowNode = {
      id: newId,
      type: 'action',
      title: 'Send Notification Reminder',
      description: 'Notify user regarding the payment error details.',
      config: { channel: 'Email' }
    };
    
    setNodes(prev => {
      const copy = [...prev];
      copy.splice(index + 1, 0, newNode);
      return copy;
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast message popup */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#1F3047] bg-[#0B1728] px-4 py-3 text-xs font-semibold text-emerald-400 shadow-xl flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Autonomous Workflows</h2>
          <p className="text-sm text-[#94A3B8] mt-1 font-light">Configure transaction routing pathways and notifications schedules.</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#60A5FA] transition-all"
        >
          <Save className="h-4 w-4" />
          Save Workflow Config
        </button>
      </div>

      {/* Graphical Flow Editor Container */}
      <div className="premium-card p-6 flex flex-col items-center justify-center relative bg-[#101D30]/20">
        <div className="absolute top-4 left-6 flex items-center gap-2 text-xs text-[#64748B] font-medium">
          <GitFork className="h-4 w-4 text-[#3B82F6]" />
          <span>Visual Rule Editor</span>
        </div>

        {/* Nodes Pipeline */}
        <div className="w-full max-w-xl space-y-6 my-8 relative flex flex-col items-center">
          {nodes.map((node, index) => {
            const isEditing = editingNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div className={`w-full rounded-2xl border bg-[#101D30] p-4.5 relative shadow-lg transition-all text-left ${
                  isEditing 
                    ? 'border-[#3B82F6] bg-[#132744]/15' 
                    : node.type === 'trigger' 
                    ? 'border-[#10B981]/30 bg-[#0a291f]/10'
                    : node.type === 'condition'
                    ? 'border-[#22D3EE]/30 bg-[#0c2033]/10'
                    : 'border-[#1F3047] bg-[#101D30]/20'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 w-full pr-8">
                      {/* Node Label Tag */}
                      <span className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        node.type === 'trigger' ? 'bg-[#0a291f] text-[#10B981] border border-[#10B981]/25' :
                        node.type === 'condition' ? 'bg-[#0c2033] text-[#22D3EE] border border-[#22D3EE]/25' :
                        node.type === 'delay' ? 'bg-[#2d1f06] text-[#F59E0B] border border-[#F59E0B]/25' :
                        'bg-[#132744] text-[#60A5FA] border border-[#3B82F6]/25'
                      }`}>
                        {node.type}
                      </span>
                      
                      {isEditing ? (
                        <div className="pt-2 space-y-3 w-full">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-[#64748B] uppercase font-semibold">Title</span>
                            <input 
                              type="text" 
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="rounded-lg border border-[#1F3047] bg-[#0B1728] px-3 py-1.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-[#64748B] uppercase font-semibold">Description</span>
                            <textarea
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className="rounded-lg border border-[#1F3047] bg-[#0B1728] px-3 py-1.5 text-xs text-white outline-none focus:border-[#3B82F6] resize-none h-16"
                            />
                          </div>

                          {/* Conditional Configurations fields */}
                          {node.type === 'delay' && (
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] text-[#64748B] uppercase font-semibold">Delay Timer (Minutes)</span>
                              <input 
                                type="number" 
                                value={editDelay}
                                onChange={(e) => setEditDelay(Number(e.target.value))}
                                className="rounded-lg border border-[#1F3047] bg-[#0B1728] px-3 py-1.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                              />
                            </div>
                          )}

                          {node.type === 'condition' && (
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] text-[#64748B] uppercase font-semibold">Probability Minimum (%)</span>
                              <input 
                                type="number" 
                                value={editProb}
                                onChange={(e) => setEditProb(Number(e.target.value))}
                                className="rounded-lg border border-[#1F3047] bg-[#0B1728] px-3 py-1.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                              />
                            </div>
                          )}

                          {node.type === 'action' && node.config?.channel && (
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] text-[#64748B] uppercase font-semibold">Channel</span>
                              <select 
                                value={editChannel}
                                onChange={(e) => setEditChannel(e.target.value)}
                                className="rounded-lg border border-[#1F3047] bg-[#0B1728] px-3 py-1.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                              >
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="SMS">SMS</option>
                                <option value="Email">Email</option>
                              </select>
                            </div>
                          )}

                          <div className="pt-1.5 flex gap-2">
                            <button
                              onClick={() => handleSaveNodeEdit(node.id)}
                              className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white flex items-center gap-1 hover:bg-emerald-500 transition-all border border-transparent"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingNodeId(null)}
                              className="rounded-lg border border-[#1F3047] bg-[#101D30] px-3.5 py-1.5 text-xs font-bold text-[#94A3B8] hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h5 className="font-bold text-white text-sm font-display pt-1">{node.title}</h5>
                          <p className="text-xs text-[#94A3B8] font-light leading-relaxed">{node.description}</p>
                          {node.type === 'delay' && node.config?.delayMinutes && (
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#F59E0B]">
                              <Clock className="h-3.5 w-3.5" />
                              <span>Delay: <span className="font-numeric">{node.config.delayMinutes}</span> minutes</span>
                            </div>
                          )}
                          {node.type === 'condition' && node.config?.probabilityThreshold && (
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#22D3EE]">
                              <ShieldAlert className="h-3.5 w-3.5" />
                              <span>Condition: Score &gt; <span className="font-numeric">{node.config.probabilityThreshold}%</span></span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Controls */}
                    {!isEditing && (
                      <div className="absolute right-4 top-4.5 flex gap-1">
                        <button
                          onClick={() => handleStartEdit(node)}
                          className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#101D30] hover:text-[#3B82F6] transition-all"
                          title="Edit Step Parameters"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        {node.id !== 'node-1' && (
                          <button
                            onClick={() => handleDeleteNode(node.id)}
                            className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#101D30] hover:text-[#EF4444] transition-all"
                            title="Delete Step"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting Pin line */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center">
                    {/* Dashed Connector Line */}
                    <div className="h-8 w-0.5 border-l-2 border-dashed border-[#1F3047] relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#132744] flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-ping"></div>
                      </div>
                    </div>
                    {/* Add step pill */}
                    <button
                      onClick={() => handleAddStep(index)}
                      className="rounded-full border border-[#1F3047] bg-[#0B1728] p-1.5 text-[#94A3B8] hover:bg-[#132744] hover:text-white hover:border-[#3B82F6] hover:scale-110 transition-all z-10"
                      title="Insert Recovery Action Step"
                    >
                      <Plus className="h-3.5 w-3.5 font-bold" />
                    </button>
                    <ArrowDown className="h-3.5 w-3.5 text-[#1f3047] mt-1" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Automations;
