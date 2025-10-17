import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockProjects, mockRisks } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileDown, Upload, Eye, Filter } from "lucide-react";
import { RiskLevelBadge } from "@/components/risk/RiskLevelBadge";
import { RiskDetailModal } from "@/components/risk/RiskDetailModal";
import { Risk } from "@/types/risk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ManagerProjectPage = () => {
  const { projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);
  const projectRisks = mockRisks.filter(r => r.projectId === projectId);

  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleOpenRisk = (risk: Risk) => {
    setSelectedRisk(risk);
    setModalOpen(true);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const disciplines = ["all", ...new Set(projectRisks.map(r => r.discipline))];
  const filteredRisks = projectRisks.filter(r => {
    if (filterDiscipline !== "all" && r.discipline !== filterDiscipline) return false;
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  if (!project) {
    return <div className="p-8">Projeto não encontrado</div>;
  }

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

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Importar Riscos</CardTitle>
          <CardDescription>
            Faça upload da planilha padrão preenchida com os riscos do projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Baixar template padrão
              </Button>
              <Button onClick={simulateUpload} disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                Enviar planilha padrão preenchida
              </Button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Extraindo dados...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  {uploadProgress >= 10 && <div className="flex items-center gap-2">✓ Validar arquivo</div>}
                  {uploadProgress >= 25 && <div className="flex items-center gap-2">✓ Ler "Registro dos riscos"</div>}
                  {uploadProgress >= 40 && <div className="flex items-center gap-2">✓ Ler "Análise Qualitativa"</div>}
                  {uploadProgress >= 55 && <div className="flex items-center gap-2">✓ Ler "Análise Quantitativa (Cronograma)"</div>}
                  {uploadProgress >= 70 && <div className="flex items-center gap-2">✓ Ler "Análise Quantitativa (CAPEX)"</div>}
                  {uploadProgress >= 85 && <div className="flex items-center gap-2">✓ Ler "Plano de Gestão de Risco (Ações)"</div>}
                  {uploadProgress >= 100 && <div className="flex items-center gap-2 text-primary font-medium">✓ Concluído</div>}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={filterDiscipline} onValueChange={setFilterDiscipline}>
                <SelectTrigger>
                  <SelectValue placeholder="Disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as disciplinas</SelectItem>
                  {disciplines.filter(d => d !== "all").map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Monitorando">Monitorando</SelectItem>
                  <SelectItem value="Encerrado">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk List */}
      <Card>
        <CardHeader>
          <CardTitle>Riscos do Projeto</CardTitle>
          <CardDescription>
            {filteredRisks.length} de {projectRisks.length} riscos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRisks.map((risk) => (
              <div
                key={risk.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleOpenRisk(risk)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-muted-foreground">{risk.code}</span>
                    <RiskLevelBadge level={risk.levelGeneralInitial} />
                    <Badge variant="outline">{risk.discipline}</Badge>
                    <Badge variant="secondary">{risk.status}</Badge>
                  </div>
                  <h4 className="font-medium mb-1">{risk.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Owner: {risk.owner}</span>
                    <span>{risk.actions.length} ação(ões)</span>
                    <span>
                      Atualizado: {new Date(risk.updatedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  handleOpenRisk(risk);
                }}>
                  <Eye className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
              </div>
            ))}

            {filteredRisks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum risco encontrado com os filtros aplicados
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <RiskDetailModal
        risk={selectedRisk}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};
