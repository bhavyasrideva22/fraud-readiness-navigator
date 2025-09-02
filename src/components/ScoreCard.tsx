import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  description: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export const ScoreCard = ({ 
  title, 
  score, 
  maxScore, 
  description, 
  color = 'primary',
  className 
}: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'success' };
    if (percentage >= 60) return { level: 'Good', color: 'primary' };
    if (percentage >= 40) return { level: 'Fair', color: 'warning' };
    return { level: 'Needs Improvement', color: 'destructive' };
  };

  const scoreLevel = getScoreLevel(percentage);

  return (
    <Card className={`${className} shadow-soft`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={`bg-${scoreLevel.color}/10 text-${scoreLevel.color} border-${scoreLevel.color}/20`}>
            {scoreLevel.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {Math.round(score)}
            </span>
            <span className="text-sm text-muted-foreground">
              / {maxScore}
            </span>
          </div>
          <Progress value={percentage} className={`h-2 w-full`} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};