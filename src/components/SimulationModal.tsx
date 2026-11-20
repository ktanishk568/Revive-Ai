import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Loader2, Check, Sparkles, TrendingUp, ShieldAlert,
  Coins, Zap, Send, FileCheck, CheckCircle2, Cpu 
} from 'lucide-react';
import { useRecoveryState } from '../hooks/useRecoveryState';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose }) => {
  const { runGlobalSimulation, isSimulating, simulationResult } = useRecoveryState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Scanning logs for failed payments...', icon: SearchIcon },
    { label: 'Analyzing telemetry and BIN metadata...', icon: AnalysisIcon },
    { label: 'Predicting recovery probability metrics...', icon: ProbabilityIcon },
    { label: 'Selecting optimal channel actions...', icon: ActionIcon },
    { label: 'Executing autonomous recovery workflows...', icon: WorkflowIcon },
    { label: 'Tracking outcomes and updating ledger...', icon: LedgerIcon }
  ];

  function SearchIcon() { return <Loader2 className="h-5 w-5 animate-spin text-[#3B82F6]" />; }
  function AnalysisIcon() { return <Sparkles className="h-5 w-5 text-[#22D3EE] animate-pulse" />; }
  function ProbabilityIcon() { return <TrendingUp className="h-5 w-5 text-[#10B981]" />; }
  function ActionIcon() { return <Zap className="h-5 w-5 text-[#F59E0B]" />; }
  function WorkflowIcon() { return <Send className="h-5 w-5 text-[#3B82F6]" />; }
  function LedgerIcon() { return <FileCheck className="h-5 w-5 text-[#22D3EE]" />; }

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      runGlobalSimulation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  // Handle count up simulation for summary metrics
  const [counterRisk, setCounterRisk] = useState(0);
  const [counterRecovered, setCounterRecovered] = useState(0);

  useEffect(() => {
    if (!isSimulating && simulationResult) {
      setCurrentStep(6);
      
      // Count up animation
      const duration = 1500;
      const stepsCount = 50;
      const stepDuration = duration / stepsCount;
      let step = 0;
      
      const targetRisk = 284500;
      const targetRecovered = 191250;

      const timer = setInterval(() => {
        step++;
        setCounterRisk(Math.floor((targetRisk / stepsCount) * step));
        setCounterRecovered(Math.floor((targetRecovered / stepsCount) * step));
        
        if (step >= stepsCount) {
          setCounterRisk(targetRisk);
          setCounterRecovered(targetRecovered);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setCounterRisk(0);
      setCounterRecovered(0);
    }
  }, [isSimulating, simulationResult]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#1F3047] bg-[#07111F] p-6 shadow-2xl"
        >
          {/* Close Button */}
          {!isSimulating && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-lg p-1 text-[#94A3B8] hover:bg-[#101D30] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Modal Header */}
          <div className="mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#22D3EE]" />
            <h3 className="text-lg font-bold text-white font-display">AI Recovery Simulation</h3>
            {isSimulating && (
              <span className="rounded bg-[#132744] px-2 py-0.5 text-xs text-[#60A5FA] animate-pulse">Processing</span>
            )}
          </div>

          {/* Simulation Steps Panel */}
          {currentStep < 6 ? (
            <div className="space-y-4 py-4 text-left">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: idx <= currentStep ? 1 : 0.3, x: 0 }}
                    className={`flex items-center gap-4 rounded-xl border p-3.5 transition-all ${
                      isActive 
                        ? 'border-[#3B82F6] bg-[#132744]/10' 
                        : isCompleted 
                        ? 'border-[#1F3047]/40 bg-[#101D30]/10' 
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B1728]">
                      {isCompleted ? (
                        <Check className="h-4 w-4 text-emerald-400 font-bold" />
                      ) : (
                        <StepIcon />
                      )}
                    </div>
                    <span className={`text-sm ${isActive ? 'font-medium text-white' : 'text-[#94A3B8]'}`}>
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white font-display">Simulated recoveries finished</h4>
                <p className="text-sm text-[#94A3B8] mt-1 font-light">Autonomous Agent compiled outcomes from 50 transaction checks.</p>
              </div>

              {/* Stats Sheet */}
              <div className="grid grid-cols-2 gap-3.5 rounded-xl border border-[#1F3047] bg-[#101D30]/40 p-4 text-left">
                <div className="rounded-lg bg-[#0B1728] p-3 border border-[#1F3047]">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Cases Analyzed</span>
                  <p className="text-lg font-bold text-white mt-0.5">50</p>
                </div>
                <div className="rounded-lg bg-[#0B1728] p-3 border border-[#1F3047]">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Opportunities</span>
                  <p className="text-lg font-bold text-[#22D3EE] mt-0.5">31</p>
                </div>
                <div className="rounded-lg bg-[#0B1728] p-3 border border-[#1F3047]">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Actions Executed</span>
                  <p className="text-lg font-bold text-[#3B82F6] mt-0.5">24</p>
                </div>
                <div className="rounded-lg bg-[#0B1728] p-3 border border-[#1F3047]">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Recovery Rate</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">67.3%</p>
                </div>
                <div className="col-span-2 rounded-lg bg-[#2d1f06]/40 p-3.5 border border-[#F59E0B]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1.5 font-light">
                      <ShieldAlert className="h-3.5 w-3.5 text-[#F59E0B]" />
                      Revenue at Risk
                    </span>
                    <span className="text-sm font-bold text-white">₹{counterRisk.toLocaleString()}</span>
                  </div>
                </div>
                <div className="col-span-2 rounded-lg bg-emerald-950/20 p-3.5 border border-[#10B981]/25">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1.5 font-light">
                      <Coins className="h-3.5 w-3.5 text-emerald-400" />
                      Recovered Revenue
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-display">₹{counterRecovered.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-[#3B82F6] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#60A5FA] transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
