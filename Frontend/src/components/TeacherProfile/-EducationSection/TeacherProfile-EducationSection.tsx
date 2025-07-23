import React from 'react';
import {IEducationItemProps} from "../../TeacherCard/IEducationItemProps.typing";
import './TeacherProfile-EducationSection.css';

const EducationItem: React.FC<IEducationItemProps> = ({
    period,
    institution,
    location,
    details
}) => {
    return (
        <div className="experience-item">
            <div className="experience-period">{period}</div>
            <div className="experience-company">{institution}</div>
            <div className="experience-location">{location}</div>
            <div className="experience-position">{details}</div>
        </div>
    );
};

interface EducationSectionProps {
    title: string;
    educationList: IEducationItemProps[];
}

export const TeacherProfileEducationSection: React.FC<EducationSectionProps> = ({
    title,
    educationList
}) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="experience-list">
                {educationList.map((item, index) => (
                    <EducationItem
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default TeacherProfileEducationSection; 