import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssessmentIntro = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Comprehensive Evaluation",
      description: "Assess your personality fit, technical skills, and career alignment for fraud detection roles."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "WISCAR Framework",
      description: "Evaluate Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Personalized Results",
      description: "Get tailored recommendations, career paths, and learning plans based on your unique profile."
    }
  ];

  const careers = [
    { title: "Fraud Analyst", salary: "$45K - $75K" },
    { title: "AML Compliance Officer", salary: "$60K - $95K" },
    { title: "Cyber Fraud Specialist", salary: "$65K - $110K" },
    { title: "Financial Crime Investigator", salary: "$70K - $120K" },
    { title: "Risk Management Analyst", salary: "$55K - $90K" }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Career Assessment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Is Fraud Detection Expert Right for You?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover your potential in the growing field of fraud detection. Our comprehensive assessment 
              evaluates your personality fit, technical aptitude, and career readiness for fraud prevention roles.
            </p>
          </div>

          {/* What is Fraud Detection */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">What is Fraud Detection?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Fraud Detection Experts identify, analyze, and prevent fraudulent activities using advanced 
                data analytics, machine learning, and domain expertise. This critical role protects organizations 
                and consumers across finance, e-commerce, insurance, and cybersecurity sectors.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Monitor transaction patterns for anomalies</li>
                    <li>• Investigate suspicious activities</li>
                    <li>• Develop fraud prevention strategies</li>
                    <li>• Use machine learning for detection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Essential Skills:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Analytical thinking & attention to detail</li>
                    <li>• Data analysis & programming (Python, SQL)</li>
                    <li>• Pattern recognition & investigation</li>
                    <li>• Ethics & regulatory compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Career Paths */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">Career Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careers.map((career, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gradient-accent transition-all">
                    <h4 className="font-semibold">{career.title}</h4>
                    <p className="text-sm text-muted-foreground">{career.salary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Info */}
          <Card className="shadow-medium border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Assessment Details</h3>
                  <p className="text-muted-foreground">Complete evaluation in 20-30 minutes</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-3">What You'll Complete:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Personality & Interest Assessment (8 questions)</li>
                    <li>• Technical Skills Evaluation (6 questions)</li>
                    <li>• Logical Reasoning Tests</li>
                    <li>• Domain Knowledge Quiz</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What You'll Receive:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive WISCAR analysis</li>
                    <li>• Personalized career recommendations</li>
                    <li>• Skill gap analysis & learning plan</li>
                    <li>• Alternative career path suggestions</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 text-lg font-semibold shadow-medium"
                  onClick={() => navigate('/assessment')}
                >
                  Start Assessment
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Free • No registration required • Instant results
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;