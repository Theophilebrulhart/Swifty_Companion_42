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
import { User } from "@/type/user";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  getRefreshToken: () => void;
  session: string | null;
  isSessionLoading: boolean;
  isTokenLoading: boolean;
  isPending: boolean;
  isRefreshTokenLoading: boolean;
  isMeLoading: boolean;
  errorMessage: string;
  error: Error | null;
  me: User | null | undefined;
  isRefreshing: boolean;
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
  const [errorMessage, setErrorMessage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const discovery = {
    authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
    tokenEndpoint: "https://api.intra.42.fr/oauth/token",
    revocationEndpoint: "https://api.intra.42.fr/oauth/revoke",
  };

  // TODO would be nice to use my shaKey here
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
    isLoading: isMeLoading,
    isSuccess,
    error,
    data: me,
    isRefetching,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => (session ? getMe() : null),
  });

  const connectUser = (token: any) => {
    setSession("active");
    setToken(token.access_token);
    setRefreshToken(token.refresh_token);
    refetchMe();
    if (isMeLoading) console.log("isMeLoading dans connectUser");
    if (isSuccess) router.replace("/profile");
  };

  const signIn = async () => {
    if (!shaKey) return;
    const res = await promptAsync();
    if (
      res.type !== "success" ||
      res.params.state !== (process.env.EXPO_PUBLIC_UNIQUE_STATE as string)
    )
      return;
    const { code } = res.params;
    try {
      const accessToken = await getUserToken(
        code,
        "authorization_code",
        "code"
      );
      connectUser(accessToken);
    } catch (error) {
      console.log("error in signIn : ", error);
      setErrorMessage("Failed to connect to your 42 account, please try again");
      return;
    }
  };

  const getRefreshToken = async () => {
    if (!refreshToken) return;
    try {
      setIsRefreshing(true);
      const response = await getUserToken(
        refreshToken,
        "refresh_token",
        "refresh_token"
      );
      connectUser(response);
    } catch (error) {
      router.replace("/sign-in");
      setErrorMessage("Failed to refresh your session, please log in again");
      console.log("error in getting refreshToken : ", error);
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
          setErrorMessage("");
        },
        getRefreshToken,
        session,
        isSessionLoading,
        isTokenLoading,
        isRefreshTokenLoading,
        me,
        isMeLoading,
        isPending,
        errorMessage,
        error,
        isRefreshing,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
