
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typography from './Typography';
import { Container } from './Layout';

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

interface CourseSelectionProps {
  onCourseSelect: (course: Course) => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ onCourseSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const courses: Course[] = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'bg-blue-500', lessons: 12 },
    { id: 'html', name: 'HTML', icon: '🌐', color: 'bg-orange-500', isRecommended: true, lessons: 16 },
    { id: 'css', name: 'CSS', icon: '🎨', color: 'bg-purple-500', lessons: 14 },
    { id: 'sql', name: 'SQL', icon: '🗄️', color: 'bg-indigo-500', lessons: 10 },
    { id: 'swift', name: 'Swift', icon: '🍎', color: 'bg-red-500', lessons: 18 },
    { id: 'react', name: 'React', icon: '⚛️', color: 'bg-cyan-500', prerequisite: 'HTML, CSS & JS required', lessons: 22 },
    { id: 'typescript', name: 'TypeScript', icon: '📘', color: 'bg-blue-600', prerequisite: 'JS required', lessons: 16 },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', color: 'bg-yellow-500', lessons: 20 }
  ];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    try {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }
      );

      // Animate course cards with stagger
      const courseCards = containerRef.current?.querySelectorAll('.course-card');
      if (courseCards) {
        gsap.fromTo(courseCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.4
          }
        );
      }
    } catch (error) {
      console.error("Error in Course Selection animation:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Typography 
            variant="h2" 
            ref={titleRef}
            className="text-center text-gray-800 mb-12"
          >
            Languages
          </Typography>
          
          <div ref={containerRef} className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-400 transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => onCourseSelect(course)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center text-2xl text-white`}>
                      {course.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Typography variant="h4" className="text-gray-800">
                          {course.name}
                        </Typography>
                        {course.isRecommended && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      {course.prerequisite && (
                        <Typography variant="caption" className="text-gray-500">
                          {course.prerequisite}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full flex items-center justify-center">
                      <Typography variant="caption" className="text-gray-500">
                        0/{course.lessons}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseSelection;
