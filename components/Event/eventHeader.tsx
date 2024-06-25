import { ThemedText } from "../themedComponents/ThemedText";
import { StyleSheet, View } from "react-native";
import { formatDate } from "date-fns";
import { Event } from "@/type/event";
import Loading from "@/utils/loading";
import { User } from "@/type/user";
import EventDetailsCard from "./eventDetailsCard";

type EventHeaderProps = {
  event: Event;
  me: User;
};

export default function EventHeader({ event, me }: EventHeaderProps) {
  const startDate = formatDate(event.begin_at, "dd MMM");

  if (!me) return <Loading />;

  return (
    <View
      style={[styles.eventDetails, { borderColor: me.userCoalition.color }]}
    >
      <View style={styles.dateContainer}>
        <ThemedText style={{ fontSize: 40, lineHeight: 0 }}>
          {startDate}
        </ThemedText>
      </View>
      <View style={styles.infosContainer}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 15 }}>
            {event.kind.toUpperCase()}
          </ThemedText>
        </View>
        <EventDetailsCard event={event} me={me} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventDetails: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 6,
    borderRadius: 20,
  },
  dateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  infosContainer: {
    flex: 3,
    gap: 10,
    padding: 20,
  },
});
