import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../../themedComponents/ThemedText";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/utils/api";
import { useSession } from "@/context/authContext";
import { Event } from "@/type/event";
import EventCard from "./eventCard";

export default function EventsComponent() {
  const { me } = useSession();
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["events"],
    queryFn: () => me && getEvents(me.userCampus.id),
  });

  if (isLoading || !me) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Event loading</ThemedText>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Event }) => {
    return <EventCard event={item} color={me?.userCoalition.dark_color} />;
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
