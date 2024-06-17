import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { UserProfile } from "@/type/user";

export default function DetailsCard(props: { user: UserProfile }) {
  const { user } = props;
  return (
    <View style={styles.cardContainer}>
      <View>
        <ThemedText type="title" style={{ fontSize: 20, lineHeight: 25 }}>
          {user.login.toUpperCase()}
        </ThemedText>
        <ThemedText
          style={{
            opacity: 0.6,
            fontSize: 10,
            lineHeight: 10,
          }}
        >
          {user.displayname}
        </ThemedText>
      </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <ThemedText>Wallet : </ThemedText>
          <ThemedText>140&nbsp;₳</ThemedText>
        </View>
        <View style={styles.detail}>
          <ThemedText>Evaluation Points : </ThemedText>
          <ThemedText>{user.correction_point}</ThemedText>
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
