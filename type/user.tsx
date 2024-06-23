import { Project } from "./project";
import { Skill } from "./skills";

export type UserProfile = {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  displayname: string;
  image: string;
  correction_point: number;
  wallet: number;
  level: number;
};

export type User = {
  userProfile: UserProfile;
  userSkills: Skill[];
  userProjects: Project[];
};
