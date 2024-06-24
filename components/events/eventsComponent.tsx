import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/utils/api";
import { useSession } from "@/context/authContext";

export default function EventsComponent() {
  const { me } = useSession();
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["events"],
    queryFn: () => me && getEvents(me.userCampus.id),
  });
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Event loading</ThemedText>
      </View>
    );
  }
  return (
    <View>
      <ThemedText>eventsComponent</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
