
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '../components/Navigation';
import CodeingoHero from '../components/CodeingoHero';
import CourseSelection from '../components/CourseSelection';
import OnboardingQuestionnaire from '../components/OnboardingQuestionnaire';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface Course {
  id: string;
  name: string;
  icon: string;
  progress: string;
  description?: string;
  recommended?: boolean;
  prerequisite?: string;
}

const Index = () => {
  const [showCourseSelection, setShowCourseSelection] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Smooth page entry
      gsap.set("body", { overflow: "hidden" });
      gsap.to("body", { overflow: "auto", delay: 1.5 });

      // Enhanced navigation animation
      const navItems = document.querySelectorAll(".nav-item");
      if (navItems.length > 0) {
        gsap.fromTo(navItems, 
          { y: -30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.08, 
            ease: "power2.out", 
            delay: 0.8 
          }
        );
      }

      console.log("Codeingo GSAP animations initialized");
    } catch (error) {
      console.error("Error initializing GSAP animations:", error);
    }

    return () => {
      try {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []);

  const handleLoginClick = () => {
    setShowCourseSelection(true);
  };

  const handleSignUpClick = () => {
    setShowCourseSelection(true);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseSelection(false);
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = (answers: any) => {
    console.log('Questionnaire completed:', { course: selectedCourse, answers });
    // Here you would typically send the data to your backend
    // For now, we'll just close the questionnaire
    setShowQuestionnaire(false);
    setSelectedCourse(null);
  };

  const handleQuestionnaireBack = () => {
    setShowQuestionnaire(false);
    setShowCourseSelection(true);
  };

  const handleCloseCourseSelection = () => {
    setShowCourseSelection(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white">
      <Navigation />
      <CodeingoHero 
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
      />
      
      {showCourseSelection && (
        <CourseSelection 
          onCourseSelect={handleCourseSelect}
          onClose={handleCloseCourseSelection}
        />
      )}

      {showQuestionnaire && selectedCourse && (
        <OnboardingQuestionnaire 
          course={selectedCourse}
          onComplete={handleQuestionnaireComplete}
          onBack={handleQuestionnaireBack}
        />
      )}
    </div>
  );
};

export default Index;
