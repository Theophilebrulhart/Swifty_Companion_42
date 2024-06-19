import { Redirect, Stack, Tabs } from "expo-router";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { useSession } from "@/context/authContext";
import { Colors } from "@/constants/Colors";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AppLayout() {
  const { session, isSessionLoading, isMeLoading } = useSession();
  const colorScheme = useColorScheme();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isSessionLoading || isMeLoading) {
    console.log("data loading");
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
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#240750" },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
