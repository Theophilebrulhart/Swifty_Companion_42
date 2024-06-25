import { Event } from "@/type/event";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";

type EventBodyProps = {
  event: Event;
};

export default function EventBody({ event }: EventBodyProps) {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={{ lineHeight: 0 }}>
          {event.name}
        </ThemedText>
      </View>
      <View style={styles.descContainer}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <ThemedText>{event.description}</ThemedText>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 20,
    borderColor: "#fff",
    paddingHorizontal: 15,
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#fff",
  },
  descContainer: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
