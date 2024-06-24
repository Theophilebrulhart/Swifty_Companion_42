import { Campus } from "@/type/campus";
import { Event } from "@/type/event";
import { Project } from "@/type/project";
import { UserProfile } from "@/type/user";

export const UserProfilModel = (response: any): UserProfile => {
  const {
    id,
    email,
    login,
    first_name,
    last_name,
    displayname,
    wallet,
    correction_point,
  } = response.data;
  const { level } = response.data.cursus_users[1];
  const image = response.data.image.link;
  const userProfile: UserProfile = {
    id,
    email,
    login,
    first_name,
    last_name,
    displayname,
    wallet,
    correction_point,
    level,
    image,
  };

  return userProfile;
};

export const projectModel = (projects: any): Project[] => {
  const projectsModel: Project[] = [];

  projects.map((project: any) => {
    const {
      created_at,
      final_mark,
      status,
      ["validated?"]: validated,
    } = project;
    const name = project.project.name;
    projectsModel.push({
      created_at,
      final_mark,
      name,
      status,
      validated,
    } as Project);
  });
  return projectsModel;
};

export const campusModel = (campus: any): Campus => {
  const { active, address, city, country, id, name } = campus;
  const campusModel: Campus = { active, address, city, country, id, name };
  return campusModel;
};

export const eventModel = (events: any): Event[] => {
  const eventsModel: Event[] = [];
  events.map((event: any) => {
    const {
      begin_at,
      created_at,
      description,
      end_at,
      id,
      kind,
      location,
      max_people,
      name,
      nbr_subscriber,
    } = event;
    const eventModel: Event = {
      begin_at,
      created_at,
      description,
      end_at,
      id,
      kind,
      location,
      max_people,
      name,
      nbr_subscriber,
    };
    eventsModel.push(eventModel);
  });

  return eventsModel;
};
