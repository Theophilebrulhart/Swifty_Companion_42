import EventBody from "@/components/Event/eventBody";
import EventHeader from "@/components/Event/eventHeader";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { useSession } from "@/context/authContext";
import { Event } from "@/type/event";
import { getEvent } from "@/utils/api";
import Loading from "@/utils/loading";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

type EventScreenProps = {
  event: Event;
};

export default function EventScreen({ event }: EventScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { me } = useSession();

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
      <EventBody event={data} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 15,
    gap: 20,
  },
});
