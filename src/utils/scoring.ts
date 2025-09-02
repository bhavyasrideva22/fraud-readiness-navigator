import { Question, WiscarScore, AssessmentResult } from "@/data/assessmentData";

export interface UserAnswer {
  questionId: string;
  answer: string | number;
}

export const calculateScores = (answers: UserAnswer[], questions: Question[]): AssessmentResult => {
  const psychometricQuestions = questions.filter(q => q.section === 'psychometric');
  const technicalQuestions = questions.filter(q => q.section === 'technical' || q.section === 'aptitude' || q.section === 'domain');
  
  // Calculate psychometric score (based on Likert scale responses)
  const psychometricAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId)
  );
  
  const psychometricScore = (psychometricAnswers.reduce((sum, answer) => {
    return sum + (typeof answer.answer === 'number' ? answer.answer : 0);
  }, 0) / (psychometricAnswers.length * 5)) * 100;

  // Calculate technical score (based on correct answers)
  const technicalAnswers = answers.filter(a => 
    technicalQuestions.some(q => q.id === a.questionId)
  );
  
  let technicalCorrect = 0;
  let totalTechnicalPoints = 0;
  
  technicalAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.correctAnswer) {
      totalTechnicalPoints += question.points || 10;
      if (answer.answer === question.correctAnswer) {
        technicalCorrect += question.points || 10;
      }
    }
  });
  
  const technicalScore = totalTechnicalPoints > 0 ? (technicalCorrect / totalTechnicalPoints) * 100 : 0;

  // Calculate WISCAR scores
  const wiscarScores: WiscarScore = calculateWiscarScores(answers, questions);
  
  // Calculate overall score (weighted average)
  const overallScore = (psychometricScore * 0.4) + (technicalScore * 0.4) + (getWiscarAverage(wiscarScores) * 0.2);

  // Determine recommendation
  const recommendation = getRecommendation(overallScore, psychometricScore, technicalScore);
  
  // Generate insights
  const strengths = getStrengths(psychometricScore, technicalScore, wiscarScores);
  const improvementAreas = getImprovementAreas(psychometricScore, technicalScore, wiscarScores);
  const nextSteps = getNextSteps(recommendation, improvementAreas);
  const careerPaths = getCareerPaths(overallScore, strengths);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    strengths,
    improvementAreas,
    nextSteps,
    careerPaths
  };
};

const calculateWiscarScores = (answers: UserAnswer[], questions: Question[]): WiscarScore => {
  const getScoreByCategory = (category: string, section: string) => {
    const categoryAnswers = answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question && question.category === category && question.section === section;
    });
    
    if (categoryAnswers.length === 0) return 70; // Default score
    
    const avgScore = categoryAnswers.reduce((sum, answer) => {
      return sum + (typeof answer.answer === 'number' ? answer.answer : 3);
    }, 0) / categoryAnswers.length;
    
    return (avgScore / 5) * 100; // Convert to 0-100 scale
  };

  return {
    will: getScoreByCategory('motivation', 'psychometric'),
    interest: getScoreByCategory('interest', 'psychometric'),
    skill: Math.min(getScoreByCategory('data-analysis', 'technical') + 
                    getScoreByCategory('programming', 'technical'), 100),
    cognitive: getScoreByCategory('logical-reasoning', 'aptitude'),
    ability: getScoreByCategory('personality', 'psychometric'),
    realWorld: getScoreByCategory('domain-knowledge', 'technical')
  };
};

const getWiscarAverage = (scores: WiscarScore): number => {
  const values = Object.values(scores);
  return values.reduce((sum, score) => sum + score, 0) / values.length;
};

const getRecommendation = (
  overallScore: number, 
  psychometricScore: number, 
  technicalScore: number
): AssessmentResult['recommendation'] => {
  if (overallScore >= 80 && psychometricScore >= 75 && technicalScore >= 70) {
    return 'highly-recommended';
  } else if (overallScore >= 65 && psychometricScore >= 60) {
    return 'recommended';
  } else if (overallScore >= 45) {
    return 'consider-alternatives';
  } else {
    return 'not-recommended';
  }
};

const getStrengths = (psychometric: number, technical: number, wiscar: WiscarScore): string[] => {
  const strengths: string[] = [];
  
  if (psychometric >= 75) strengths.push('Strong personality fit for fraud detection');
  if (technical >= 70) strengths.push('Solid technical foundation');
  if (wiscar.will >= 80) strengths.push('High motivation and persistence');
  if (wiscar.interest >= 80) strengths.push('Genuine interest in fraud prevention');
  if (wiscar.cognitive >= 75) strengths.push('Strong analytical thinking');
  if (wiscar.ability >= 75) strengths.push('Good learning adaptability');
  
  return strengths.length > 0 ? strengths : ['Enthusiasm for learning', 'Attention to detail'];
};

const getImprovementAreas = (psychometric: number, technical: number, wiscar: WiscarScore): string[] => {
  const areas: string[] = [];
  
  if (technical < 60) areas.push('Technical skills development (programming, data analysis)');
  if (wiscar.skill < 60) areas.push('Hands-on experience with fraud detection tools');
  if (psychometric < 60) areas.push('Building confidence in investigative work');
  if (wiscar.realWorld < 60) areas.push('Domain knowledge of fraud schemes and prevention');
  
  return areas.length > 0 ? areas : ['Continue building on existing strengths'];
};

const getNextSteps = (recommendation: AssessmentResult['recommendation'], improvements: string[]): string[] => {
  const baseSteps: string[] = [];
  
  switch (recommendation) {
    case 'highly-recommended':
      baseSteps.push(
        'Apply for entry-level fraud analyst positions',
        'Pursue relevant certifications (CFE, CAMS)',
        'Build a portfolio with fraud detection projects'
      );
      break;
    case 'recommended':
      baseSteps.push(
        'Complete a fraud detection course or bootcamp',
        'Gain experience through internships or volunteer work',
        'Strengthen technical skills with online courses'
      );
      break;
    case 'consider-alternatives':
      baseSteps.push(
        'Explore related fields (risk management, compliance)',
        'Take foundational courses in data analysis',
        'Consider entry-level positions to gain experience'
      );
      break;
    default:
      baseSteps.push(
        'Focus on building foundational skills',
        'Explore other career paths that align with your interests',
        'Consider general business or technology roles'
      );
  }
  
  return baseSteps;
};

const getCareerPaths = (overallScore: number, strengths: string[]): string[] => {
  const paths: string[] = [];
  
  if (overallScore >= 70) {
    paths.push('Fraud Analyst', 'AML Compliance Officer');
  }
  if (overallScore >= 80) {
    paths.push('Cyber Fraud Specialist', 'Financial Crime Investigator');
  }
  if (strengths.some(s => s.includes('technical'))) {
    paths.push('Risk Management Analyst');
  }
  
  return paths.length > 0 ? paths : ['Entry-level Risk Analyst', 'Compliance Assistant'];
};