import { Coalition } from "@/type/coalition";
import axios from "axios";
import { eventModel } from "./createModelObject";
import { Event } from "@/type/event";

function getCoalColor(color: string, percent: number): string {
  let num = parseInt(color.slice(1), 16);
  let amt = Math.round(2.55 * percent);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00ff) + amt;
  let g = (num & 0x0000ff) + amt;

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}

export async function getCoalition(userId: number | null): Promise<Coalition> {
  try {
    const response = await axios.get(
      `https://api.intra.42.fr/v2/users/${userId}/coalitions`
    );
    const coal: Coalition = response.data[0];
    const light_color: string = getCoalColor(coal.color, 15);
    const dark_color: string = getCoalColor(coal.color, -30);

    return { ...coal, dark_color, light_color };
  } catch (error) {
    console.log("error in get coalition : ", error);
    throw new Error(`Couldn't get coalition : ${error}`);
  }
}

export async function getEvents(
  campusId: number,
  page: number
): Promise<Event[]> {
  console.log(" try to get event page : ", page);
  try {
    const response = await axios.get(
      `https://api.intra.42.fr/v2/campus/${campusId}/events?page[number]=${page}`
    );

    return eventModel(response.data);
  } catch (error) {
    console.log("error in getEvents : ", error);
    throw new Error(`error in getEgents : ${error}`);
  }
}

export async function getUserEvents(userId: number): Promise<Event[]> {
  try {
    const response = await axios.get(
      `https://api.intra.42.fr/v2/users/${userId}/events`
    );

    return eventModel(response.data);
  } catch (error) {
    console.log("error in getEvents : ", error);
    throw new Error(`error in getEgents : ${error}`);
  }
}

export async function getEvent(eventId: number): Promise<Event> {
  try {
    const response = await axios.get(
      `https://api.intra.42.fr/v2/events/${eventId}`
    );
    return eventModel([response.data])[0];
  } catch (error) {
    console.log("error in getEvents : ", error);
    throw new Error(`error in getEgents : ${error}`);
  }
}
