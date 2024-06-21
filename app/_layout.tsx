import { SessionProvider, useSession } from "@/context/authContext";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { session } = useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <GestureHandlerRootView>
          <Slot />
        </GestureHandlerRootView>
      </SessionProvider>
    </QueryClientProvider>
  );
}
