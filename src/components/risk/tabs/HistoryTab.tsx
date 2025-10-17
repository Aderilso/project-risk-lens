import { Risk } from "@/types/risk";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HistoryTabProps {
  risk: Risk;
}

export const HistoryTab = ({ risk }: HistoryTabProps) => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }
    toast.success("Comentário adicionado ao histórico");
    setComment("");
  };

  // Mock history data
  const historyEntries = [
    {
      id: "1",
      timestamp: risk.updatedAt,
      user: risk.owner,
      action: "Atualizado",
      field: "Status",
      oldValue: "Aberto",
      newValue: risk.status,
    },
    {
      id: "2",
      timestamp: risk.createdAt,
      user: "Sistema",
      action: "Criado",
      comment: "Risco importado via planilha Excel",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Alterações
          </CardTitle>
          <CardDescription>Registro cronológico de todas as mudanças</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyEntries.map((entry, idx) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {idx + 1}
                  </div>
                  {idx < historyEntries.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{entry.user}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>{entry.action}</strong>
                    {entry.field && (
                      <>
                        {" "}o campo <strong>{entry.field}</strong>
                        {entry.oldValue && (
                          <>
                            {" "}de <code className="bg-muted px-1 rounded">{entry.oldValue}</code>
                          </>
                        )}
                        {entry.newValue && (
                          <>
                            {" "}para <code className="bg-muted px-1 rounded">{entry.newValue}</code>
                          </>
                        )}
                      </>
                    )}
                  </p>
                  {entry.comment && (
                    <p className="text-sm text-muted-foreground mt-1">{entry.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidences/Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Anexos & Evidências
          </CardTitle>
          <CardDescription>Documentos relacionados ao risco</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {risk.actions
              .filter(a => a.evidence)
              .map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{action.strategy}</p>
                      <p className="text-xs text-muted-foreground">{action.evidence}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            {risk.actions.filter(a => a.evidence).length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Nenhuma evidência anexada
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Comment */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Comentário</CardTitle>
          <CardDescription>Registre observações rápidas no histórico</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            rows={3}
          />
          <Button onClick={handleAddComment}>Adicionar ao Histórico</Button>
        </CardContent>
      </Card>
    </div>
  );
};
