import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { assessmentQuestions } from "@/data/assessmentData";
import { UserAnswer, calculateScores } from "@/utils/scoring";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)?.answer || null;

  const handleAnswerChange = (answer: string | number) => {
    const updatedAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    updatedAnswers.push({ questionId: currentQuestion.id, answer });
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate results and navigate to results page
      const results = calculateScores(answers, assessmentQuestions);
      navigate('/results', { state: { results } });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = currentAnswer !== null && currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Fraud Detection Expert Assessment</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Exit Assessment
                </Button>
              </div>
              <ProgressBar
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={assessmentQuestions.length}
              />
            </CardContent>
          </Card>

          {/* Question */}
          <QuestionCard
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={assessmentQuestions.length}
          />

          {/* Navigation */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstQuestion}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {canProceed ? (
                      isLastQuestion ? 'Ready to see your results?' : 'Ready for the next question?'
                    ) : (
                      'Please select an answer to continue'
                    )}
                  </p>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2 bg-gradient-primary text-white"
                >
                  {isLastQuestion ? 'View Results' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Info */}
          <Card className="shadow-soft bg-gradient-accent">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Section: <span className="font-medium text-foreground">
                    {currentQuestion.section === 'psychometric' && 'Personality & Interest Assessment'}
                    {currentQuestion.section === 'technical' && 'Technical Skills Evaluation'}
                    {currentQuestion.section === 'aptitude' && 'Logical Reasoning'}
                    {currentQuestion.section === 'domain' && 'Domain Knowledge'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;