import { RiskLevel } from "@/types/risk";

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    "Baixo": "risk-low",
    "Médio": "risk-medium",
    "Alto": "risk-high",
    "Crítico": "risk-critical",
  };
  return colors[level];
};

export const getRiskLevelBadgeVariant = (level: RiskLevel) => {
  const variants: Record<RiskLevel, "risk-low" | "risk-medium" | "risk-high" | "risk-critical"> = {
    "Baixo": "risk-low",
    "Médio": "risk-medium",
    "Alto": "risk-high",
    "Crítico": "risk-critical",
  };
  return variants[level];
};

export const calculatePERT = (optimistic: number, likely: number, pessimistic: number): number => {
  return (optimistic + 4 * likely + pessimistic) / 6;
};

export const calculateExpectedValue = (probability: number, impact: number): number => {
  return (probability / 100) * impact;
};

export const calculateQualitativeLevel = (probability: number, severity: number): RiskLevel => {
  const score = probability * severity;
  if (score >= 15) return "Crítico";
  if (score >= 10) return "Alto";
  if (score >= 5) return "Médio";
  return "Baixo";
};
