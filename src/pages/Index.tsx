
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import CodeingoHero from '../components/CodeingoHero';
import CourseSelection from '../components/CourseSelection';
import OnboardingQuestionnaire from '../components/OnboardingQuestionnaire';

type AppState = 'landing' | 'courses' | 'onboarding' | 'dashboard';

interface Course {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  isRecommended?: boolean;
  prerequisite?: string;
  lessons: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleGetStarted = () => {
    setAppState('courses');
  };

  const handleLogin = () => {
    setAppState('courses');
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setAppState('onboarding');
  };

  const handleOnboardingComplete = (answers: Record<string, string>) => {
    console.log('Onboarding completed:', answers);
    console.log('Selected course:', selectedCourse);
    // Here you would typically save the data and redirect to the learning dashboard
    setAppState('dashboard');
  };

  if (appState === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Codeingo!</h1>
          <p className="text-gray-600">Ready to start your {selectedCourse?.name} journey?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {appState === 'landing' && <Navigation />}
      
      {appState === 'landing' && (
        <CodeingoHero 
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      )}
      
      {appState === 'courses' && (
        <CourseSelection onCourseSelect={handleCourseSelect} />
      )}
      
      {appState === 'onboarding' && selectedCourse && (
        <OnboardingQuestionnaire 
          selectedCourse={selectedCourse.name}
          onComplete={handleOnboardingComplete}
        />
      )}
    </div>
  );
};

export default Index;
