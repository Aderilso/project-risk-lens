import { Risk } from "@/types/risk";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RiskRegistrationTabProps {
  risk: Risk;
}

export const RiskRegistrationTab = ({ risk }: RiskRegistrationTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Registro dos riscos</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Input value={risk.type} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Fase</Label>
            <Input value={risk.phase} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Disc</Label>
            <Input value={risk.disc} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Seq</Label>
            <Input value={risk.seq} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Código do risco</Label>
            <Input value={risk.code} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Disciplina</Label>
            <Input value={risk.discipline} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Assunto</Label>
            <Input value={risk.subject} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Risco (título)</Label>
            <Input value={risk.title} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Causa</Label>
            <Textarea value={risk.cause} readOnly className="bg-muted" rows={2} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Detalhamento do risco</Label>
            <Textarea value={risk.description} readOnly className="bg-muted" rows={4} />
          </div>

          <div className="space-y-2">
            <Label>Dimensão</Label>
            <Input value={risk.dimension} readOnly className="bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
