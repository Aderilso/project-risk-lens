import { useState } from "react";
import { Risk, RiskAction, ActionStatus } from "@/types/risk";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ActionModal } from "../ActionModal";

interface ActionsTabProps {
  risk: Risk;
}

const getActionStatusColor = (status: ActionStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Concluída":
      return "secondary";
    case "Atrasada":
      return "destructive";
    case "Em Execução":
      return "default";
    default:
      return "outline";
  }
};

export const ActionsTab = ({ risk }: ActionsTabProps) => {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<RiskAction | null>(null);

  const handleNewAction = () => {
    setEditingAction(null);
    setActionModalOpen(true);
  };

  const handleEditAction = (action: RiskAction) => {
    setEditingAction(action);
    setActionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Plano de Gestão de Risco (Ações)</h3>
        <Button onClick={handleNewAction}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Ação
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estratégia</TableHead>
            <TableHead>Executor</TableHead>
            <TableHead>Início planejado</TableHead>
            <TableHead>Término planejado</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Evidência</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {risk.actions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                Nenhuma ação cadastrada
              </TableCell>
            </TableRow>
          ) : (
            risk.actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="font-medium">{action.strategy}</TableCell>
                <TableCell>{action.executor}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(action.plannedStart).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(action.plannedEnd).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Badge variant={getActionStatusColor(action.status)}>
                    {action.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {action.evidence || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditAction(action)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <ActionModal
        open={actionModalOpen}
        onOpenChange={setActionModalOpen}
        action={editingAction}
        riskId={risk.id}
      />
    </div>
  );
};
