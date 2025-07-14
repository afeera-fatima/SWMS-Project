export interface User {
  id: string;
  email: string;
  mobile: string;
  fullName: string;
  companyName: string;
  role: 'user' | 'admin';
  credits: number;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface ProjectInfo {
  jobName: string;
  jobNumber: string;
  startDate: string;
  projectAddress: string;
  tradeType: string;
  projectDescription: string;
  duration: number;
  creatorName: string;
  creatorRole: string;
  principalContractor: string;
  projectManager: string;
  siteSupervisor: string;
  authoriserName: string;
  authoriserMobile: string;
  authoriserSignature?: string;
}

export interface WorkTask {
  id: string;
  trade: string;
  taskName: string;
  taskDescription: string;
  toolsEquipment: string;
  ppe: string;
  hazards: string;
  controls: string;
  originalRiskScore: RiskScore;
  residualRiskScore: RiskScore;
  taskComplexity: 'Low' | 'Moderate' | 'High';
  legislation: string;
  order: number;
}

export interface RiskScore {
  magnitude: number;
  likelihood: number;
  score: number;
  riskLevel: 'L' | 'M' | 'H' | 'S';
}

export interface SWMS {
  id: string;
  userId: string;
  status: 'draft' | 'completed' | 'deleted';
  projectInfo: ProjectInfo;
  workTasks: WorkTask[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  isLocked: boolean;
}

export interface AIGenerationRequest {
  jobDescription: string;
  state: string;
  siteEnvironment: string;
  highRiskCategories: string[];
  tradeType: string;
}

export interface DashboardStats {
  credits: number;
  drafts: number;
  completed: number;
  recentDocuments: SWMS[];
}

export const TRADE_TYPES = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'Concreter',
  'Roofer',
  'Painter',
  'Tiler',
  'Glazier',
  'Scaffolder',
  'Crane Operator',
  'Demolition',
  'Excavation',
  'General Construction',
  'HVAC Technician',
  'Steel Fixer',
  'Bricklayer',
  'Landscaper',
  'Other'
];

export const AUSTRALIAN_STATES = [
  'NSW',
  'VIC',
  'QLD',
  'WA',
  'SA',
  'TAS',
  'ACT',
  'NT'
];

export const SITE_ENVIRONMENTS = [
  'Residential',
  'Commercial',
  'Industrial',
  'Civil',
  'Mining',
  'Infrastructure',
  'Renovation',
  'New Construction'
];

export const HIGH_RISK_CATEGORIES = [
  '(a) Work in a confined space',
  '(b) Work involving structural alterations',
  '(c) Demolition work',
  '(d) Work on or near energised electrical installations',
  '(e) Work in an area that may have a contaminated or flammable atmosphere',
  '(f) Work on, in or adjacent to a road, railway, shipping lane or other traffic corridor',
  '(g) Work in an area at a workplace where there is any movement of powered mobile plant',
  '(h) Work at height',
  '(i) Work in areas where there is a risk of drowning',
  '(j) Work on or adjacent to pressurised gas distribution mains or piping',
  '(k) Work on or adjacent to chemical, fuel or refrigerant lines',
  '(l) Work on or adjacent to energised electrical installations or services',
  '(m) Work that involves disturbance of asbestos',
  '(n) Work that is carried out in or near water or other liquid that involves a risk of drowning',
  '(o) Work that involves the use of explosives',
  '(p) Work that involves the movement of powered mobile plant',
  '(q) Work that is carried out on a telecommunication tower',
  '(r) Work that involves tilt-up or precast concrete'
];