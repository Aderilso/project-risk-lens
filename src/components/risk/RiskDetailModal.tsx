import { useState } from "react";
import { Risk } from "@/types/risk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiskRegistrationTab } from "./tabs/RiskRegistrationTab";
import { QualitativeInitialTab } from "./tabs/QualitativeInitialTab";
import { QuantitativeScheduleTab } from "./tabs/QuantitativeScheduleTab";
import { QuantitativeCapexTab } from "./tabs/QuantitativeCapexTab";
import { ActionsTab } from "./tabs/ActionsTab";
import { QualitativeResidualTab } from "./tabs/QualitativeResidualTab";
import { HistoryTab } from "./tabs/HistoryTab";

interface RiskDetailModalProps {
  risk: Risk | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RiskDetailModal = ({ risk, open, onOpenChange }: RiskDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("registration");

  if (!risk) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl">
            {risk.code} - {risk.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 border-b">
            <TabsList className="w-full justify-start h-auto flex-wrap gap-1">
              <TabsTrigger value="registration" className="text-xs">
                Registro
              </TabsTrigger>
              <TabsTrigger value="qualitative-initial" className="text-xs">
                Análise Qualitativa (Inicial)
              </TabsTrigger>
              <TabsTrigger value="quantitative-schedule" className="text-xs">
                Análise Quantitativa (Cronograma)
              </TabsTrigger>
              <TabsTrigger value="quantitative-capex" className="text-xs">
                Análise Quantitativa (CAPEX)
              </TabsTrigger>
              <TabsTrigger value="actions" className="text-xs">
                Plano de Gestão (Ações)
              </TabsTrigger>
              <TabsTrigger value="qualitative-residual" className="text-xs">
                Análise Qualitativa (Residual)
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs">
                Histórico & Evidências
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="p-6">
              <TabsContent value="registration" className="mt-0">
                <RiskRegistrationTab risk={risk} />
              </TabsContent>

              <TabsContent value="qualitative-initial" className="mt-0">
                <QualitativeInitialTab risk={risk} />
              </TabsContent>

              <TabsContent value="quantitative-schedule" className="mt-0">
                <QuantitativeScheduleTab risk={risk} />
              </TabsContent>

              <TabsContent value="quantitative-capex" className="mt-0">
                <QuantitativeCapexTab risk={risk} />
              </TabsContent>

              <TabsContent value="actions" className="mt-0">
                <ActionsTab risk={risk} />
              </TabsContent>

              <TabsContent value="qualitative-residual" className="mt-0">
                <QualitativeResidualTab risk={risk} />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <HistoryTab risk={risk} />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
