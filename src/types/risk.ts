export type UserRole = "Admin" | "Coordenador" | "Gestor";

export type RiskLevel = "Baixo" | "Médio" | "Alto" | "Crítico";

export type RiskStatus = "Aberto" | "Monitorando" | "Encerrado";

export type ActionStatus = "Planejada" | "Em Execução" | "Concluída" | "Atrasada";

export type ResponseStrategy = "Mitigar" | "Evitar" | "Transferir" | "Aceitar";

export type Dimension = "Prazo" | "CAPEX" | "Ambos";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  risksCount: number;
  criticalPercentage: number;
  delayedActions: number;
  lastImport?: string;
  assignedUsers: string[];
}

export interface RiskAction {
  id: string;
  strategy: ResponseStrategy;
  description: string;
  executor: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: ActionStatus;
  comments?: string;
  evidence?: string;
  postponeJustification?: string;
}

export interface Risk {
  id: string;
  projectId: string;
  type: string;
  phase: string;
  disc: string;
  seq: number;
  code: string;
  discipline: string;
  subject: string;
  title: string;
  cause: string;
  description: string;
  dimension: Dimension;
  
  // Qualitative Analysis (Initial)
  probabilityInitial: number;
  severityScheduleInitial: number;
  severityCapexInitial: number;
  levelScheduleInitial: RiskLevel;
  levelCapexInitial: RiskLevel;
  levelGeneralInitial: RiskLevel;
  
  // Quantitative Analysis (Schedule)
  probabilitySchedule: number;
  optimisticSchedule: number;
  likelySchedule: number;
  pessimisticSchedule: number;
  weightedAverageSchedule: number;
  expectedValueSchedule: number;
  
  // Quantitative Analysis (CAPEX)
  optimisticCapex: number;
  likelyCapex: number;
  pessimisticCapex: number;
  weightedAverageCapex: number;
  expectedValueCapex: number;
  
  // Residual Analysis
  probabilityResidual: number;
  severityScheduleResidual: number;
  severityCapexResidual: number;
  levelScheduleResidual: RiskLevel;
  levelCapexResidual: RiskLevel;
  levelGeneralResidual: RiskLevel;
  
  owner: string;
  status: RiskStatus;
  actions: RiskAction[];
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  riskId: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  comment?: string;
}
