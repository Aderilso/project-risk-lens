import { useParams } from "react-router-dom";
import { mockProjects, mockRisks } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  FileDown,
  Upload,
  Eye
} from "lucide-react";
import { RiskHeatmap } from "@/components/risk/RiskHeatmap";
import { RiskLevelBadge } from "@/components/risk/RiskLevelBadge";
import { useState } from "react";

export const ProjectDashboard = () => {
  const { projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);
  const projectRisks = mockRisks.filter(r => r.projectId === projectId);

  const [showImportFlow, setShowImportFlow] = useState(false);

  if (!project) {
    return <div className="p-8">Projeto não encontrado</div>;
  }

  // Calculate KPIs
  const activeRisks = projectRisks.filter(r => r.status !== "Encerrado").length;
  const highCriticalCount = projectRisks.filter(
    r => r.levelGeneralInitial === "Alto" || r.levelGeneralInitial === "Crítico"
  ).length;
  const highCriticalPercent = activeRisks > 0 
    ? Math.round((highCriticalCount / activeRisks) * 100) 
    : 0;
  
  const totalExpectedCapex = projectRisks.reduce(
    (sum, r) => sum + r.expectedValueCapex, 0
  );
  
  const totalExpectedDays = projectRisks.reduce(
    (sum, r) => sum + r.expectedValueSchedule, 0
  );

  const delayedActionsCount = projectRisks.reduce(
    (sum, r) => sum + r.actions.filter(a => a.status === "Atrasada").length, 0
  );

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{project.name}</h1>
            <p className="text-muted-foreground font-mono">{project.code}</p>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Riscos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">{activeRisks}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              % Alto/Crítico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-risk-high" />
              <span className="text-3xl font-bold">{highCriticalPercent}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Esperado CAPEX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">
                R$ {(totalExpectedCapex / 1000).toFixed(0)}k
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dias Esperados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">{Math.round(totalExpectedDays)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ações Atrasadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-3xl font-bold text-destructive">{delayedActionsCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <div className="mb-8">
        <RiskHeatmap risks={projectRisks} />
      </div>

      {/* Import/Export Panel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Importar/Exportar Excel</CardTitle>
          <CardDescription>
            Gerencie seus riscos através de planilhas Excel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              Baixar Template
            </Button>
            <Button onClick={() => setShowImportFlow(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Enviar Planilha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Riscos</CardTitle>
          <CardDescription>{projectRisks.length} riscos cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectRisks.map((risk) => (
              <div
                key={risk.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-muted-foreground">{risk.code}</span>
                    <RiskLevelBadge level={risk.levelGeneralInitial} />
                    <Badge variant="outline">{risk.discipline}</Badge>
                  </div>
                  <h4 className="font-medium mb-1">{risk.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Owner: {risk.owner}</span>
                    <span>Status: {risk.status}</span>
                    <span>{risk.actions.length} ação(ões)</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
