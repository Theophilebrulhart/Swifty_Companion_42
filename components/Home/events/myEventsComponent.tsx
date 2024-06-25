import { ThemedText } from "@/components/themedComponents/ThemedText";
import { useSession } from "@/context/authContext";
import { getUserEvents } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import EventCard from "./eventCard";
import { FlatList } from "react-native-gesture-handler";
import { Event } from "@/type/event";
import { useEffect, useState } from "react";

export default function MyEventsComponent() {
  const { me } = useSession();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["myEvents"],
    queryFn: () => (me ? getUserEvents(me.userProfile.id) : null),
  });

  useEffect(() => {
    if (data) setEvents((prev) => [...prev, ...data]);
  }, [data]);

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

  const handleRefetch = () => {
    setPage((prev) => prev + 1);
    setLoadIndicator(true);
    refetch().then((isSuccess) => setLoadIndicator(false));
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        onEndReached={handleRefetch}
      />
      {loadIndicator && <ThemedText>Loading...</ThemedText>}
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
