import axios from "axios";
import { getRandomBytes } from "expo-crypto";
import { useEffect } from "react";
import * as Crypto from "expo-crypto";
import { UserProfile } from "@/type/user";

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

const returnUserProfil = (response: any): UserProfile => {
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

export async function getMe(): Promise<any> {
  try {
    const response = await axios.get("https://api.intra.42.fr/v2/me");
    const userProfile = returnUserProfil(response);
    return { userProfile, ...response.data };
    return response.data;
  } catch (error) {
    console.log("error in get me");
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
    console.log("generate new shaKey", hashedKey);
    return hashedKey;
  } catch (error) {
    console.error("Error generating secure key:", error);
    throw new Error("Could not generate secure key");
  }
}
