import React from 'react';
import './CourseTitle.css';
import { CourseTitleProps } from "./CourseTitle.typings";

export const CourseTitle: React.FC<CourseTitleProps> = (props) => {
  return (
    <section className="course-title">
      <h1>{props.title}</h1>
    </section>
  );
};
