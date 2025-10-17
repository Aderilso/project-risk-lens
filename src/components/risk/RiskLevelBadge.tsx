import { RiskLevel } from "@/types/risk";
import { Badge } from "@/components/ui/badge";
import { getRiskLevelBadgeVariant } from "@/lib/riskUtils";

interface RiskLevelBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskLevelBadge = ({ level, className }: RiskLevelBadgeProps) => {
  return (
    <Badge variant={getRiskLevelBadgeVariant(level)} className={className}>
      {level}
    </Badge>
  );
};
