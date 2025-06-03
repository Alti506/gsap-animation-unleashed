
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typography from './Typography';
import { Container } from './Layout';
import { X } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  icon: string;
  progress: string;
  description?: string;
  recommended?: boolean;
  prerequisite?: string;
}

interface CourseSelectionProps {
  onCourseSelect: (course: Course) => void;
  onClose: () => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ onCourseSelect, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  const courses: Course[] = [
    { id: 'python', name: 'Python', icon: '🐍', progress: '0/12' },
    { id: 'html', name: 'HTML', icon: '📄', progress: '0/8', recommended: true },
    { id: 'css', name: 'CSS', icon: '🎨', progress: '0/10' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', progress: '0/16' },
    { id: 'typescript', name: 'TypeScript', icon: '📘', progress: '0/8', prerequisite: 'JS required' },
    { id: 'react', name: 'React', icon: '⚛️', progress: '0/12', prerequisite: 'HTML, CSS & JS required' },
    { id: 'swift', name: 'Swift', icon: '🔶', progress: '0/10' },
    { id: 'sql', name: 'SQL', icon: '🗄️', progress: '0/8' }
  ];

  useEffect(() => {
    try {
      // Container entrance
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.9 },
        { duration: 0.3, opacity: 1, scale: 1, ease: "power2.out" }
      );

      // Staggered course cards animation
      const courseCards = coursesRef.current?.children;
      if (courseCards) {
        gsap.fromTo(courseCards, 
          { opacity: 0, y: 40, scale: 0.9 },
          { 
            duration: 0.5, 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            stagger: 0.1, 
            ease: "back.out(1.2)",
            delay: 0.2
          }
        );
      }
    } catch (error) {
      console.error("Error in Course Selection animation:", error);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={containerRef}
        className="bg-slate-800 border border-purple-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <Typography variant="h2" className="text-purple-300">
              Languages
            </Typography>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-purple-600/20 rounded-full transition-colors duration-200"
            >
              <X size={24} className="text-gray-300" />
            </button>
          </div>

          <div ref={coursesRef} className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseSelect(course)}
                className="bg-slate-700/50 hover:bg-purple-900/30 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border-2 border-transparent hover:border-purple-500/50 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <Typography variant="h4" className="text-gray-200 group-hover:text-purple-300 transition-colors duration-200">
                          {course.name}
                        </Typography>
                        {course.recommended && (
                          <span className="bg-purple-600/20 text-purple-300 text-xs font-bold px-2 py-1 rounded-full border border-purple-400/30">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      {course.prerequisite && (
                        <Typography variant="caption" className="text-gray-400">
                          {course.prerequisite}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <div className="bg-slate-600/50 rounded-full px-4 py-2 border border-gray-500/30">
                    <Typography variant="caption" className="text-gray-300 font-medium">
                      {course.progress}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelection;
