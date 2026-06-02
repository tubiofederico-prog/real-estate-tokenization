// Project Types
export type ProjectStatus = 'open' | 'upcoming' | 'funded' | 'in-execution' | 'completed';
export type ProjectType = 'loteo' | 'building' | 'rental' | 'development' | 'fund';

export interface Project {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    address?: string;
  };
  type: ProjectType;
  description: string;
  totalAmount: number;
  raisedAmount: number;
  minInvestment: number;
  estimatedReturn: {
    min: number;
    max: number;
  };
  durationMonths: number;
  status: ProjectStatus;
  progress: number; // 0-100
  image: string;
  tokensTotal: number;
  tokensAvailable: number;
  pricePerToken: number;
  riskLevel: 'low' | 'medium' | 'high';
  trust: number; // 0-100
  lastUpdate: string;
  documents?: string[];
  investorsCount: number;
}

// Token Types
export interface Token {
  id: string;
  projectId: string;
  name: string;
  symbol: string;
  totalSupply: number;
  circulatingSupply: number;
  priceUSD: number;
  holders: number;
  createdAt: string;
  status: 'active' | 'paused' | 'completed';
}

// Investor Types
export type InvestorStatus = 'active' | 'pending' | 'blocked';
export type KYCStatus = 'verified' | 'pending' | 'rejected';

export interface Investor {
  id: string;
  name: string;
  email: string;
  country: string;
  status: InvestorStatus;
  kycStatus: KYCStatus;
  totalInvested: number;
  tokensHeld: number;
  lastActivity: string;
  joinedAt: string;
  riskProfile?: 'conservative' | 'moderate' | 'aggressive';
}

// Portfolio Types
export interface InvestorPortfolio {
  investorId: string;
  projectId: string;
  tokensHeld: number;
  investmentAmount: number;
  currentValue: number;
  estimatedReturn: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'withdrawn';
  nextPaymentDate?: string;
  totalPaymentsReceived: number;
}

// Transaction Types
export type TransactionType = 'investment' | 'withdrawal' | 'deposit' | 'dividend' | 'token_conversion';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  investorId: string;
  projectId?: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  description: string;
  tokensInvolved?: number;
}

// Fund Types
export interface Fund {
  id: string;
  name: string;
  description: string;
  composition: {
    projectId: string;
    percentage: number;
  }[];
  estimatedReturn: {
    min: number;
    max: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  durationMonths: number;
  capitalRaised: number;
  capitalTarget: number;
  investorsCount: number;
  status: 'open' | 'closed';
}

// Dashboard Types
export interface DashboardMetrics {
  totalCapitalTokenized: number;
  activeProjects: number;
  registeredInvestors: number;
  tokensEmitted: number;
  transactionVolume: number;
  averageReturn: number;
}

// Smart Contract Types
export interface SmartContract {
  id: string;
  projectId: string;
  address: string;
  status: 'active' | 'paused' | 'completed';
  rentDistributionPercentage: number;
  paymentSchedule: {
    date: string;
    percentage: number;
  }[];
  executionHistory: {
    date: string;
    amount: number;
    status: 'completed' | 'failed';
  }[];
}
