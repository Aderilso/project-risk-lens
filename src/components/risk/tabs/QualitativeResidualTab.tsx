import { Risk } from "@/types/risk";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RiskLevelBadge } from "../RiskLevelBadge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QualitativeResidualTabProps {
  risk: Risk;
}

export const QualitativeResidualTab = ({ risk }: QualitativeResidualTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise qualitativa (Residual)</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Probabilidade residual de ocorrência (1-5)</Label>
            <Input value={risk.probabilityResidual} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Severidade residual do impacto em relação ao prazo (1-5)</Label>
            <Input value={risk.severityScheduleResidual} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Severidade residual do impacto em relação ao CAPEX (1-5)</Label>
            <Input value={risk.severityCapexResidual} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível do risco residual – Prazo
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado após implementação das ações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelScheduleResidual} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível do risco residual – CAPEX
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado após implementação das ações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelCapexResidual} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível geral do risco residual
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nível geral após mitigação</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelGeneralResidual} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Índices da Matriz de riscos residuais</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Índice de probabilidade residual</Label>
            <Input value={risk.probabilityResidual} readOnly className="bg-accent" />
          </div>

          <div className="space-y-2">
            <Label>Índice severidade residual – prazo</Label>
            <Input value={risk.severityScheduleResidual} readOnly className="bg-accent" />
          </div>

          <div className="space-y-2">
            <Label>Nível do risco residual em relação ao prazo</Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-accent">
              <RiskLevelBadge level={risk.levelScheduleResidual} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Índice de severidade residual CAPEX</Label>
            <Input value={risk.severityCapexResidual} readOnly className="bg-accent" />
          </div>

          <div className="space-y-2">
            <Label>Nível do Risco residual em relação ao CAPEX</Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-accent">
              <RiskLevelBadge level={risk.levelCapexResidual} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Índice de severidade do risco residual mais crítico</Label>
            <Input
              value={Math.max(risk.severityScheduleResidual, risk.severityCapexResidual)}
              readOnly
              className="bg-accent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Índice geral do risco residual</Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-accent">
              <RiskLevelBadge level={risk.levelGeneralResidual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
