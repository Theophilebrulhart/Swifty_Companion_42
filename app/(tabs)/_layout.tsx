import { Redirect, Tabs } from "expo-router";
import { useSession } from "@/context/authContext";
import { Colors } from "@/constants/Colors";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function AppLayout() {
  const { session, isSessionLoading, isMeLoading, me, isPending } =
    useSession();
  const colorScheme = useColorScheme();

  // TODO : vérifier si le token est encore valide pour pas rester blocké sur la loading page
  if (isSessionLoading || isMeLoading || isPending || !me) {
    return (
      <ImageBackground
        source={{
          uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      ></ImageBackground>
    );
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
        tabBarStyle: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
