import axios from "axios";
import * as Crypto from "expo-crypto";
import { User, UserProfile } from "@/type/user";
import { Project } from "@/type/project";
import { Skill } from "@/type/skills";
import { Coalition } from "@/type/coalition";
import { getCoalition } from "./api";
import {
  UserProfilModel,
  campusModel,
  projectModel,
} from "./createModelObject";

export async function getUserToken(code: string): Promise<any> {
  const url = "https://api.intra.42.fr/oauth/token";

  const data = new URLSearchParams();
  data.append("grant_type", "authorization_code");
  data.append("client_id", process.env.EXPO_PUBLIC_API_UID as string);
  data.append("client_secret", process.env.EXPO_PUBLIC_SECRET as string);
  data.append("code", code);
  data.append("redirect_uri", "exp://172.20.10.3:8081");

  try {
    const response = await axios.post(url, data);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.access_token;
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't exchange code against token");
  }
}

export async function getMe(): Promise<User> {
  try {
    const response = await axios.get("https://api.intra.42.fr/v2/me");
    const userProfile = UserProfilModel(response);
    const userProjects = projectModel(response.data.projects_users);
    const userSkills: Skill[] = response.data.cursus_users[1].skills;
    const userCoalition: Coalition = await getCoalition(userProfile.id);
    const userCampus = campusModel(response.data.campus[0]);
    // console.log("response me : ", response.data.campus);
    return {
      userProfile,
      userProjects,
      userSkills,
      userCoalition,
      userCampus,
    };
  } catch (error) {
    console.log("error in get me : ", error);
    throw new Error("Couldn't get me infos");
  }
}

export async function generateShaKey(): Promise<string> {
  try {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    const randomString = Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    const hashedKey = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      randomString,
      { encoding: Crypto.CryptoEncoding.HEX }
    );
    return hashedKey;
  } catch (error) {
    console.error("Error generating secure key:", error);
    throw new Error("Could not generate secure key");
  }
}
