
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typography from './Typography';
import EnhancedButton from './ui/enhanced-button';
import { Container } from './Layout';

interface OnboardingQuestionnaireProps {
  selectedCourse: string;
  onComplete: (answers: Record<string, string>) => void;
}

const OnboardingQuestionnaire: React.FC<OnboardingQuestionnaireProps> = ({ 
  selectedCourse, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      id: 'source',
      question: `How did you hear about Codeingo?`,
      options: [
        { id: 'google', label: 'Google Search', icon: '🔍' },
        { id: 'social', label: 'Social Media', icon: '📱' },
        { id: 'friends', label: 'Friends/Family', icon: '👥' },
        { id: 'youtube', label: 'YouTube', icon: '📺' },
        { id: 'blog', label: 'News/Article/Blog', icon: '📰' },
        { id: 'other', label: 'Other', icon: '💭' }
      ]
    },
    {
      id: 'motivation',
      question: `Why are you learning ${selectedCourse}?`,
      options: [
        { id: 'career', label: 'Boost my career', icon: '💼' },
        { id: 'school', label: 'Support my education', icon: '🎓' },
        { id: 'fun', label: 'Just for fun', icon: '🎉' },
        { id: 'productive', label: 'Spend time productively', icon: '🧠' },
        { id: 'connect', label: 'Connect with people', icon: '🤝' },
        { id: 'travel', label: 'Prepare for projects', icon: '✈️' },
        { id: 'other', label: 'Other', icon: '💭' }
      ]
    },
    {
      id: 'experience',
      question: `How much ${selectedCourse} do you know?`,
      options: [
        { id: 'new', label: "I'm new to this language", icon: '📊', level: 1 },
        { id: 'some', label: 'I know some common syntax', icon: '📊', level: 2 },
        { id: 'basic', label: 'I can write basic programs', icon: '📊', level: 3 },
        { id: 'intermediate', label: 'I can build simple projects', icon: '📊', level: 4 },
        { id: 'advanced', label: 'I can discuss most topics in detail', icon: '📊', level: 5 }
      ]
    }
  ];

  useEffect(() => {
    // Animate in the new question
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, x: 50 },
      { duration: 0.6, opacity: 1, x: 0, ease: "power2.out" }
    )
    .fromTo(".option-card",
      { opacity: 0, y: 30 },
      { duration: 0.4, opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );

  }, [currentStep]);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      // Animate out and move to next question
      gsap.to(containerRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setCurrentStep(currentStep + 1);
        }
      });
    } else {
      // Complete questionnaire
      onComplete(newAnswers);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Mascot */}
          <div ref={mascotRef} className="flex items-start space-x-6 mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-3xl">🦉</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg relative">
              <div className="absolute -left-3 top-6 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[12px] border-transparent border-r-white"></div>
              <Typography variant="h4" className="text-gray-800">
                {currentQuestion.question}
              </Typography>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Options */}
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="option-card bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-400 transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => handleAnswer(option.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{option.icon}</div>
                  <div>
                    <Typography variant="body" className="text-gray-800 font-medium">
                      {option.label}
                    </Typography>
                    {'level' in option && (
                      <div className="flex space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-6 h-2 rounded-full ${
                              level <= option.level! ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue button at bottom */}
          <div className="text-center mt-12">
            <Typography variant="caption" className="text-gray-500">
              Step {currentStep + 1} of {questions.length}
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OnboardingQuestionnaire;
