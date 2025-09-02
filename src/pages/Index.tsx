import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Shield, TrendingUp, Users, Award, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <TrendingUp className="h-6 w-6" />, value: "15%", label: "Annual Growth Rate" },
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Job Opportunities" },
    { icon: <Award className="h-6 w-6" />, value: "$85K", label: "Average Salary" },
  ];

  const benefits = [
    "High-demand career with excellent job security",
    "Meaningful work protecting organizations and consumers",
    "Competitive salaries and growth opportunities", 
    "Perfect blend of technology and investigation",
    "Remote work opportunities available",
    "Continuous learning and skill development"
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero */}
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
              ⚡ Career Assessment Tool
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Discover Your Future in
              <br />
              <span className="text-primary">Fraud Detection</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Take our comprehensive career assessment to discover if you have what it takes to become 
              a fraud detection expert. Get personalized insights, career recommendations, and a clear roadmap to success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-strong group"
                onClick={() => navigate('/intro')}
              >
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/intro')}
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ⏱️ Takes 20-30 minutes • 🆓 Completely free • 📊 Instant results
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Fraud Detection */}
          <Card className="shadow-medium mb-16 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4">Why Fraud Detection?</CardTitle>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                In an increasingly digital world, fraud detection experts are the guardians protecting billions of dollars 
                and millions of consumers from sophisticated fraud schemes.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">What You'll Do:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Analyze transaction patterns using advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Investigate suspicious activities and build cases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Develop machine learning models for detection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Collaborate with law enforcement and legal teams</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Why Choose This Field:</h4>
                  <ul className="space-y-3">
                    {benefits.slice(0, 4).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="shadow-strong bg-gradient-primary text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Potential?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Our scientifically-designed assessment evaluates your personality fit, technical aptitude, 
                and career readiness using the proven WISCAR framework.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-medium"
                onClick={() => navigate('/intro')}
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;