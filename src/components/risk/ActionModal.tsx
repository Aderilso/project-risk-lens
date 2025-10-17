import { useState } from "react";
import { RiskAction, ResponseStrategy, ActionStatus } from "@/types/risk";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: RiskAction | null;
  riskId: string;
}

export const ActionModal = ({ open, onOpenChange, action, riskId }: ActionModalProps) => {
  const [formData, setFormData] = useState<Partial<RiskAction>>(
    action || {
      strategy: "Mitigar",
      description: "",
      executor: "",
      plannedStart: "",
      plannedEnd: "",
      actualStart: "",
      actualEnd: "",
      status: "Planejada",
      comments: "",
      evidence: "",
      postponeJustification: "",
    }
  );

  const handleSave = () => {
    toast.success(action ? "Ação atualizada" : "Ação criada");
    onOpenChange(false);
  };

  const handleSaveAndCreate = () => {
    toast.success("Ação criada");
    setFormData({
      strategy: "Mitigar",
      description: "",
      executor: "",
      plannedStart: "",
      plannedEnd: "",
      status: "Planejada",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{action ? "Editar" : "Nova"} Ação do Risco</DialogTitle>
          <DialogDescription>
            {action ? "Atualize os dados da ação" : "Cadastre uma nova ação de resposta ao risco"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Estratégia de gestão */}
          <div>
            <h4 className="font-semibold mb-3">Estratégia de gestão do risco</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Estratégia de resposta ao risco</Label>
                <Select
                  value={formData.strategy}
                  onValueChange={(v) => setFormData({ ...formData, strategy: v as ResponseStrategy })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mitigar">Mitigar</SelectItem>
                    <SelectItem value="Evitar">Evitar</SelectItem>
                    <SelectItem value="Transferir">Transferir</SelectItem>
                    <SelectItem value="Aceitar">Aceitar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Detalhamento da ação de resposta ao risco</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Descreva a ação..."
                />
              </div>

              <div className="space-y-2">
                <Label>Executor da ação (pessoa)</Label>
                <Input
                  value={formData.executor}
                  onChange={(e) => setFormData({ ...formData, executor: e.target.value })}
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
          </div>

          {/* Prazo da Ação */}
          <div>
            <h4 className="font-semibold mb-3">Prazo da Ação</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Início planejado</Label>
                <Input
                  type="date"
                  value={formData.plannedStart}
                  onChange={(e) => setFormData({ ...formData, plannedStart: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Término planejado</Label>
                <Input
                  type="date"
                  value={formData.plannedEnd}
                  onChange={(e) => setFormData({ ...formData, plannedEnd: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Início real</Label>
                <Input
                  type="date"
                  value={formData.actualStart}
                  onChange={(e) => setFormData({ ...formData, actualStart: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Término real</Label>
                <Input
                  type="date"
                  value={formData.actualEnd}
                  onChange={(e) => setFormData({ ...formData, actualEnd: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Justificativa caso haja reprogramação da ação</Label>
                <Textarea
                  value={formData.postponeJustification}
                  onChange={(e) => setFormData({ ...formData, postponeJustification: e.target.value })}
                  rows={2}
                  placeholder="Obrigatório se houver mudança nas datas planejadas"
                />
              </div>
            </div>
          </div>

          {/* Acompanhamento */}
          <div>
            <h4 className="font-semibold mb-3">Acompanhamento da Ação</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status da ação</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v as ActionStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planejada">Planejada</SelectItem>
                    <SelectItem value="Em Execução">Em Execução</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                    <SelectItem value="Atrasada">Atrasada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Comentários</Label>
                <Textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  rows={2}
                  placeholder="Observações sobre a ação..."
                />
              </div>

              <div className="space-y-2">
                <Label>Evidência de cumprimento das ações</Label>
                <Input
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  placeholder="Link ou descrição da evidência"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {!action && (
            <Button variant="outline" onClick={handleSaveAndCreate}>
              Salvar e criar outra
            </Button>
          )}
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
