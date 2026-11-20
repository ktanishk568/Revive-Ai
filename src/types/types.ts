export interface TransactionHistory {
  status: string;
  message: string;
  timestamp: string;
}

export interface Transaction {
  id: string; // e.g. RP92831
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentMethod: 'Card' | 'UPI' | 'Netbanking' | 'Wallet';
  failureReason: 
    | 'Bank Decline'
    | 'Insufficient Funds'
    | 'Expired Card'
    | 'Technical Failure'
    | 'Timeout'
    | 'Incorrect Details'
    | 'Abandoned Checkout'
    | 'Subscription Failure';
  recoveryProbability: number; // 0-100
  aiConfidence: number; // 0-100
  recommendedAction: string;
  status: 'Needs Review' | 'Scheduled' | 'Recovering' | 'Recovered' | 'Failed';
  timestamp: string;
  history: TransactionHistory[];
}

export interface CustomerPayment {
  transactionId: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Recovered';
  timestamp: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ltv: number;
  successfulPayments: number;
  failedPayments: number;
  revenueAtRisk: number;
  recoveryProbability: number;
  paymentHistory: CustomerPayment[];
  aiAnalysis: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  type: 'agent' | 'user' | 'system';
  message: string;
  amount?: number;
  transactionId?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  impact: string;
  confidence: number; // 0-100
  action: string;
  category: 'segment' | 'channel' | 'timing';
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  title: string;
  description: string;
  config?: {
    delayMinutes?: number;
    probabilityThreshold?: number;
    amountLimit?: number;
    channel?: string;
  };
}

export interface WorkflowConnection {
  fromId: string;
  toId: string;
}

export interface Guardrails {
  autoRetry: boolean;
  sendLinks: boolean;
  sendWhatsApp: boolean;
  sendEmail: boolean;
  autoRefunds: boolean;
  maxAutonomousAmount: number;
  minAiConfidence: number;
  highValueApprovalRequired: boolean;
}

export interface SimulationResult {
  casesAnalyzed: number;
  opportunitiesDetected: number;
  actionsExecuted: number;
  revenueAtRisk: number;
  estimatedRecovered: number;
  recoveryRate: number;
}
