import { useStorageState } from "@/hooks/useLocalStorage";
import { generateShaKey, getMe, getUserToken } from "@/utils/auth";
import { useAuthRequest } from "expo-auth-session";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  session: string | null;
  isSessionLoading: boolean;
  isTokenLoading: boolean;
  isRefreshTokenLoading: boolean;
  me: any;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value)
      throw new Error("useSession should be wrapped in a <SessionsProvider/>");
  }
  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isSessionLoading, session], setSession] = useStorageState("session");
  const [[isTokenLoading, token], setToken] = useStorageState("token");
  const [[isRefreshTokenLoading, refreshToken], setRefreshToken] =
    useStorageState("refreshToken");
  const [shaKey, setShaKey] = useState<Promise<string> | null>(null);

  const discovery = {
    authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
    tokenEndpoint: "https://api.intra.42.fr/oauth/token",
    revocationEndpoint: "https://api.intra.42.fr/oauth/revoke",
  };

  // TODO would be nice to have a sha key here
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_API_UID as string,
      scopes: [],
      redirectUri: "exp://172.20.10.3:8081",
      state: "HKIjdi8I0oPkb&uj?kbnJkN",
    },
    discovery
  );

  const {
    isPending,
    isError,
    isLoading: isGetMeLoading,
    isSuccess,
    data: me,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => (session ? getMe() : null),
  });

  const signIn = async () => {
    if (!shaKey) return;
    const res = await promptAsync();
    if (
      res.type !== "success" ||
      res.params.state !== (process.env.EXPO_PUBLIC_UNIQUE_STATE as string)
    ) {
      console.log(
        `pas le bon unique state : res : ${res.params.state} / env : ${
          process.env.EXPO_PUBLIC_UNIQUE_STATE as string
        }`
      );
      return;
    }
    const { code } = res.params;
    try {
      const accessToken = await getUserToken(code);
      setSession("active");
      setToken(accessToken.access_token);
      router.replace("/Home");
    } catch (error) {
      console.log("error :", error);
      return;
    }
  };

  useEffect(() => {
    setShaKey(generateShaKey());
    if (session !== null && !isSessionLoading && token !== null) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      refetchMe();
    }
  }, [token, session]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
          setToken(null);
          setRefreshToken(null);
        },
        session,
        isSessionLoading,
        isTokenLoading,
        isRefreshTokenLoading,
        me,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
