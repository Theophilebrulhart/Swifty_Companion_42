import { Colors } from "@/constants/Colors";
import { ThemeProvider } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";

export default function LevelBar(props: { level: number }) {
  const { level } = props;
  const floorLevel = Math.floor(level);
  const pourcent = Math.round((level - floorLevel) * 100);
  return (
    <View style={styles.levelBarContainer}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${pourcent}%` }]} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText>
          Level {floorLevel} - {pourcent}%
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  levelBarContainer: {
    backgroundColor: Colors.dark.dark,
    width: "100%",
    height: 30,
    alignItems: "center",
  },
  progressBarContainer: {
    width: "100%",
    position: "relative",
  },
  progressBar: {
    backgroundColor: Colors.dark.primary,
    height: 30,
    position: "absolute",
    top: 0,
    left: 0,
  },
  textContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
