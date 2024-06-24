import { useSession } from "@/context/authContext";
import { getStorageItemAsync } from "@/hooks/useLocalStorage";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { session } = useSession();
  const [sess, setSess] = useState<string | null>(null);
  const [token, setToken] = useState<number | null>(null);
  useEffect(() => {
    const getSess = async () => {
      try {
        const sess = await getStorageItemAsync("session");
        const token = await getStorageItemAsync("token");
        if (token && sess) {
          router.replace("/profile");
        }
        setSess(sess);
        setToken(token);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    getSess();
  }, []);

  return <Redirect href={"/sign-in"} />;
}
