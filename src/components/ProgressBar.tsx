import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{current} / {total}</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-xs text-muted-foreground text-right">
        {Math.round(percentage)}% Complete
      </div>
    </div>
  );
}
