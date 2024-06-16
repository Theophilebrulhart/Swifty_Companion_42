import { Redirect, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context/authContext";

export default function AppLayout() {
  const { session, isSessionLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isSessionLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    console.log("no session found => go back to login");
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
