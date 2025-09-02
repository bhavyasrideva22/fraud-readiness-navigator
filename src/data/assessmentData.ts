export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'technical';
  section: 'psychometric' | 'technical' | 'aptitude' | 'domain';
  category: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
  correctAnswer?: string | number;
  points?: number;
}

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest & Personality
  {
    id: 'psych_1',
    type: 'likert',
    section: 'psychometric',
    category: 'interest',
    question: 'I enjoy solving puzzles and uncovering hidden patterns in data.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_2',
    type: 'likert',
    section: 'psychometric',
    category: 'personality',
    question: 'I prefer clear guidelines and structured workflows over ambiguous tasks.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_3',
    type: 'likert',
    section: 'psychometric',
    category: 'motivation',
    question: 'I am motivated to work on preventing wrongdoing and protecting organizations from fraud.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_4',
    type: 'likert',
    section: 'psychometric',
    category: 'personality',
    question: 'I pay attention to small details that others might overlook.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_5',
    type: 'likert',
    section: 'psychometric',
    category: 'interest',
    question: 'I find it fascinating to understand how different types of fraud schemes work.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_6',
    type: 'likert',
    section: 'psychometric',
    category: 'motivation',
    question: 'I am persistent when investigating complex problems, even when progress is slow.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_7',
    type: 'likert',
    section: 'psychometric',
    category: 'personality',
    question: 'I maintain high ethical standards even under pressure.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_8',
    type: 'likert',
    section: 'psychometric',
    category: 'interest',
    question: 'I would enjoy analyzing financial transactions to identify suspicious patterns.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },

  // Technical & Aptitude Section
  {
    id: 'tech_1',
    type: 'multiple-choice',
    section: 'technical',
    category: 'data-analysis',
    question: 'Which statistical measure is most useful for detecting outliers in transaction amounts?',
    options: [
      'Mean (Average)',
      'Standard Deviation',
      'Median',
      'Mode'
    ],
    correctAnswer: 'Standard Deviation',
    points: 10
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    section: 'technical',
    category: 'programming',
    question: 'In Python, which library is commonly used for data analysis and manipulation?',
    options: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Scikit-learn'
    ],
    correctAnswer: 'Pandas',
    points: 10
  },
  {
    id: 'tech_3',
    type: 'scenario',
    section: 'aptitude',
    category: 'logical-reasoning',
    question: 'You notice that credit card transactions from a specific merchant always occur in round numbers ($100, $200, $300) and only during business hours. What type of fraud pattern might this indicate?',
    options: [
      'Card skimming at the merchant location',
      'Employee fraud using stolen card numbers',
      'Legitimate business transactions - no fraud',
      'Account takeover fraud'
    ],
    correctAnswer: 'Employee fraud using stolen card numbers',
    points: 15
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    section: 'technical',
    category: 'domain-knowledge',
    question: 'What is the primary purpose of the "3-2-1 rule" in fraud detection?',
    options: [
      'Three failed login attempts, two-factor authentication, one warning',
      'Three data sources, two validation methods, one decision',
      'A backup strategy: 3 copies, 2 different media, 1 offsite',
      'Three strikes policy for suspicious accounts'
    ],
    correctAnswer: 'Three data sources, two validation methods, one decision',
    points: 15
  },
  {
    id: 'tech_5',
    type: 'scenario',
    section: 'domain',
    category: 'fraud-types',
    question: 'A customer reports multiple small charges on their card from unfamiliar merchants, all processed within a few hours. This pattern most likely indicates:',
    options: [
      'Card testing fraud',
      'Account takeover',
      'Merchant fraud',
      'Identity theft'
    ],
    correctAnswer: 'Card testing fraud',
    points: 15
  },
  {
    id: 'tech_6',
    type: 'multiple-choice',
    section: 'technical',
    category: 'data-analysis',
    question: 'Which machine learning technique is most commonly used for anomaly detection in fraud prevention?',
    options: [
      'Linear Regression',
      'Decision Trees',
      'Clustering (e.g., K-means)',
      'Natural Language Processing'
    ],
    correctAnswer: 'Clustering (e.g., K-means)',
    points: 15
  }
];

export interface WiscarScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScore;
  overallScore: number;
  recommendation: 'highly-recommended' | 'recommended' | 'consider-alternatives' | 'not-recommended';
  strengths: string[];
  improvementAreas: string[];
  nextSteps: string[];
  careerPaths: string[];
}

export const careerPaths = [
  {
    title: 'Fraud Analyst',
    description: 'Monitor and investigate suspicious financial activities',
    requirements: ['Data analysis skills', 'Attention to detail', 'Basic programming'],
    salary: '$45,000 - $75,000'
  },
  {
    title: 'AML Compliance Officer',
    description: 'Ensure adherence to anti-money laundering regulations',
    requirements: ['Regulatory knowledge', 'Risk assessment', 'Documentation skills'],
    salary: '$60,000 - $95,000'
  },
  {
    title: 'Cyber Fraud Specialist',
    description: 'Detect and prevent cyber-based fraud attempts',
    requirements: ['Cybersecurity knowledge', 'Technical skills', 'Incident response'],
    salary: '$65,000 - $110,000'
  },
  {
    title: 'Financial Crime Investigator',
    description: 'Lead investigations on complex fraud schemes',
    requirements: ['Investigation skills', 'Legal knowledge', 'Advanced analytics'],
    salary: '$70,000 - $120,000'
  },
  {
    title: 'Risk Management Analyst',
    description: 'Analyze and mitigate operational fraud risks',
    requirements: ['Risk modeling', 'Statistical analysis', 'Business acumen'],
    salary: '$55,000 - $90,000'
  }
];

export const learningPaths = {
  beginner: [
    'Fraud Fundamentals Course',
    'Introduction to Data Analysis',
    'Basic Python Programming',
    'Compliance and Ethics Training'
  ],
  intermediate: [
    'Advanced Statistical Analysis',
    'Machine Learning for Fraud Detection',
    'SQL for Data Analysis',
    'Financial Crime Typologies'
  ],
  advanced: [
    'Advanced ML Algorithms',
    'Forensic Accounting',
    'Regulatory Frameworks',
    'Real-world Case Studies'
  ]
};