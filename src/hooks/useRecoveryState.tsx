import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Customer, Activity, Insight, WorkflowNode, WorkflowConnection, Guardrails, SimulationResult } from '../types/types';
import {
  initialTransactions,
  initialCustomers,
  initialActivities,
  initialInsights,
  initialWorkflowNodes,
  initialWorkflowConnections,
  initialGuardrails
} from '../data/mockData';
import { generateRandomTransaction } from '../utils/simulation';

interface RecoveryStateContextProps {
  transactions: Transaction[];
  customers: Customer[];
  activities: Activity[];
  insights: Insight[];
  workflowNodes: WorkflowNode[];
  workflowConnections: WorkflowConnection[];
  guardrails: Guardrails;
  stats: {
    revenueAtRisk: number;
    revenueRecovered: number;
    recoveryRate: number;
    paymentsRecovered: number;
    aiActions: number;
    avgRecoveryTime: number;
  };
  simulationResult: SimulationResult | null;
  isSimulating: boolean;
  activeScenarioId: string | null;
  scenarioResults: Record<string, { step: number; status: string; log: string[] }>;
  runGlobalSimulation: (onComplete?: () => void) => void;
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
  modifyTransaction: (id: string, action: string) => void;
  updateGuardrails: (guardrails: Partial<Guardrails>) => void;
  saveWorkflow: (nodes: WorkflowNode[], connections: WorkflowConnection[]) => void;
  runScenario: (scenarioId: string) => void;
  advanceScenarioStep: (scenarioId: string) => void;
  addActivity: (type: 'agent' | 'user' | 'system', message: string, amount?: number, txId?: string) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  chartData: {
    '7D': any[];
    '30D': any[];
    '90D': any[];
    '1Y': any[];
  };
}

const RecoveryStateContext = createContext<RecoveryStateContextProps | undefined>(undefined);

export const RecoveryStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base State
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [insights] = useState<Insight[]>(initialInsights);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialWorkflowNodes);
  const [workflowConnections, setWorkflowConnections] = useState<WorkflowConnection[]>(initialWorkflowConnections);
  const [guardrails, setGuardrails] = useState<Guardrails>(initialGuardrails);

  // Dynamic KPIs incremental adjustments
  const [recoveryStats, setRecoveryStats] = useState({
    baseRisk: 1248000,
    baseRecovered: 832500,
    baseCount: 327,
    baseActions: 1284,
    baseAvgTime: 42
  });

  // Global Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Scenario Sandbox State
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [scenarioResults, setScenarioResults] = useState<Record<string, { step: number; status: string; log: string[] }>>({
    'scenario-1': { step: 0, status: 'idle', log: [] },
    'scenario-2': { step: 0, status: 'idle', log: [] },
    'scenario-3': { step: 0, status: 'idle', log: [] },
    'scenario-4': { step: 0, status: 'idle', log: [] }
  });

  // Helper to add activity
  const addActivity = (type: 'agent' | 'user' | 'system', message: string, amount?: number, txId?: string) => {
    const newAct: Activity = {
      id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      type,
      message,
      amount,
      transactionId: txId
    };
    setActivities(prev => [newAct, ...prev].slice(0, 100)); // Limit to last 100 items
  };

  // 1. Approve suggested AI action
  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        addActivity('user', `Approved AI Action "${tx.recommendedAction}" for transaction ${tx.id}`, tx.amount, tx.id);
        
        // Simulate immediate transition to recovering
        setTimeout(() => {
          setTransactions(current => current.map(ctx => {
            if (ctx.id === id) {
              const success = Math.random() < (ctx.recoveryProbability / 100);
              const nextStatus = success ? 'Recovered' : 'Failed';
              
              addActivity(
                success ? 'system' : 'agent',
                success 
                  ? `Payment ${ctx.id} successfully recovered via ${ctx.recommendedAction}! ₹${ctx.amount.toLocaleString()} credited.`
                  : `Automated recovery retry for ${ctx.id} failed after maximum retry attempts.`,
                ctx.amount,
                ctx.id
              );

              if (success) {
                setRecoveryStats(prevStats => ({
                  ...prevStats,
                  baseRecovered: prevStats.baseRecovered + ctx.amount,
                  baseRisk: Math.max(prevStats.baseRisk - ctx.amount, 0),
                  baseCount: prevStats.baseCount + 1,
                  baseActions: prevStats.baseActions + 1
                }));
              } else {
                setRecoveryStats(prevStats => ({
                  ...prevStats,
                  baseRisk: Math.max(prevStats.baseRisk - ctx.amount, 0),
                  baseActions: prevStats.baseActions + 1
                }));
              }

              return {
                ...ctx,
                status: nextStatus,
                history: [
                  ...ctx.history,
                  { status: 'Recovering', message: 'Executing approved recovery action.', timestamp: new Date().toISOString() },
                  { status: nextStatus, message: success ? 'Revenue successfully recovered.' : 'Recovery failed.', timestamp: new Date().toISOString() }
                ]
              };
            }
            return ctx;
          }));
        }, 1200);

        return {
          ...tx,
          status: 'Recovering',
          history: [
            ...tx.history,
            { status: 'Scheduled', message: 'Action manually approved by operator.', timestamp: new Date().toISOString() }
          ]
        };
      }
      return tx;
    }));
  };

  // 2. Reject suggested AI action
  const rejectTransaction = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        addActivity('user', `Rejected AI Action "${tx.recommendedAction}" for transaction ${tx.id}. Closed case.`, tx.amount, tx.id);
        setRecoveryStats(prevStats => ({
          ...prevStats,
          baseRisk: Math.max(prevStats.baseRisk - tx.amount, 0),
          baseActions: prevStats.baseActions + 1
        }));
        return {
          ...tx,
          status: 'Failed',
          history: [
            ...tx.history,
            { status: 'Failed', message: 'AI Action manually rejected by operator. Case closed.', timestamp: new Date().toISOString() }
          ]
        };
      }
      return tx;
    }));
  };

  // 3. Modify suggested AI action
  const modifyTransaction = (id: string, action: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        addActivity('user', `Modified recovery action for ${tx.id} to "${action}" (was "${tx.recommendedAction}")`, tx.amount, tx.id);
        return {
          ...tx,
          recommendedAction: action,
          history: [
            ...tx.history,
            { status: 'Needs Review', message: `Recovery action modified to: ${action} by operator.`, timestamp: new Date().toISOString() }
          ]
        };
      }
      return tx;
    }));
  };

  // 4. Update guardrails settings
  const updateGuardrails = (newGuardrails: Partial<Guardrails>) => {
    setGuardrails(prev => {
      const updated = { ...prev, ...newGuardrails };
      addActivity('user', 'AI Guardrails configurations updated.');
      return updated;
    });
  };

  // 5. Save workflow configurations
  const saveWorkflow = (nodes: WorkflowNode[], connections: WorkflowConnection[]) => {
    setWorkflowNodes(nodes);
    setWorkflowConnections(connections);
    addActivity('user', 'Custom AI Recovery Workflow configuration saved successfully.');
  };

  // 6. Global simulation runner
  const runGlobalSimulation = (onComplete?: () => void) => {
    setIsSimulating(true);
    setSimulationResult(null);
    addActivity('system', 'Initiating full global recovery simulation across queue...');

    let cases: Transaction[] = [];
    let recoveredAmt = 0;
    let totalRiskAmt = 0;
    let recoveredCount = 0;

    // Generate 12 simulated random transactions
    for (let i = 0; i < 12; i++) {
      const tx = generateRandomTransaction(i);
      cases.push(tx);
      totalRiskAmt += tx.amount;
      
      // Compute simulation outcome
      const isRecovered = Math.random() < (tx.recoveryProbability / 100);
      if (isRecovered) {
        recoveredAmt += tx.amount;
        recoveredCount++;
      }
    }

    // Step-by-step progress duration (simulate steps over 5 seconds)
    setTimeout(() => {
      // Append these transactions to history
      setTransactions(prev => {
        const updatedCases = cases.map((tx, idx) => {
          const success = Math.random() < (tx.recoveryProbability / 100);
          const finalStatus: Transaction['status'] = success ? 'Recovered' : 'Failed';
          return {
            ...tx,
            status: finalStatus,
            history: [
              ...tx.history,
              { status: 'Recovering', message: 'Simulation automated run.', timestamp: new Date().toISOString() },
              { status: finalStatus, message: success ? 'Recovered via automation.' : 'Exhausted retry limits.', timestamp: new Date().toISOString() }
            ]
          };
        });
        return [...updatedCases, ...prev].slice(0, 50); // limit local array
      });

      // Update counters
      setRecoveryStats(prev => ({
        ...prev,
        baseRisk: prev.baseRisk + (totalRiskAmt - recoveredAmt),
        baseRecovered: prev.baseRecovered + recoveredAmt,
        baseCount: prev.baseCount + recoveredCount,
        baseActions: prev.baseActions + 12
      }));

      // Set simulation results
      const res: SimulationResult = {
        casesAnalyzed: 50,
        opportunitiesDetected: 31,
        actionsExecuted: 24,
        revenueAtRisk: totalRiskAmt,
        estimatedRecovered: recoveredAmt,
        recoveryRate: Math.round((recoveredCount / 12) * 1000) / 10
      };

      setSimulationResult(res);
      setIsSimulating(false);
      
      addActivity('system', `Global simulation complete. Recovered: ₹${recoveredAmt.toLocaleString()} across ${recoveredCount} transactions.`);
      
      if (onComplete) onComplete();
    }, 4500);
  };

  // 7. Scenario Sandbox runner
  const runScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setScenarioResults(prev => ({
      ...prev,
      [scenarioId]: {
        step: 1,
        status: 'running',
        log: ['[DETECT] Scanning payment logs...', '[DETECT] Detected failed transaction event.']
      }
    }));
  };

  const advanceScenarioStep = (scenarioId: string) => {
    setScenarioResults(prev => {
      const current = prev[scenarioId];
      const nextStep = current.step + 1;
      
      let nextLog = [...current.log];
      let nextStatus = 'running';

      if (scenarioId === 'scenario-1') {
        // Failed Card Payment
        if (nextStep === 2) {
          nextLog.push('[ANALYZE] Error code: Bank Decline (Code 05).');
          nextLog.push('[ANALYZE] Checking payment history: 92% previous card health.');
        } else if (nextStep === 3) {
          nextLog.push('[PREDICT] AI Recovery Probability calculated: 82%.');
          nextLog.push('[PREDICT] High confidence. Transaction within limits.');
        } else if (nextStep === 4) {
          nextLog.push('[DECIDE] Recommended action: Swapped to secondary HDFC gateway node and scheduled a delayed retry (wait 30 mins).');
        } else if (nextStep === 5) {
          nextLog.push('[EXECUTE] Retrying transaction RP92831 via alternate gateway...');
        } else if (nextStep === 6) {
          nextLog.push('[COMPLETE] Smart retry successful! ₹7,999 recovered.');
          nextStatus = 'completed';
          addActivity('system', 'Scenario Sandbox: Card Payment transaction RP92831 recovered successfully.', 7999);
          setRecoveryStats(s => ({
            ...s,
            baseRecovered: s.baseRecovered + 7999,
            baseCount: s.baseCount + 1,
            baseActions: s.baseActions + 1
          }));
        }
      } else if (scenarioId === 'scenario-2') {
        // Abandoned Checkout
        if (nextStep === 2) {
          nextLog.push('[ANALYZE] Checkout closed during redirection.');
          nextLog.push('[ANALYZE] Device signature indicates mobile safari browser.');
        } else if (nextStep === 3) {
          nextLog.push('[PREDICT] AI Recovery Probability: 88%.');
          nextLog.push('[PREDICT] Channel conversion score: WhatsApp link high priority (95%).');
        } else if (nextStep === 4) {
          nextLog.push('[DECIDE] Recommended action: Send interactive WhatsApp checkout recovery link containing dynamic UPI payment URL.');
        } else if (nextStep === 5) {
          nextLog.push('[EXECUTE] Dispatching customized WhatsApp message payload...');
        } else if (nextStep === 6) {
          nextLog.push('[COMPLETE] Customer clicked link & authenticated UPI payment. ₹2,499 recovered.');
          nextStatus = 'completed';
          addActivity('system', 'Scenario Sandbox: Abandoned checkout recovered via WhatsApp.', 2499);
          setRecoveryStats(s => ({
            ...s,
            baseRecovered: s.baseRecovered + 2499,
            baseCount: s.baseCount + 1,
            baseActions: s.baseActions + 1
          }));
        }
      } else if (scenarioId === 'scenario-3') {
        // Subscription Renewal Failure
        if (nextStep === 2) {
          nextLog.push('[ANALYZE] Mandate decline: Insufficient Funds.');
          nextLog.push('[ANALYZE] Bank: State Bank of India.');
        } else if (nextStep === 3) {
          nextLog.push('[PREDICT] AI Recovery Probability: 68%.');
          nextLog.push('[PREDICT] Predict account top-up trends based on salary schedule logic.');
        } else if (nextStep === 4) {
          nextLog.push('[DECIDE] Recommended action: Queue subscription retry delay. Wait 24 hours to match user pay cycles.');
        } else if (nextStep === 5) {
          nextLog.push('[EXECUTE] Mandate queued in cron pipeline...');
        } else if (nextStep === 6) {
          nextLog.push('[COMPLETE] Mandate retry triggered. Cleared by SBI server. ₹4,999 recovered.');
          nextStatus = 'completed';
          addActivity('system', 'Scenario Sandbox: Subscription payment recovered after 24h queue delay.', 4999);
          setRecoveryStats(s => ({
            ...s,
            baseRecovered: s.baseRecovered + 4999,
            baseCount: s.baseCount + 1,
            baseActions: s.baseActions + 1
          }));
        }
      } else if (scenarioId === 'scenario-4') {
        // High-Value Payment Failure
        if (nextStep === 2) {
          nextLog.push('[ANALYZE] High-Value transaction. Amount: ₹45,000.');
          nextLog.push('[ANALYZE] Failure code: Card limit exceeded.');
        } else if (nextStep === 3) {
          nextLog.push('[PREDICT] AI Recovery Probability: 52%.');
          nextLog.push('[PREDICT] Confidence high but transaction exceeds Guardrail limit (₹5,000).');
        } else if (nextStep === 4) {
          nextLog.push('[DECIDE] Recommended action: Flag for manual dashboard approval. Queue WhatsApp template message.');
        } else if (nextStep === 5) {
          nextLog.push('[EXECUTE] Dispatching manual verification cards to agent desk...');
        } else if (nextStep === 6) {
          nextLog.push('[COMPLETE] Manual authorization given. Recovery link generated and sent. User authorized alternative netbanking route. ₹45,000 recovered.');
          nextStatus = 'completed';
          addActivity('system', 'Scenario Sandbox: High-value transaction recovered successfully after manual verification.', 45000);
          setRecoveryStats(s => ({
            ...s,
            baseRecovered: s.baseRecovered + 45000,
            baseCount: s.baseCount + 1,
            baseActions: s.baseActions + 1
          }));
        }
      }

      return {
        ...prev,
        [scenarioId]: {
          step: nextStep,
          status: nextStatus,
          log: nextLog
        }
      };
    });
  };

  // Compile calculations
  const dynamicStats = {
    revenueAtRisk: Math.round(recoveryStats.baseRisk),
    revenueRecovered: Math.round(recoveryStats.baseRecovered),
    recoveryRate: Math.round((recoveryStats.baseRecovered / (recoveryStats.baseRisk + recoveryStats.baseRecovered)) * 1000) / 10,
    paymentsRecovered: recoveryStats.baseCount,
    aiActions: recoveryStats.baseActions,
    avgRecoveryTime: recoveryStats.baseAvgTime
  };

  // Generate charts data dynamically
  const generateChartData = () => {
    const dates7D = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data7D = dates7D.map((day, index) => {
      const seed = index + 1;
      return {
        name: day,
        'At Risk': Math.round(15000 * seed * 1.5),
        'Recovered': Math.round(32000 * seed * 1.8),
        'Lost': Math.round(4000 * seed * 0.8),
      };
    });

    const dates30D = Array.from({ length: 6 }, (_, i) => `W${i + 1}`);
    const data30D = dates30D.map((week, index) => {
      const seed = index + 1;
      return {
        name: week,
        'At Risk': Math.round(60000 * seed * 1.2),
        'Recovered': Math.round(120000 * seed * 1.6),
        'Lost': Math.round(15000 * seed * 0.9),
      };
    });

    const dates90D = ['May', 'Jun', 'Jul', 'Aug'];
    const data90D = dates90D.map((month, index) => {
      const seed = index + 1;
      return {
        name: month,
        'At Risk': Math.round(180000 * seed * 0.9),
        'Recovered': Math.round(380000 * seed * 1.3),
        'Lost': Math.round(42000 * seed * 0.8),
      };
    });

    const dates1Y = ['Q1', 'Q2', 'Q3', 'Q4'];
    const data1Y = dates1Y.map((q, index) => {
      const seed = index + 1;
      return {
        name: q,
        'At Risk': Math.round(480000 * seed * 0.85),
        'Recovered': Math.round(1250000 * seed * 1.4),
        'Lost': Math.round(120000 * seed * 0.9),
      };
    });

    return { '7D': data7D, '30D': data30D, '90D': data90D, '1Y': data1Y };
  };

  const chartData = generateChartData();

  return (
    <RecoveryStateContext.Provider value={{
      transactions,
      customers,
      activities,
      insights,
      workflowNodes,
      workflowConnections,
      guardrails,
      stats: dynamicStats,
      simulationResult,
      isSimulating,
      activeScenarioId,
      scenarioResults,
      runGlobalSimulation,
      approveTransaction,
      rejectTransaction,
      modifyTransaction,
      updateGuardrails,
      saveWorkflow,
      runScenario,
      advanceScenarioStep,
      addActivity,
      setTransactions,
      chartData
    }}>
      {children}
    </RecoveryStateContext.Provider>
  );
};

export const useRecoveryState = () => {
  const context = useContext(RecoveryStateContext);
  if (context === undefined) {
    throw new Error('useRecoveryState must be used within a RecoveryStateProvider');
  }
  return context;
};
