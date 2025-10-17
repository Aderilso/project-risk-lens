import { useState } from "react";
import { mockProjects, mockUsers } from "@/lib/mockData";
import { Project } from "@/types/risk";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Users, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const ProjectsPage = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleOpenProject = (projectId: string) => {
    navigate(`/coordinator/projects/${projectId}`);
  };

  const handleAssignUsers = (project: Project) => {
    setSelectedProject(project);
    setSelectedUsers(project.assignedUsers);
    setAssignDialogOpen(true);
  };

  const handleSaveAssignments = () => {
    toast.success("Usuários atribuídos com sucesso");
    setAssignDialogOpen(false);
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Projetos</h1>
        <p className="text-muted-foreground">
          Gerencie projetos e acompanhe seus riscos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Todos os Projetos
          </CardTitle>
          <CardDescription>{projects.length} projetos ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">#Riscos</TableHead>
                <TableHead className="text-center">% Críticos</TableHead>
                <TableHead className="text-center">Ações Atrasadas</TableHead>
                <TableHead>Última Importação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-mono font-medium">
                    {project.code}
                  </TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{project.risksCount}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        project.criticalPercentage > 20
                          ? "risk-critical"
                          : project.criticalPercentage > 10
                          ? "risk-high"
                          : "risk-medium"
                      }
                    >
                      {project.criticalPercentage}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {project.delayedActions > 0 ? (
                      <Badge variant="risk-high" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {project.delayedActions}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.lastImport || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenProject(project.id)}
                      >
                        Abrir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAssignUsers(project)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Atribuir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assign Users Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Atribuir Usuários ao Projeto</DialogTitle>
            <DialogDescription>
              {selectedProject?.name} ({selectedProject?.code})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {mockUsers
              .filter(u => u.role === "Gestor")
              .map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUser(user.id)}
                  />
                  <label
                    htmlFor={user.id}
                    className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {user.name}
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </label>
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAssignments}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
