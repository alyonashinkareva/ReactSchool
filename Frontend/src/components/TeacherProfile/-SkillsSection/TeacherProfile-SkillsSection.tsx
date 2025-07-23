import React from 'react';
import './TeacherProfile-SkillsSection.css';

interface SkillsSectionProps {
    title: string;
    skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="skills-list">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;