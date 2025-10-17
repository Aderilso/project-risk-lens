import { Risk } from "@/types/risk";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskLevelBadge } from "../RiskLevelBadge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QualitativeInitialTabProps {
  risk: Risk;
}

export const QualitativeInitialTab = ({ risk }: QualitativeInitialTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise Qualitativa</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Probabilidade de ocorrência do risco (1-5)</Label>
            <Input value={risk.probabilityInitial} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Severidade do impacto em relação ao prazo (1-5)</Label>
            <Input value={risk.severityScheduleInitial} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Severidade do impacto em relação ao CAPEX (1-5)</Label>
            <Input value={risk.severityCapexInitial} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível do risco Prazo
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado: Probabilidade × Severidade Prazo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelScheduleInitial} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível do risco CAPEX
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado: Probabilidade × Severidade CAPEX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelCapexInitial} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Nível geral do risco
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado: Maior nível entre Prazo e CAPEX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
              <RiskLevelBadge level={risk.levelGeneralInitial} />
            </div>
          </div>
        </div>
      </div>

      {/* Mini Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Posição na Matriz de Risco</CardTitle>
          <CardDescription>Visualização simplificada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="inline-flex gap-1">
            {[5, 4, 3, 2, 1].map(prob => (
              <div key={prob} className="flex flex-col gap-1">
                {[1, 2, 3, 4, 5].map(sev => {
                  const isHere = risk.probabilityInitial === prob && 
                    Math.max(risk.severityScheduleInitial, risk.severityCapexInitial) === sev;
                  const score = prob * sev;
                  let bgColor = "bg-risk-low-bg";
                  if (score >= 15) bgColor = "bg-risk-critical-bg";
                  else if (score >= 10) bgColor = "bg-risk-high-bg";
                  else if (score >= 5) bgColor = "bg-risk-medium-bg";

                  return (
                    <div
                      key={`${prob}-${sev}`}
                      className={`
                        h-8 w-8 rounded border-2 flex items-center justify-center text-xs font-bold
                        ${bgColor}
                        ${isHere ? "ring-4 ring-primary" : "border-border"}
                      `}
                    >
                      {isHere && "●"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
