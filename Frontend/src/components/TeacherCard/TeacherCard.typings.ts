import {IEducationItemProps} from "./IEducationItemProps.typing";
import {ICourseItemProps} from "./ICourseItemProps.typing";

export interface ISkill {
    id: number;
    name: string;
}

export interface ITeacherCardProps {
    id: number;
    name: string;
    role: string;
    photo: string;
    description: string;
    profileUrl: string;
    email?: string;
    github?: string;
    telegram?: string;
    phone?: string;
    skills?: ISkill[];
    education?: IEducationItemProps[];
    courses?: ICourseItemProps[];
    location?: string;
}