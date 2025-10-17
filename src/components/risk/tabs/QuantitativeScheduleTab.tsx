import { Risk } from "@/types/risk";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuantitativeScheduleTabProps {
  risk: Risk;
}

export const QuantitativeScheduleTab = ({ risk }: QuantitativeScheduleTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise Quantitativa (Cronograma)</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Probabilidade de ocorrência (%)</Label>
            <Input value={`${risk.probabilitySchedule}%`} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Otimista/Cronograma (dias)</Label>
            <Input value={risk.optimisticSchedule} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Mais provável/Cronograma (dias)</Label>
            <Input value={risk.likelySchedule} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Pessimista/Cronograma (dias)</Label>
            <Input value={risk.pessimisticSchedule} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Média ponderada (prazo)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fórmula PERT: (Otimista + 4×Provável + Pessimista) / 6</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              value={`${risk.weightedAverageSchedule.toFixed(2)} dias`}
              readOnly
              className="bg-accent font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Valor esperado (prazo)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado: Probabilidade × Média ponderada</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              value={`${risk.expectedValueSchedule.toFixed(2)} dias`}
              readOnly
              className="bg-accent font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
