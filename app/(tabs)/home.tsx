import HomeHeaderComponent from "@/components/Home/HomeHeader/homeHeaderComponent";
import EventsComponent from "@/components/events/eventsComponent";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <ThemedView style={styles.homeContainer}>
      <HomeHeaderComponent />
      <EventsComponent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
