
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Typography from './Typography';
import EnhancedButton from './ui/enhanced-button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  icon: string;
}

interface OnboardingQuestionnaireProps {
  course: Course;
  onComplete: (answers: any) => void;
  onBack: () => void;
}

const OnboardingQuestionnaire: React.FC<OnboardingQuestionnaireProps> = ({ 
  course, 
  onComplete, 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const questionRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      question: "Where did you hear about Codeingo?",
      options: ["Google", "Social Media", "Friends", "Other"]
    },
    {
      question: `Why are you learning ${course.name}?`,
      options: ["For Work", "For School", "For Entertainment", "Other"]
    },
    {
      question: `How much do you already know about ${course.name}?`,
      options: ["I'm New", "I Know a Bit", "Basic Knowledge", "Average", "Expert"]
    }
  ];

  useEffect(() => {
    // Animate question entrance
    if (questionRef.current) {
      gsap.fromTo(questionRef.current,
        { opacity: 0, x: 50 },
        { duration: 0.5, opacity: 1, x: 0, ease: "power2.out" }
      );
    }
  }, [currentStep]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = { ...answers, [currentStep]: option };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      // Animate out current question
      gsap.to(questionRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentStep(currentStep + 1);
        }
      });
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      gsap.to(questionRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentStep(currentStep - 1);
        }
      });
    } else {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{course.icon}</span>
            <Typography variant="h4" className="text-gray-800">
              {course.name}
            </Typography>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="mb-6">
          <div className="flex space-x-2 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div ref={questionRef} className="text-center">
          <Typography variant="h3" className="text-gray-800 mb-8">
            {questions[currentStep].question}
          </Typography>

          <div className="space-y-4">
            {questions[currentStep].options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
              >
                <Typography variant="body" className="text-gray-700 group-hover:text-green-600 font-medium">
                  {option}
                </Typography>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Typography variant="caption" className="text-gray-500">
            Step {currentStep + 1} of {questions.length}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
