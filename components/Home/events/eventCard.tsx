import { ThemedText } from "@/components/themedComponents/ThemedText";
import { Event } from "@/type/event";
import { formatDate } from "date-fns";
import { Dimensions, StyleSheet, View } from "react-native";

type EventCardProps = {
  event: Event;
  color: string;
};

const width = Dimensions.get("screen").width;

export default function EventCard({ event, color }: EventCardProps) {
  const startDate = formatDate(event.begin_at, "dd MMM");
  const startHour = formatDate(event.begin_at, "HH:mm");
  const endHour = formatDate(event.end_at, "HH:mm");
  return (
    <View style={[styles.cardContainer, { width: width - 50 }]}>
      <View style={styles.leftContainer}>
        <View style={[styles.kindContainer, { borderColor: color }]}>
          <ThemedText style={{ fontSize: 20 }}>{event.kind}</ThemedText>
        </View>
        <View
          style={[
            styles.dateContainer,
            { borderColor: color, backgroundColor: color },
          ]}
        >
          <ThemedText style={{ fontSize: 30, lineHeight: 0 }}>
            {startDate}
          </ThemedText>
        </View>
      </View>
      <View style={[styles.rightContainer, { borderColor: color }]}>
        <ThemedText style={{ fontSize: 10 }}>{event.name}</ThemedText>
        <ThemedText style={{ fontSize: 15 }}>
          {" "}
          {startHour} - {endHour}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
  },
  leftContainer: {
    flex: 2,
  },
  kindContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderWidth: 6,
  },
  dateContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  rightContainer: {
    flex: 3,
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 6,
    borderLeftWidth: 0,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
