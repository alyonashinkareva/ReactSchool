import React from 'react';
import Header from '../Header';
import { TeacherProfileProps } from './TeacherProfile.typings';
import { SkillsSection } from "./-SkillsSection";
import { TeacherProfileCourseSection } from "./-CourseSection";
import { TeacherProfileSocial } from './-ProfileSocial';
import { TeacherProfileHeader } from './-ProfileHeader';
import { TeacherProfileEducationSection } from './-EducationSection';
import './TeacherProfile.css';

export const TeacherProfile: React.FC<TeacherProfileProps> = (props) => {
  const { teacher } = props;
  
  // Отладочная информация
  console.log("🎭 TeacherProfile received teacher:", teacher);
  console.log("🔧 Skills check:", teacher.skills, "Length:", teacher.skills?.length);
  console.log("📚 Courses check:", teacher.courses, "Length:", teacher.courses?.length);
  console.log("🎓 Education check:", teacher.education, "Length:", teacher.education?.length);
  
  // const goBack = () => {
  //   window.history.back();
  // };

  return (
    <div className="teacher-profile-page">
      <Header />
      
      <div className="profile-content">
        
          <TeacherProfileHeader 
            name={teacher.name}
            photo={teacher.photo}
            role={teacher.role}
            location={teacher.location}
          />


        <div className="profile-details">
          <div className="profile-column profile-bio">
            <div className="section-block">
              <h2>О преподавателе</h2>
              <p className="bio-text">{teacher.description}</p>
            </div>

            <div className="section-block">
              {teacher.skills && teacher.skills.length > 0 && (
                <SkillsSection
                  title="Навыки"
                  skills={teacher.skills.map(skill => skill.name)}
                />
              )}
            </div>

            <div className="section-block">
              <TeacherProfileSocial
                github={teacher.github}
                telegram={teacher.telegram}
                email={teacher.email}
                phone={teacher.phone}
              />
            </div>
          </div>

          <div className="profile-column profile-info">
            <div className="section-block">
              {teacher.education && teacher.education.length > 0 && (
                <TeacherProfileEducationSection
                  title="Опыт работы"
                  educationList={teacher.education}
                />
              )}
            </div>
          </div>
        </div>

        <div className="profile-courses">
          <div className="section-block">
            {teacher.courses && teacher.courses.length > 0 && (
              <TeacherProfileCourseSection
                title="Преподаваемые курсы"
                teacherId={teacher.id.toString()}
              />
            )}
          </div>
        </div>
        {/* <div className="profile-footer">
          <Button variant="secondary" onClick={goToSite} icon_left={<span className="back-icon">←</span>}>
            Назад к списку преподавателей
          </Button>
        </div> */}
      </div>
    </div>
  );
};