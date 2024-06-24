import HomeHeaderComponent from "@/components/Home/HomeHeader/homeHeaderComponent";
import EventsComponent from "@/components/events/eventsComponent";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "./profile";
import { useSession } from "@/context/authContext";
import CustomTabBar from "@/components/utils/customTabBar";
import { ThemedText } from "@/components/themedComponents/ThemedText";

export type HomeTabs = "events" | "myEvents";

export default function Home() {
  const { me } = useSession();
  const [type, setType] = useState<HomeTabs | Tabs>("events");
  const labels: HomeTabs[] = ["events", "myEvents"];

  if (!me) {
    return (
      <>
        <ThemedText>Loading</ThemedText>
      </>
    );
  }

  return (
    <ThemedView style={styles.homeContainer}>
      <HomeHeaderComponent />
      <CustomTabBar
        contentType={type}
        setContentType={setType}
        activeColor={me?.userCoalition.dark_color}
        labels={labels}
      />
      <EventsComponent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
