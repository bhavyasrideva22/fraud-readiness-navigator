import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export const ProgressBar = ({ currentQuestion, totalQuestions, className }: ProgressBarProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progress
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 w-full"
      />
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-xs text-muted-foreground">
          {totalQuestions - currentQuestion} remaining
        </span>
      </div>
    </div>
  );
};