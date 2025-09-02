import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/data/assessmentData";

interface QuestionCardProps {
  question: Question;
  currentAnswer: string | number | null;
  onAnswerChange: (answer: string | number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  currentAnswer,
  onAnswerChange,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const renderLikertScale = () => (
    <div className="space-y-4">
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswerChange(parseInt(value))}
        className="grid grid-cols-1 gap-3"
      >
        {question.scale?.labels.map((label, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gradient-accent transition-all">
            <RadioGroupItem 
              value={(index + 1).toString()} 
              id={`${question.id}-${index}`}
              className="text-primary"
            />
            <Label 
              htmlFor={`${question.id}-${index}`} 
              className="flex-1 cursor-pointer font-medium"
            >
              <span className="text-sm text-muted-foreground mr-2">
                {index + 1}.
              </span>
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswerChange(value)}
        className="grid grid-cols-1 gap-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gradient-accent transition-all">
            <RadioGroupItem 
              value={option} 
              id={`${question.id}-${index}`}
              className="text-primary"
            />
            <Label 
              htmlFor={`${question.id}-${index}`} 
              className="flex-1 cursor-pointer font-medium leading-relaxed"
            >
              <span className="text-sm text-muted-foreground mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const getSectionColor = () => {
    switch (question.section) {
      case 'psychometric': return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'technical': return 'bg-gradient-to-r from-green-500 to-teal-600';
      case 'aptitude': return 'bg-gradient-to-r from-orange-500 to-red-600';
      case 'domain': return 'bg-gradient-to-r from-indigo-500 to-blue-600';
      default: return 'bg-primary';
    }
  };

  const getSectionName = () => {
    switch (question.section) {
      case 'psychometric': return 'Personality & Interest';
      case 'technical': return 'Technical Skills';
      case 'aptitude': return 'Logical Reasoning';
      case 'domain': return 'Domain Knowledge';
      default: return question.section;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getSectionColor()}`}>
            {getSectionName()}
          </span>
          <span className="text-sm text-muted-foreground">
            {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl font-bold leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === 'likert' ? renderLikertScale() : renderMultipleChoice()}
      </CardContent>
    </Card>
  );
};