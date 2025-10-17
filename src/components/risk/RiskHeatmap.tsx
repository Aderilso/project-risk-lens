import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Risk, RiskLevel } from "@/types/risk";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RiskHeatmapProps {
  risks: Risk[];
  isResidual?: boolean;
}

export const RiskHeatmap = ({ risks, isResidual = false }: RiskHeatmapProps) => {
  // Count risks in each cell (5x5 grid: probability × severity)
  const getCellCount = (prob: number, sev: number): number => {
    return risks.filter(r => {
      const p = isResidual ? r.probabilityResidual : r.probabilityInitial;
      const s = isResidual 
        ? Math.max(r.severityScheduleResidual, r.severityCapexResidual)
        : Math.max(r.severityScheduleInitial, r.severityCapexInitial);
      return p === prob && s === sev;
    }).length;
  };

  const getCellLevel = (prob: number, sev: number): RiskLevel => {
    const score = prob * sev;
    if (score >= 15) return "Crítico";
    if (score >= 10) return "Alto";
    if (score >= 5) return "Médio";
    return "Baixo";
  };

  const getCellColor = (level: RiskLevel): string => {
    const colors: Record<RiskLevel, string> = {
      "Baixo": "bg-risk-low-bg border-risk-low",
      "Médio": "bg-risk-medium-bg border-risk-medium",
      "Alto": "bg-risk-high-bg border-risk-high",
      "Crítico": "bg-risk-critical-bg border-risk-critical",
    };
    return colors[level];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Matriz de Probabilidade × Severidade {isResidual && "(Residual)"}
        </CardTitle>
        <CardDescription>
          Distribuição dos riscos por nível de probabilidade e severidade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider>
            <div className="inline-block min-w-[500px]">
              {/* Y-axis label */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-20 text-right">
                  <span className="text-sm font-medium text-muted-foreground">Probabilidade</span>
                </div>
              </div>

              <div className="flex gap-4">
                {/* Y-axis values */}
                <div className="flex flex-col-reverse justify-between gap-1 w-20">
                  {[5, 4, 3, 2, 1].map(p => (
                    <div key={p} className="h-16 flex items-center justify-end pr-2">
                      <span className="text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex-1">
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map(prob => (
                      <div key={prob} className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(sev => {
                          const count = getCellCount(prob, sev);
                          const level = getCellLevel(prob, sev);
                          return (
                            <Tooltip key={`${prob}-${sev}`}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`
                                    h-16 flex-1 min-w-[80px] rounded-md border-2 
                                    flex items-center justify-center font-semibold text-lg
                                    transition-all hover:scale-105 cursor-pointer
                                    ${getCellColor(level)}
                                  `}
                                >
                                  {count > 0 ? count : ""}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">{level}</p>
                                <p className="text-xs">
                                  Prob: {prob} × Sev: {sev} = {prob * sev}
                                </p>
                                <p className="text-xs">{count} risco(s)</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* X-axis */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <div key={s} className="flex-1 min-w-[80px] text-center">
                        <span className="text-sm font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-sm font-medium text-muted-foreground">Severidade</span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
