import EventHeader from "@/components/Event/eventHeader";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { useSession } from "@/context/authContext";
import { Event } from "@/type/event";
import { getEvent } from "@/utils/api";
import Loading from "@/utils/loading";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

type EventScreenProps = {
  event: Event;
};

export default function EventScreen({ event }: EventScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { me } = useSession();

  console.log("id : ", id);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["event"],
    queryFn: () => (id ? getEvent(parseInt(id)) : null),
  });

  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading || !data || !me) {
    return <Loading />;
  }

  return (
    <ThemedView style={styles.eventContainer}>
      <EventHeader event={data} me={me} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  eventDetails: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  dateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    flex: 3,
    gap: 10,
    padding: 20,
  },
});
