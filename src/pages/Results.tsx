import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreCard } from "@/components/ScoreCard";
import { RadarChart } from "@/components/RadarChart";
import { AssessmentResult } from "@/data/assessmentData";
import { careerPaths, learningPaths } from "@/data/assessmentData";
import { Award, TrendingUp, BookOpen, Target, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const results: AssessmentResult = location.state?.results;

  if (!results) {
    navigate('/');
    return null;
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'highly-recommended': return 'success';
      case 'recommended': return 'primary';
      case 'consider-alternatives': return 'warning';
      case 'not-recommended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'highly-recommended': return 'Highly Recommended';
      case 'recommended': return 'Recommended';
      case 'consider-alternatives': return 'Consider Alternatives';
      case 'not-recommended': return 'Not Recommended';
      default: return 'Unknown';
    }
  };

  const getRecommendationDescription = (recommendation: string) => {
    switch (recommendation) {
      case 'highly-recommended':
        return 'You show excellent potential for a successful career in fraud detection. Your personality, skills, and interests align strongly with this field.';
      case 'recommended':
        return 'You have good potential for fraud detection roles. With some additional development in key areas, you could thrive in this field.';
      case 'consider-alternatives':
        return 'While fraud detection might be possible, you may find better fit in related fields. Consider the alternative career paths suggested below.';
      case 'not-recommended':
        return 'Based on your assessment, other career paths might be a better fit. Explore the alternatives suggested to find your ideal career direction.';
      default:
        return '';
    }
  };

  const handleShare = () => {
    toast({
      title: "Results Shared!",
      description: "Your assessment results have been prepared for sharing.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your detailed assessment report is being prepared.",
    });
  };

  const relevantCareerPaths = careerPaths.filter(path => 
    results.careerPaths.includes(path.title)
  );

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge className="bg-success/10 text-success border-success/20">
              Assessment Complete
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">Your Fraud Detection Career Assessment Results</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your responses, here's your comprehensive analysis and personalized recommendations.
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="shadow-medium border-2 border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Award className="h-8 w-8 text-primary" />
                <Badge 
                  variant="outline" 
                  className={`text-lg px-4 py-2 bg-${getRecommendationColor(results.recommendation)}/10 text-${getRecommendationColor(results.recommendation)} border-${getRecommendationColor(results.recommendation)}/20`}
                >
                  {getRecommendationText(results.recommendation)}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold mb-2">
                Overall Score: {Math.round(results.overallScore)}%
              </CardTitle>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {getRecommendationDescription(results.recommendation)}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share className="h-4 w-4" />
                  Share Results
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <ScoreCard
              title="Personality & Interest Fit"
              score={results.psychometricScore}
              maxScore={100}
              description="How well your personality traits and interests align with fraud detection roles."
            />
            <ScoreCard
              title="Technical Readiness"
              score={results.technicalScore}
              maxScore={100}
              description="Your current technical skills and knowledge in fraud detection and data analysis."
            />
          </div>

          {/* WISCAR Analysis */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <RadarChart scores={results.wiscarScores} />
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Dimension Breakdown:</h4>
                  <div className="space-y-3">
                    {Object.entries(results.wiscarScores).map(([key, score]) => (
                      <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-gradient-accent">
                        <span className="font-medium capitalize">
                          {key === 'realWorld' ? 'Real-World Fit' : 
                           key === 'ability' ? 'Ability to Learn' : key}
                        </span>
                        <Badge variant="outline" className="font-bold">
                          {Math.round(score)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Areas for Improvement */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-success flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-warning flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Areas for Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Career Paths & Next Steps */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Recommended Career Paths</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relevantCareerPaths.map((career, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gradient-accent transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{career.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {career.salary}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Requirements: </span>
                      {career.requirements.join(', ')}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Your Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Immediate Actions:</h4>
                    <ul className="space-y-2">
                      {results.nextSteps.slice(0, 3).map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Learning Path:</h4>
                    <div className="space-y-2">
                      {results.overallScore >= 70 ? (
                        learningPaths.intermediate.slice(0, 3).map((course, index) => (
                          <div key={index} className="text-sm p-2 bg-gradient-accent rounded">
                            {course}
                          </div>
                        ))
                      ) : (
                        learningPaths.beginner.slice(0, 3).map((course, index) => (
                          <div key={index} className="text-sm p-2 bg-gradient-accent rounded">
                            {course}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card className="shadow-medium">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold">Ready to Take the Next Step?</h3>
              <p className="text-muted-foreground">
                Use these results to guide your career development and start building your path in fraud detection.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-primary text-white"
                >
                  Take Assessment Again
                </Button>
                <Button variant="outline" onClick={() => navigate('/intro')}>
                  Learn More About Fraud Detection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;