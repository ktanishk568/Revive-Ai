import { Transaction, Customer } from '../types/types';

export function calculateRecoveryProbability(
  paymentMethod: 'Card' | 'UPI' | 'Netbanking' | 'Wallet',
  failureReason: string,
  historySuccessRate: number // 0 to 100
): number {
  let baseProb = 50;

  // Failure reason adjustments
  switch (failureReason) {
    case 'Timeout':
      baseProb = 85;
      break;
    case 'Bank Decline':
      baseProb = 75;
      break;
    case 'Abandoned Checkout':
      baseProb = 90;
      break;
    case 'Insufficient Funds':
      baseProb = 60;
      break;
    case 'Incorrect Details':
      baseProb = 70;
      break;
    case 'Technical Failure':
      baseProb = 80;
      break;
    case 'Subscription Failure':
      baseProb = 65;
      break;
    case 'Expired Card':
      baseProb = 35;
      break;
    default:
      baseProb = 50;
  }

  // Payment method adjustments
  if (paymentMethod === 'UPI') baseProb += 8;
  if (paymentMethod === 'Card') baseProb += 3;
  if (paymentMethod === 'Wallet') baseProb += 5;
  if (paymentMethod === 'Netbanking') baseProb -= 5;

  // Customer history adjustments
  if (historySuccessRate > 80) baseProb += 10;
  else if (historySuccessRate < 40) baseProb -= 15;

  // Clamp between 10 and 99
  return Math.min(Math.max(Math.round(baseProb), 10), 99);
}

export function recommendRecoveryAction(
  failureReason: string,
  amount: number
): { action: string; explanation: string; confidence: number } {
  let action = 'Delayed retry';
  let explanation = 'System recommends waiting for gateway resolution.';
  let confidence = 85;

  switch (failureReason) {
    case 'Bank Decline':
      if (amount > 10000) {
        action = 'Gateway swap & retry';
        explanation = 'The bank declined card authorization. AI recommends routing through HDFC secondary gateway node immediately to bypass regional bank failures.';
        confidence = 88;
      } else {
        action = 'Delayed retry';
        explanation = 'The customer has a strong previous payment history and the failure is consistent with a temporary bank decline. A delayed retry in 30 mins has high expected recovery.';
        confidence = 91;
      }
      break;
    case 'Insufficient Funds':
      action = 'SMS & WhatsApp reminder';
      explanation = 'Insufficient funds decline. AI scheduled a polite balance reminder notification via WhatsApp for tomorrow morning, aligned with normal banking salary cycles.';
      confidence = 78;
      break;
    case 'Expired Card':
      action = 'Billing updates request';
      explanation = 'Expired card registered. AI recommends emailing an authenticated self-service page link allowing the customer to safely update card parameters.';
      confidence = 82;
      break;
    case 'Technical Failure':
      action = 'Smart gateway routing';
      explanation = 'VPA terminal gateway timeout. AI successfully shifted the transaction payload to the standby ICICI payment rail for immediate retry.';
      confidence = 94;
      break;
    case 'Timeout':
      action = 'WhatsApp recovery link';
      explanation = 'Customer bank portal session timed out. AI recommends dispatching an interactive WhatsApp payment reminder with a direct pre-configured UPI payment link.';
      confidence = 96;
      break;
    case 'Incorrect Details':
      action = 'WhatsApp interactive QR';
      explanation = 'User entered incorrect card or VPA credentials. System suggests launching a conversational WhatsApp correction prompt featuring a dynamic QR code.';
      confidence = 85;
      break;
    case 'Abandoned Checkout':
      action = 'WhatsApp promo recovery link';
      explanation = 'Checkout window was closed during bank redirection. AI recommends triggering a 5-minute delayed checkout recovery email & WhatsApp flow with a fast-pay checkout button.';
      confidence = 92;
      break;
    case 'Subscription Failure':
      action = 'Mandate retry';
      explanation = 'Subscription renewal mandate failed. AI recommends retrying during standard low-traffic hours (08:00 AM) when bank mandate processors have minimal load.';
      confidence = 80;
      break;
  }

  return { action, explanation, confidence };
}

// Generate realistic dynamic mock cases during the simulation
export function generateRandomTransaction(idNumber: number): Transaction {
  const customerNames = [
    'Ananya Sen', 'Vikram Rao', 'Siddharth Roy', 'Divya Balan',
    'Neha Gupta', 'Rohan Das', 'Pooja Nair', 'Karan Johar',
    'Simran Kaur', 'Aditya Birla', 'Riya Sen', 'Arjun Kapoor'
  ];
  
  const emails = [
    'ananya.sen@gmail.com', 'vikram.rao@outlook.com', 'sid.roy@yahoo.com', 'divya.b@corporate.in',
    'neha.gupta@live.com', 'rohan.das@gmail.com', 'pooja.nair@gmail.com', 'karan@johar.in',
    'simran.k@yahoo.com', 'aditya.birla@corporation.in', 'riya.sen@gmail.com', 'arjun@kapoor.in'
  ];

  const failureReasons: Array<Transaction['failureReason']> = [
    'Bank Decline', 'Insufficient Funds', 'Expired Card', 'Technical Failure',
    'Timeout', 'Incorrect Details', 'Abandoned Checkout', 'Subscription Failure'
  ];

  const paymentMethods: Array<Transaction['paymentMethod']> = ['Card', 'UPI', 'Netbanking', 'Wallet'];
  
  const randomIndex = Math.floor(Math.random() * customerNames.length);
  const name = customerNames[randomIndex];
  const email = emails[randomIndex];
  
  const failure = failureReasons[Math.floor(Math.random() * failureReasons.length)];
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
  
  // Realistic amounts (in INR)
  const amounts = [499, 999, 1499, 2999, 5000, 7999, 12000, 15000, 24999];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  
  const historyRate = Math.floor(Math.random() * 60) + 40; // 40-100%
  const recoveryProbability = calculateRecoveryProbability(paymentMethod, failure, historyRate);
  const { action, explanation, confidence } = recommendRecoveryAction(failure, amount);

  const txId = `RP${Math.floor(10000 + Math.random() * 90000)}`;

  return {
    id: txId,
    customerName: name,
    customerEmail: email,
    amount,
    paymentMethod,
    failureReason: failure,
    recoveryProbability,
    aiConfidence: confidence,
    recommendedAction: action,
    status: Math.random() > 0.4 ? 'Needs Review' : 'Scheduled',
    timestamp: new Date().toISOString(),
    history: [
      { status: 'Failed', message: `Transaction initiated via ${paymentMethod}. Failed due to: ${failure}.`, timestamp: new Date().toISOString() },
      { status: 'Needs Review', message: `AI calculated recovery odds: ${recoveryProbability}%. Proposed: ${action}. Reason: ${explanation}`, timestamp: new Date().toISOString() }
    ]
  };
}
