import { Transaction, Customer, Activity, Insight, WorkflowNode, WorkflowConnection, Guardrails } from '../types/types';

export const initialTransactions: Transaction[] = [
  {
    id: 'RP92831',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@gmail.com',
    amount: 7999,
    paymentMethod: 'Card',
    failureReason: 'Bank Decline',
    recoveryProbability: 82,
    aiConfidence: 91,
    recommendedAction: 'Delayed retry',
    status: 'Needs Review',
    timestamp: '2026-08-21T16:30:00Z',
    history: [
      { status: 'Failed', message: 'Transaction initiated. Failed with error code: DE021 (Bank Decline).', timestamp: '2026-08-21T16:30:00Z' },
      { status: 'Needs Review', message: 'AI Agent flagged case. Recommended action: Delayed retry. Reason: Strong historical card success rate.', timestamp: '2026-08-21T16:31:12Z' }
    ]
  },
  {
    id: 'RP88372',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@yahoo.com',
    amount: 1249,
    paymentMethod: 'UPI',
    failureReason: 'Timeout',
    recoveryProbability: 95,
    aiConfidence: 98,
    recommendedAction: 'WhatsApp recovery link',
    status: 'Scheduled',
    timestamp: '2026-08-21T16:15:00Z',
    history: [
      { status: 'Failed', message: 'UPI transaction timed out. Error code: TO_TIMEOUT_NPCI.', timestamp: '2026-08-21T16:15:00Z' },
      { status: 'Scheduled', message: 'AI Agent auto-scheduled WhatsApp recovery message for 2026-08-21T16:45:00Z.', timestamp: '2026-08-21T16:16:05Z' }
    ]
  },
  {
    id: 'RP74639',
    customerName: 'Amit Verma',
    customerEmail: 'amit.verma@outlook.com',
    amount: 15000,
    paymentMethod: 'Card',
    failureReason: 'Expired Card',
    recoveryProbability: 45,
    aiConfidence: 85,
    recommendedAction: 'Email update request',
    status: 'Needs Review',
    timestamp: '2026-08-21T15:45:00Z',
    history: [
      { status: 'Failed', message: 'Card authentication failed. Expiration date invalid.', timestamp: '2026-08-21T15:45:00Z' },
      { status: 'Needs Review', message: 'AI recommended: Email client for billing details update. Low probability due to expired card status.', timestamp: '2026-08-21T15:46:20Z' }
    ]
  },
  {
    id: 'RP93021',
    customerName: 'Anjali Desai',
    customerEmail: 'anjali.desai@corporate.in',
    amount: 29999,
    paymentMethod: 'Netbanking',
    failureReason: 'Technical Failure',
    recoveryProbability: 78,
    aiConfidence: 89,
    recommendedAction: 'Route to secondary gateway & retry',
    status: 'Recovering',
    timestamp: '2026-08-21T15:20:00Z',
    history: [
      { status: 'Failed', message: 'Gateway terminal error: 502 Bad Gateway.', timestamp: '2026-08-21T15:20:00Z' },
      { status: 'Recovering', message: 'Triggered gateway rerouting. Switched to alternate HDFC node. Action in progress.', timestamp: '2026-08-21T15:22:10Z' }
    ]
  },
  {
    id: 'RP64811',
    customerName: 'Sandeep Nair',
    customerEmail: 'sandeep.nair@live.com',
    amount: 3200,
    paymentMethod: 'Wallet',
    failureReason: 'Insufficient Funds',
    recoveryProbability: 62,
    aiConfidence: 80,
    recommendedAction: 'Delayed retry in 2 hours',
    status: 'Scheduled',
    timestamp: '2026-08-21T14:50:00Z',
    history: [
      { status: 'Failed', message: 'Wallet payment failed. Insufficient funds in user account.', timestamp: '2026-08-21T14:50:00Z' },
      { status: 'Scheduled', message: 'Scheduled retry. Analyzing user top-up patterns (usually topped up in 2 hours).', timestamp: '2026-08-21T14:51:30Z' }
    ]
  },
  {
    id: 'RP55219',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.reddy@gmail.com',
    amount: 6500,
    paymentMethod: 'UPI',
    failureReason: 'Abandoned Checkout',
    recoveryProbability: 88,
    aiConfidence: 94,
    recommendedAction: 'WhatsApp promo recovery link',
    status: 'Recovered',
    timestamp: '2026-08-21T14:10:00Z',
    history: [
      { status: 'Failed', message: 'User closed checkout interface after entering VPA details.', timestamp: '2026-08-21T14:10:00Z' },
      { status: 'Scheduled', message: 'WhatsApp checkout recovery link generated and sent.', timestamp: '2026-08-21T14:12:00Z' },
      { status: 'Recovered', message: 'Payment recovered via WhatsApp UPI link.', timestamp: '2026-08-21T14:24:18Z' }
    ]
  },
  {
    id: 'RP42198',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.singh@gmail.com',
    amount: 4500,
    paymentMethod: 'Card',
    failureReason: 'Bank Decline',
    recoveryProbability: 85,
    aiConfidence: 90,
    recommendedAction: 'Delayed retry',
    status: 'Recovered',
    timestamp: '2026-08-21T13:40:00Z',
    history: [
      { status: 'Failed', message: 'Transaction declined by bank server. Code: E01.', timestamp: '2026-08-21T13:40:00Z' },
      { status: 'Scheduled', message: 'AI scheduled automatic smart retry in 15 mins.', timestamp: '2026-08-21T13:41:00Z' },
      { status: 'Recovering', message: 'Executing smart retry through secondary HDFC card gateway.', timestamp: '2026-08-21T13:56:00Z' },
      { status: 'Recovered', message: 'Transaction completed. ₹4,500 successfully recovered.', timestamp: '2026-08-21T13:56:42Z' }
    ]
  },
  {
    id: 'RP39821',
    customerName: 'Kavita Joshi',
    customerEmail: 'kavita.joshi@gmail.com',
    amount: 1999,
    paymentMethod: 'UPI',
    failureReason: 'Incorrect Details',
    recoveryProbability: 70,
    aiConfidence: 82,
    recommendedAction: 'Send SMS checkup link',
    status: 'Failed',
    timestamp: '2026-08-21T12:00:00Z',
    history: [
      { status: 'Failed', message: 'Invalid UPI ID format. User entered incorrect VPA.', timestamp: '2026-08-21T12:00:00Z' },
      { status: 'Scheduled', message: 'SMS payment correction link sent.', timestamp: '2026-08-21T12:01:30Z' },
      { status: 'Recovering', message: 'User clicked link, but failed to complete in 15 mins.', timestamp: '2026-08-21T12:17:00Z' },
      { status: 'Failed', message: 'Recovery expired. Transaction marked as failed.', timestamp: '2026-08-21T12:35:00Z' }
    ]
  },
  {
    id: 'RP32190',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.mehta@gmail.com',
    amount: 11200,
    paymentMethod: 'Card',
    failureReason: 'Subscription Failure',
    recoveryProbability: 79,
    aiConfidence: 88,
    recommendedAction: 'Delayed retry next morning',
    status: 'Scheduled',
    timestamp: '2026-08-21T11:10:00Z',
    history: [
      { status: 'Failed', message: 'Recurring mandate execution failed: Authorization expired.', timestamp: '2026-08-21T11:10:00Z' },
      { status: 'Scheduled', message: 'Mandate scheduled for retry during bank maintenance window close (morning 8 AM).', timestamp: '2026-08-21T11:11:15Z' }
    ]
  },
  {
    id: 'RP29983',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@gmail.com',
    amount: 899,
    paymentMethod: 'UPI',
    failureReason: 'Incorrect Details',
    recoveryProbability: 92,
    aiConfidence: 96,
    recommendedAction: 'WhatsApp recovery link',
    status: 'Recovered',
    timestamp: '2026-08-21T10:15:00Z',
    history: [
      { status: 'Failed', message: 'Incorrect VPA handle: rajesh@okaxis (does not exist).', timestamp: '2026-08-21T10:15:00Z' },
      { status: 'Scheduled', message: 'AI recovery text dispatched via WhatsApp with active dynamic QR Code.', timestamp: '2026-08-21T10:16:00Z' },
      { status: 'Recovered', message: 'Transaction successful via WhatsApp dynamic QR. ₹899 recovered.', timestamp: '2026-08-21T10:22:11Z' }
    ]
  },
  {
    id: 'RP28491',
    customerName: 'Amit Verma',
    customerEmail: 'amit.verma@outlook.com',
    amount: 4999,
    paymentMethod: 'Card',
    failureReason: 'Insufficient Funds',
    recoveryProbability: 68,
    aiConfidence: 81,
    recommendedAction: 'Delayed retry in 1 hour',
    status: 'Recovered',
    timestamp: '2026-08-21T09:30:00Z',
    history: [
      { status: 'Failed', message: 'Subscription billing failed: Insufficient funds.', timestamp: '2026-08-21T09:30:00Z' },
      { status: 'Scheduled', message: 'Scheduled retry. Analyzing user account patterns (HDFC salary deposit date).', timestamp: '2026-08-21T09:31:00Z' },
      { status: 'Recovered', message: 'Smart retry completed. Successful charge of ₹4,999.', timestamp: '2026-08-21T10:35:10Z' }
    ]
  },
  {
    id: 'RP19822',
    customerName: 'Anjali Desai',
    customerEmail: 'anjali.desai@corporate.in',
    amount: 5000,
    paymentMethod: 'Card',
    failureReason: 'Bank Decline',
    recoveryProbability: 75,
    aiConfidence: 84,
    recommendedAction: 'Delayed retry',
    status: 'Recovered',
    timestamp: '2026-08-20T18:30:00Z',
    history: [
      { status: 'Failed', message: 'Card failed with code: 05 (Decline).', timestamp: '2026-08-20T18:30:00Z' },
      { status: 'Recovered', message: 'Recovered via gateway fallback retry.', timestamp: '2026-08-20T18:55:00Z' }
    ]
  },
  {
    id: 'RP19488',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@gmail.com',
    amount: 15000,
    paymentMethod: 'Netbanking',
    failureReason: 'Timeout',
    recoveryProbability: 80,
    aiConfidence: 87,
    recommendedAction: 'Send Email recovery link',
    status: 'Recovered',
    timestamp: '2026-08-20T17:10:00Z',
    history: [
      { status: 'Failed', message: 'Session timed out on SBI portal check.', timestamp: '2026-08-20T17:10:00Z' },
      { status: 'Recovered', message: 'User completed via email paylink in 8 minutes.', timestamp: '2026-08-20T17:18:44Z' }
    ]
  },
  {
    id: 'RP18400',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.singh@gmail.com',
    amount: 9500,
    paymentMethod: 'Card',
    failureReason: 'Expired Card',
    recoveryProbability: 40,
    aiConfidence: 75,
    recommendedAction: 'Email update request',
    status: 'Failed',
    timestamp: '2026-08-20T15:20:00Z',
    history: [
      { status: 'Failed', message: 'Card validation failed. Expired card date.', timestamp: '2026-08-20T15:20:00Z' },
      { status: 'Failed', message: 'Alerts sent but card could not be renewed. Marked as Failed.', timestamp: '2026-08-20T23:00:00Z' }
    ]
  },
  {
    id: 'RP18021',
    customerName: 'Sandeep Nair',
    customerEmail: 'sandeep.nair@live.com',
    amount: 1800,
    paymentMethod: 'UPI',
    failureReason: 'Abandoned Checkout',
    recoveryProbability: 90,
    aiConfidence: 95,
    recommendedAction: 'WhatsApp recovery link',
    status: 'Recovered',
    timestamp: '2026-08-20T14:00:00Z',
    history: [
      { status: 'Failed', message: 'Checkout screen closed.', timestamp: '2026-08-20T14:00:00Z' },
      { status: 'Recovered', message: 'Recovered via WhatsApp automation.', timestamp: '2026-08-20T14:08:12Z' }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    ltv: 125000,
    successfulPayments: 24,
    failedPayments: 2,
    revenueAtRisk: 7999,
    recoveryProbability: 82,
    aiAnalysis: 'High LTV enterprise client. High-quality historical payment success. Decline pattern matches temporary server issues rather than insufficient credit limit.',
    paymentHistory: [
      { transactionId: 'RP92831', amount: 7999, status: 'Failed', timestamp: '2026-08-21T16:30:00Z', paymentMethod: 'Card' },
      { transactionId: 'RP19488', amount: 15000, status: 'Recovered', timestamp: '2026-08-20T17:10:00Z', paymentMethod: 'Netbanking' },
      { transactionId: 'RP09281', amount: 12000, status: 'Success', timestamp: '2026-07-15T11:20:00Z', paymentMethod: 'Card' },
      { transactionId: 'RP01928', amount: 12000, status: 'Success', timestamp: '2026-06-15T09:12:00Z', paymentMethod: 'Card' }
    ]
  },
  {
    id: 'CUST-002',
    name: 'Priya Patel',
    email: 'priya.patel@yahoo.com',
    phone: '+91 87654 32109',
    ltv: 24900,
    successfulPayments: 12,
    failedPayments: 1,
    revenueAtRisk: 1249,
    recoveryProbability: 95,
    aiAnalysis: 'Customer frequently transacts via UPI. The current timeout is a standard NPCI network lapse. Recovery likelihood via direct WhatsApp retry is nearly guaranteed.',
    paymentHistory: [
      { transactionId: 'RP88372', amount: 1249, status: 'Failed', timestamp: '2026-08-21T16:15:00Z', paymentMethod: 'UPI' },
      { transactionId: 'RP02831', amount: 1249, status: 'Success', timestamp: '2026-07-21T10:15:00Z', paymentMethod: 'UPI' }
    ]
  },
  {
    id: 'CUST-003',
    name: 'Amit Verma',
    email: 'amit.verma@outlook.com',
    phone: '+91 76543 21098',
    ltv: 85000,
    successfulPayments: 9,
    failedPayments: 2,
    revenueAtRisk: 15000,
    recoveryProbability: 56,
    aiAnalysis: 'Mixed payment pattern. The recent failure is an Expired Card. Action requires manual update input from client, lowering recovery probability.',
    paymentHistory: [
      { transactionId: 'RP74639', amount: 15000, status: 'Failed', timestamp: '2026-08-21T15:45:00Z', paymentMethod: 'Card' },
      { transactionId: 'RP28491', amount: 4999, status: 'Recovered', timestamp: '2026-08-21T09:30:00Z', paymentMethod: 'Card' }
    ]
  },
  {
    id: 'CUST-004',
    name: 'Anjali Desai',
    email: 'anjali.desai@corporate.in',
    phone: '+91 65432 10987',
    ltv: 185000,
    successfulPayments: 41,
    failedPayments: 1,
    revenueAtRisk: 29999,
    recoveryProbability: 78,
    aiAnalysis: 'Corporate user. Gateway technical failure. System recommends immediate rerouting to secondary bank nodes, which has a 78% immediate clearance rating.',
    paymentHistory: [
      { transactionId: 'RP93021', amount: 29999, status: 'Failed', timestamp: '2026-08-21T15:20:00Z', paymentMethod: 'Netbanking' },
      { transactionId: 'RP19822', amount: 5000, status: 'Recovered', timestamp: '2026-08-20T18:30:00Z', paymentMethod: 'Card' }
    ]
  },
  {
    id: 'CUST-005',
    name: 'Sandeep Nair',
    email: 'sandeep.nair@live.com',
    phone: '+91 95432 10986',
    ltv: 42000,
    successfulPayments: 15,
    failedPayments: 1,
    revenueAtRisk: 3200,
    recoveryProbability: 62,
    aiAnalysis: 'Fails due to wallet balances. AI has mapped user top-up habits (usually funds wallet on Friday evenings). Scheduled retry set for that time.',
    paymentHistory: [
      { transactionId: 'RP64811', amount: 3200, status: 'Failed', timestamp: '2026-08-21T14:50:00Z', paymentMethod: 'Wallet' }
    ]
  },
  {
    id: 'CUST-006',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    phone: '+91 85432 10985',
    ltv: 95000,
    successfulPayments: 31,
    failedPayments: 0,
    revenueAtRisk: 0,
    recoveryProbability: 88,
    aiAnalysis: 'Extremely loyal client. High success rate. Recovered successfully from checkout abandonment using automated WhatsApp reminders.',
    paymentHistory: [
      { transactionId: 'RP55219', amount: 6500, status: 'Recovered', timestamp: '2026-08-21T14:10:00Z', paymentMethod: 'UPI' }
    ]
  },
  {
    id: 'CUST-007',
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    phone: '+91 75432 10984',
    ltv: 140000,
    successfulPayments: 28,
    failedPayments: 2,
    revenueAtRisk: 0,
    recoveryProbability: 85,
    aiAnalysis: 'Card transactor. Successfully recovered ₹4,500 via smart retry after a Bank Decline. Total risk has been cleared for this period.',
    paymentHistory: [
      { transactionId: 'RP42198', amount: 4500, status: 'Recovered', timestamp: '2026-08-21T13:40:00Z', paymentMethod: 'Card' },
      { transactionId: 'RP18400', amount: 9500, status: 'Failed', timestamp: '2026-08-20T15:20:00Z', paymentMethod: 'Card' }
    ]
  },
  {
    id: 'CUST-008',
    name: 'Kavita Joshi',
    email: 'kavita.joshi@gmail.com',
    phone: '+91 65432 10983',
    ltv: 12000,
    successfulPayments: 4,
    failedPayments: 1,
    revenueAtRisk: 1999,
    recoveryProbability: 0,
    aiAnalysis: 'Low value customer. Entered incorrect VPA and ignored recovery link. Transaction expired.',
    paymentHistory: [
      { transactionId: 'RP39821', amount: 1999, status: 'Failed', timestamp: '2026-08-21T12:00:00Z', paymentMethod: 'UPI' }
    ]
  }
];

export const initialActivities: Activity[] = [
  { id: 'ACT-001', timestamp: '2026-08-21T16:31:12Z', type: 'agent', message: 'AI analyzed failed payment RP92831 (Rahul Sharma). Recovery probability predicted: 82%. Action selected: Delayed retry.', amount: 7999, transactionId: 'RP92831' },
  { id: 'ACT-002', timestamp: '2026-08-21T16:16:05Z', type: 'agent', message: 'AI scheduled WhatsApp recovery link for transaction RP88372 (Priya Patel) with NPCI timeout bypass.', amount: 1249, transactionId: 'RP88372' },
  { id: 'ACT-003', timestamp: '2026-08-21T15:46:20Z', type: 'agent', message: 'AI flagged RP74639 (Amit Verma) for manual review. Expired card status requires customer input.', amount: 15000, transactionId: 'RP74639' },
  { id: 'ACT-004', timestamp: '2026-08-21T15:22:10Z', type: 'agent', message: 'AI initiated route fallback for transaction RP93021 (Anjali Desai). Active retry on secondary HDFC terminal.', amount: 29999, transactionId: 'RP93021' },
  { id: 'ACT-005', timestamp: '2026-08-21T14:24:18Z', type: 'system', message: 'Transaction RP55219 (Sneha Reddy) successfully recovered via WhatsApp UPI link.', amount: 6500, transactionId: 'RP55219' },
  { id: 'ACT-006', timestamp: '2026-08-21T13:56:42Z', type: 'system', message: 'AI auto-retry recovered ₹4,500 for transaction RP42198 (Vikram Singh).', amount: 4500, transactionId: 'RP42198' },
  { id: 'ACT-007', timestamp: '2026-08-21T10:22:11Z', type: 'system', message: 'Transaction RP29983 (Rajesh Kumar) recovered via QR Code.', amount: 899, transactionId: 'RP29983' }
];

export const initialInsights: Insight[] = [
  {
    id: 'INS-001',
    title: 'High Recovery Segment identified',
    description: 'Returning corporate customers transacting above ₹10,000 via Netbanking have a 78% higher recovery rate when re-routed to alternate gateway configurations.',
    impact: '+₹2,40,000 / month',
    confidence: 94,
    action: 'Enable automatic gateway routing bypass for VIP corporate bins.',
    category: 'segment'
  },
  {
    id: 'INS-002',
    title: 'WhatsApp exceeds SMS by 310%',
    description: 'For abandoned checkout failures (primarily UPI timeouts), sending interactive WhatsApp links with pre-filled VPA values yields a 66% conversion versus 16% on standard SMS links.',
    impact: 'Increase recovery rate by 22%',
    confidence: 98,
    action: 'Set WhatsApp as the default recovery communication node in checkout automation.',
    category: 'channel'
  },
  {
    id: 'INS-003',
    title: 'Optimal delay window found',
    description: 'Bank decline retries are 42% more successful if delayed by 30-45 minutes compared to immediate retries, minimizing failures due to active downtime windows.',
    impact: 'Reduce secondary failure rates by 14%',
    confidence: 89,
    action: 'Adjust default retry workflow delays to 30 minutes for code DE021 (declines).',
    category: 'timing'
  }
];

export const initialWorkflowNodes: WorkflowNode[] = [
  { id: 'node-1', type: 'trigger', title: 'Payment Failed', description: 'Triggers when a transaction enters a failed state' },
  { id: 'node-2', type: 'action', title: 'AI Risk Telemetry', description: 'Analyze payment history, BIN code, and reason' },
  { id: 'node-3', type: 'condition', title: 'Probability > 70%?', description: 'Branch based on calculated recovery likelihood', config: { probabilityThreshold: 70 } },
  { id: 'node-4', type: 'delay', title: 'Wait 30 Minutes', description: 'Allows bank temporary downtime to clear', config: { delayMinutes: 30 } },
  { id: 'node-5', type: 'action', title: 'Execute Gateway Retry', description: 'Perform smart retry through alternative route' },
  { id: 'node-6', type: 'action', title: 'Send WhatsApp Recovery Link', description: 'Send dynamic check-out reminder with QR code', config: { channel: 'WhatsApp' } },
  { id: 'node-7', type: 'action', title: 'Manual Escalation', description: 'Queue transaction for human review' }
];

export const initialWorkflowConnections: WorkflowConnection[] = [
  { fromId: 'node-1', toId: 'node-2' },
  { fromId: 'node-2', toId: 'node-3' },
  { fromId: 'node-3', toId: 'node-4' }, // True branch
  { fromId: 'node-3', toId: 'node-7' }, // False branch
  { fromId: 'node-4', toId: 'node-5' },
  { fromId: 'node-5', toId: 'node-6' }  // If retry fails, send link
];

export const initialGuardrails: Guardrails = {
  autoRetry: true,
  sendLinks: true,
  sendWhatsApp: true,
  sendEmail: true,
  autoRefunds: false,
  maxAutonomousAmount: 5000,
  minAiConfidence: 80,
  highValueApprovalRequired: true
};
