import { Event } from "@/type/event";
import { User } from "@/type/user";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { formatDate } from "date-fns";

type eventDetailsCardProps = {
  event: Event;
  me: User;
};

export default function EventDetailsCard({ event, me }: eventDetailsCardProps) {
  const startHour = formatDate(event.begin_at, "HH:mm");
  const endHour = formatDate(event.created_at, "HH:mm");
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: me.userCoalition.dark_color, opacity: 0.5 },
      ]}
    >
      <View>
        <ThemedText type="title" style={{ fontSize: 20, lineHeight: 25 }}>
          {startHour} - {endHour}
        </ThemedText>
        <ThemedText
          style={{
            opacity: 0.6,
            fontSize: 10,
            lineHeight: 10,
          }}
        >
          {event.location}
        </ThemedText>
      </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <ThemedText>Max participant : </ThemedText>
          <ThemedText>{event.max_people}</ThemedText>
        </View>
        <View style={styles.detail}>
          <ThemedText>Evaluation Points : </ThemedText>
          <ThemedText>{event.nbr_subscriber}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    gap: 15,
  },
  details: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
