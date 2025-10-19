import { mockProjects, mockRisks } from "@/lib/mockData";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ManagerHome = () => {
  const { currentUserId } = useUser();
  const navigate = useNavigate();
  
  // Filter risks owned by current user
  const myRisks = mockRisks.filter(r => 
    r.owner === mockRisks.find(risk => risk.id === r.id)?.owner
  );
  
  const pendingActions = myRisks.reduce(
    (sum, r) => sum + r.actions.filter(a => a.status !== "Concluída").length,
    0
  );

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, Gestor</h1>
        <p className="text-muted-foreground">
          Acompanhe seus riscos e ações pendentes
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Pendências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold text-destructive">{pendingActions}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Total de Projetos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{mockProjects.length}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Total de Riscos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{myRisks.length}</span>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Projetos</CardTitle>
          <CardDescription>Projetos nos quais você é responsável por riscos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProjects.map((project) => {
              const projectRisks = mockRisks.filter(r => r.projectId === project.id);
              const projectActions = projectRisks.reduce(
                (sum, r) => sum + r.actions.filter(a => a.status !== "Concluída").length,
                0
              );

              return (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        {project.code}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {projectRisks.length} risco(s) • {projectActions} ação(ões) pendente(s)
                    </p>
                  </div>
                  <Button onClick={() => {
                    console.log("Clicou no botão Ver Detalhes, navegando para:", `/manager/projects/${project.id}`);
                    navigate(`/manager/projects/${project.id}`);
                  }}>
                    Ver Detalhes
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
