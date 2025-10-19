import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockProjects, mockRisks } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Upload, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskDetailModal } from "@/components/risk/RiskDetailModal";
import { Risk } from "@/types/risk";
import { ImportModal } from "@/components/risk/ImportModal";
import { RiskLevelBadge } from "@/components/risk/RiskLevelBadge";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ActionModal } from "@/components/risk/ActionModal";

export const GestorProjectPage = () => {
  const { projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);
  const projectRisks = mockRisks.filter(r => r.projectId === projectId);

  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenRisk = (risk: Risk) => {
    setSelectedRisk(risk);
    setModalOpen(true);
  };

  const filteredRisks = projectRisks.filter(r =>
    r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!project) {
    return <div className="p-8">Projeto não encontrado</div>;
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          Gestor / {project.name} / Riscos
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-1">{project.name}</h1>
        <p className="text-lg text-muted-foreground">Gestão de Riscos</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Download da Planilha Padrão
        </Button>
        <Button className="gap-2" onClick={() => setImportModalOpen(true)}>
          <Upload className="h-4 w-4" />
          Importar Planilha Padrão
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="registro" className="w-full">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-1 mb-6">
              <TabsTrigger value="registro">Registro dos Riscos</TabsTrigger>
              <TabsTrigger value="qualitativa-inicial">Análise Qualitativa (Inicial)</TabsTrigger>
              <TabsTrigger value="quantitativa-cronograma">Análise Quantitativa (Cronograma)</TabsTrigger>
              <TabsTrigger value="quantitativa-capex">Análise Quantitativa (CAPEX)</TabsTrigger>
              <TabsTrigger value="plano-gestao">Plano de Gestão de Risco</TabsTrigger>
              <TabsTrigger value="qualitativa-residual">Análise Qualitativa (Residual)</TabsTrigger>
              <TabsTrigger value="historico">Histórico & Evidências</TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="mb-4">
              <Input
                placeholder="Buscar por código ou título do risco..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Tab 1: Registro dos Riscos */}
            <TabsContent value="registro" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fase</TableHead>
                      <TableHead>Disc</TableHead>
                      <TableHead>Seq</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Risco</TableHead>
                      <TableHead>Dimensão</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell>{risk.type}</TableCell>
                        <TableCell>{risk.phase}</TableCell>
                        <TableCell>{risk.disc}</TableCell>
                        <TableCell>{risk.seq}</TableCell>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{risk.discipline}</Badge>
                        </TableCell>
                        <TableCell>{risk.subject}</TableCell>
                        <TableCell className="max-w-xs truncate">{risk.title}</TableCell>
                        <TableCell>{risk.dimension}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 2: Análise Qualitativa (Inicial) */}
            <TabsContent value="qualitativa-inicial" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Probabilidade</TableHead>
                      <TableHead>Sev. Prazo</TableHead>
                      <TableHead>Sev. CAPEX</TableHead>
                      <TableHead>Nível Prazo</TableHead>
                      <TableHead>Nível CAPEX</TableHead>
                      <TableHead>Nível Geral</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>{risk.probabilityInitial}</TableCell>
                        <TableCell>{risk.severityScheduleInitial}</TableCell>
                        <TableCell>{risk.severityCapexInitial}</TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelScheduleInitial} />
                        </TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelCapexInitial} />
                        </TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelGeneralInitial} />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 3: Análise Quantitativa (Cronograma) */}
            <TabsContent value="quantitativa-cronograma" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Probabilidade (%)</TableHead>
                      <TableHead>Otimista (dias)</TableHead>
                      <TableHead>Mais Provável (dias)</TableHead>
                      <TableHead>Pessimista (dias)</TableHead>
                      <TableHead>Média Ponderada</TableHead>
                      <TableHead>Valor Esperado</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>{risk.probabilitySchedule}%</TableCell>
                        <TableCell>{risk.optimisticSchedule}</TableCell>
                        <TableCell>{risk.likelySchedule}</TableCell>
                        <TableCell>{risk.pessimisticSchedule}</TableCell>
                        <TableCell className="font-medium">
                          {risk.weightedAverageSchedule.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {risk.expectedValueSchedule.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 4: Análise Quantitativa (CAPEX) */}
            <TabsContent value="quantitativa-capex" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Otimista (R$)</TableHead>
                      <TableHead>Mais Provável (R$)</TableHead>
                      <TableHead>Pessimista (R$)</TableHead>
                      <TableHead>Média Ponderada (R$)</TableHead>
                      <TableHead>Valor Esperado (R$)</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>
                          {risk.optimisticCapex.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell>
                          {risk.likelyCapex.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell>
                          {risk.pessimisticCapex.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {risk.weightedAverageCapex.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {risk.expectedValueCapex.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 5: Plano de Gestão de Risco */}
            <TabsContent value="plano-gestao" className="space-y-4">
              <Button onClick={() => setActionModalOpen(true)} className="mb-4">
                Nova Ação
              </Button>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código do Risco</TableHead>
                      <TableHead>Estratégia</TableHead>
                      <TableHead>Executor</TableHead>
                      <TableHead>Início Plan.</TableHead>
                      <TableHead>Término Plan.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead># Ações</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>
                          {risk.actions[0]?.strategy || "-"}
                        </TableCell>
                        <TableCell>{risk.actions[0]?.executor || "-"}</TableCell>
                        <TableCell>
                          {risk.actions[0]?.plannedStart
                            ? new Date(risk.actions[0].plannedStart).toLocaleDateString('pt-BR')
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {risk.actions[0]?.plannedEnd
                            ? new Date(risk.actions[0].plannedEnd).toLocaleDateString('pt-BR')
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {risk.actions[0]?.status || "Sem ação"}
                          </Badge>
                        </TableCell>
                        <TableCell>{risk.actions.length}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 6: Análise Qualitativa (Residual) */}
            <TabsContent value="qualitativa-residual" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Prob. Residual</TableHead>
                      <TableHead>Sev. Residual Prazo</TableHead>
                      <TableHead>Sev. Residual CAPEX</TableHead>
                      <TableHead>Nível Residual - Prazo</TableHead>
                      <TableHead>Nível Residual - CAPEX</TableHead>
                      <TableHead>Nível Geral Residual</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell>{risk.probabilityResidual}</TableCell>
                        <TableCell>{risk.severityScheduleResidual}</TableCell>
                        <TableCell>{risk.severityCapexResidual}</TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelScheduleResidual} />
                        </TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelCapexResidual} />
                        </TableCell>
                        <TableCell>
                          <RiskLevelBadge level={risk.levelGeneralResidual} />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 7: Histórico & Evidências */}
            <TabsContent value="historico" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Atualizado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono">{risk.code}</TableCell>
                        <TableCell className="max-w-xs truncate">{risk.title}</TableCell>
                        <TableCell>{risk.owner}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{risk.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(risk.updatedAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenRisk(risk)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <RiskDetailModal
        risk={selectedRisk}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        projectId={projectId || ""}
      />

      <ActionModal
        open={actionModalOpen}
        onOpenChange={setActionModalOpen}
        action={null}
        riskId=""
      />
    </div>
  );
};
