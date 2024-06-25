import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../../themedComponents/ThemedText";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/utils/api";
import { useSession } from "@/context/authContext";
import { Event } from "@/type/event";
import EventCard from "./eventCard";
import { useEffect, useState } from "react";
import Loading from "@/utils/loading";

export default function EventsComponent() {
  const { me } = useSession();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const { isLoading, isSuccess, data, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: () => me && getEvents(me.userCampus.id, page),
  });

  useEffect(() => {
    if (data) setEvents((prev) => [...prev, ...data]);
  }, [data]);

  if (isLoading || !me) {
    return <Loading />;
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
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
