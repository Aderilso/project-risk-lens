import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle2, XCircle, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { ErrorLogModal } from "./ErrorLogModal";

interface ImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

const importSteps = [
  "Validar arquivo",
  "Ler aba 'Registro dos riscos'",
  "Ler aba 'Análise Qualitativa'",
  "Ler aba 'Análise Quantitativa (Cronograma)'",
  "Ler aba 'Análise Quantitativa (CAPEX)'",
  "Ler aba 'Plano de Gestão de Risco (Ações)'",
  "Criar/Atualizar registros",
  "Concluir",
];

interface ImportError {
  linha: number;
  aba: string;
  campo: string;
  mensagem: string;
}

export const ImportModal = ({ open, onOpenChange, projectId }: ImportModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast.error("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
      }
    }
  };

  const simulateImport = async () => {
    setIsImporting(true);
    setProgress(0);
    setCurrentStep(0);
    setCompletedSteps([]);
    setSuccessCount(0);
    setErrorCount(0);
    setErrors([]);

    // Simulate import process
    for (let i = 0; i < importSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const progressValue = ((i + 1) / importSteps.length) * 100;
      setProgress(progressValue);
      
      setCompletedSteps(prev => [...prev, i]);
      
      // Simulate some errors in step 2 (reading qualitative data)
      if (i === 2) {
        const mockErrors: ImportError[] = [
          { linha: 5, aba: "Análise Qualitativa", campo: "Probabilidade", mensagem: "Valor fora do intervalo (1-5)" },
          { linha: 12, aba: "Análise Qualitativa", campo: "Severidade", mensagem: "Campo obrigatório não preenchido" },
        ];
        setErrors(mockErrors);
        setErrorCount(2);
        setSuccessCount(prev => prev + 8);
      } else {
        setSuccessCount(prev => prev + 10);
      }
    }

    setIsImporting(false);
    
    if (errors.length > 0) {
      toast.warning(`Importação concluída com ${errors.length} erro(s)`);
      setErrorModalOpen(true);
    } else {
      toast.success("Importação concluída com sucesso!");
      setTimeout(() => {
        onOpenChange(false);
        resetState();
      }, 1500);
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setProgress(0);
    setCurrentStep(0);
    setCompletedSteps([]);
    setErrors([]);
    setSuccessCount(0);
    setErrorCount(0);
  };

  const handleClose = () => {
    if (!isImporting) {
      onOpenChange(false);
      resetState();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Importar Planilha Padrão</DialogTitle>
            <DialogDescription>
              Faça upload da planilha padrão preenchida com os riscos do projeto
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {!isImporting && !selectedFile && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
                <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar arquivo .xlsx
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Apenas arquivos Excel (.xlsx, .xls)
                </p>
              </div>
            )}

            {selectedFile && !isImporting && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={simulateImport} className="flex-1">
                    Iniciar Extração
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedFile(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {isImporting && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Progresso da importação</span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  {importSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        completedSteps.includes(index)
                          ? "bg-primary/10"
                          : currentStep === index
                          ? "bg-muted"
                          : "bg-background"
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : currentStep === index ? (
                        <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-muted-foreground/30 rounded-full flex-shrink-0" />
                      )}
                      <span className={`text-sm ${completedSteps.includes(index) ? "font-medium" : ""}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {(successCount > 0 || errorCount > 0) && (
                  <div className="flex gap-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        <span className="font-bold">{successCount}</span> registros processados
                      </span>
                    </div>
                    {errorCount > 0 && (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="text-sm">
                          <span className="font-bold">{errorCount}</span> erros encontrados
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ErrorLogModal
        open={errorModalOpen}
        onOpenChange={setErrorModalOpen}
        errors={errors}
      />
    </>
  );
};
