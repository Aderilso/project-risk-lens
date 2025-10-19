import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ImportError {
  linha: number;
  aba: string;
  campo: string;
  mensagem: string;
}

interface ErrorLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errors: ImportError[];
}

export const ErrorLogModal = ({ open, onOpenChange, errors }: ErrorLogModalProps) => {
  const handleDownloadLog = () => {
    // Create CSV content
    const headers = ["Linha", "Aba", "Campo", "Mensagem"];
    const rows = errors.map(e => [e.linha, e.aba, e.campo, e.mensagem]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `log_erros_importacao_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Log de erros baixado com sucesso");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Log de Erros da Importação
          </DialogTitle>
          <DialogDescription>
            {errors.length} erro(s) encontrado(s) durante a importação
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border max-h-[50vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Linha</TableHead>
                  <TableHead className="w-48">Aba</TableHead>
                  <TableHead className="w-40">Campo</TableHead>
                  <TableHead>Mensagem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errors.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{error.linha}</TableCell>
                    <TableCell>{error.aba}</TableCell>
                    <TableCell className="font-medium">{error.campo}</TableCell>
                    <TableCell className="text-destructive">{error.mensagem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Corrija os erros na planilha e tente importar novamente
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadLog}>
                <FileDown className="h-4 w-4 mr-2" />
                Baixar log (.csv)
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
