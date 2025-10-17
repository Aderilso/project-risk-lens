import { Risk } from "@/types/risk";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuantitativeCapexTabProps {
  risk: Risk;
}

export const QuantitativeCapexTab = ({ risk }: QuantitativeCapexTabProps) => {
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise quantitativa (CAPEX)</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Otimista-CAPEX (R$)</Label>
            <Input value={formatCurrency(risk.optimisticCapex)} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Mais provável-CAPEX (R$)</Label>
            <Input value={formatCurrency(risk.likelyCapex)} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Pessimista-CAPEX (R$)</Label>
            <Input value={formatCurrency(risk.pessimisticCapex)} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Média ponderada-CAPEX
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
              value={formatCurrency(risk.weightedAverageCapex)}
              readOnly
              className="bg-accent font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Valor esperado CAPEX
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculado: (Probabilidade/100) × Média ponderada</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              value={formatCurrency(risk.expectedValueCapex)}
              readOnly
              className="bg-accent font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
